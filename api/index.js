var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/server-app.ts
import express from "express";
import dotenv2 from "dotenv";

// src/db/index.ts
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  leads: () => leads,
  users: () => users,
  usersRelations: () => usersRelations
});
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(),
  // Firebase Auth UID of the coordinator
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow()
});
var leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  mobileNumber: text("mobile_number").notNull(),
  email: text("email"),
  companyName: text("company_name"),
  projectType: text("project_type").notNull(),
  // Residential, Commercial, Industrial
  requirementType: text("requirement_type").notNull(),
  // VRV/VRF, Ductable AC, Cassette, etc.
  cityLocation: text("city_location").notNull(),
  approximateArea: text("approximate_area"),
  // Optional
  briefRequirement: text("brief_requirement"),
  // Optional message
  preferredContactMethod: text("preferred_contact_method"),
  // Optional (Call, WhatsApp, Email)
  ctaUsed: text("cta_used"),
  // Track button clicked: Get Free Consultation, Request Site Visit, Get HVAC Estimate
  status: text("status").default("Pending").notNull(),
  // Pending, Contacted, In Progress, Closed
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var usersRelations = relations(users, () => ({}));

// src/db/index.ts
dotenv.config();
var { Pool } = pkg;
var createPool = () => {
  const dbUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
  if (dbUrl) {
    console.log("Connecting to database using NEON_DATABASE_URL/DATABASE_URL...");
    return new Pool({
      connectionString: dbUrl,
      connectionTimeoutMillis: 15e3,
      ssl: dbUrl.includes("neon") || dbUrl.includes("neon.tech") ? { rejectUnauthorized: false } : void 0
    });
  }
  console.log("Connecting using Object configuration variables (SQL_*)...");
  return new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    connectionTimeoutMillis: 15e3
  });
};
var pool = createPool();
pool.on("error", (err) => {
  console.error("Unexpected error on idle SQL pool client:", err);
});
var bootstrapDb = async () => {
  try {
    console.log("Bootstrapping database tables if they do not exist...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        uid TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        name TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        mobile_number TEXT NOT NULL,
        email TEXT,
        company_name TEXT,
        project_type TEXT NOT NULL,
        requirement_type TEXT NOT NULL,
        city_location TEXT NOT NULL,
        approximate_area TEXT,
        brief_requirement TEXT,
        preferred_contact_method TEXT,
        cta_used TEXT,
        status TEXT NOT NULL DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    console.log("Database tables verified or created successfully!");
  } catch (error) {
    console.error("Failed to bootstrap database tables:", error);
  }
};
var bootstrapped = false;
var ensureTablesExist = async () => {
  if (bootstrapped) return;
  try {
    await bootstrapDb();
    bootstrapped = true;
  } catch (err) {
    console.error("Lazy bootstrap error:", err);
  }
};
var db = drizzle(pool, { schema: schema_exports });

// src/server-app.ts
import { desc, eq, sql } from "drizzle-orm";

// src/middleware/auth.ts
var requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const adminEmail = "aijaz523@gmail.com";
  req.user = {
    uid: "admin-local-bypass-uid",
    email: adminEmail,
    name: "Administrator"
  };
  next();
};

// src/db/users.ts
async function getOrCreateUser(uid, email, name) {
  try {
    const result = await db.insert(users).values({
      uid,
      email,
      name: name || null
    }).onConflictDoUpdate({
      target: users.uid,
      set: {
        email,
        name: name || null
      }
    }).returning();
    return result[0];
  } catch (error) {
    console.error("getOrCreateUser database error:", error);
    throw new Error("Failed to register or retrieve user directory.", { cause: error });
  }
}

// src/server-app.ts
dotenv2.config();
var app = express();
app.use(express.json());
app.get("/api/health", async (req, res) => {
  let activeConnection = false;
  let provider = "None/Locally Configured";
  let errorMessage = null;
  try {
    await ensureTablesExist();
    const dbUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
    if (dbUrl) {
      if (dbUrl.includes("neon") || dbUrl.includes("neon.tech")) {
        provider = "Neon PostgreSQL";
      } else {
        provider = "PostgreSQL";
      }
      await db.execute(sql`SELECT 1`);
      activeConnection = true;
    } else if (process.env.SQL_HOST) {
      provider = "Custom SQL Host";
      await db.execute(sql`SELECT 1`);
      activeConnection = true;
    }
  } catch (error) {
    console.error("API Health check database error:", error);
    errorMessage = error.message;
  }
  res.json({
    status: "ok",
    time: (/* @__PURE__ */ new Date()).toISOString(),
    databaseConnected: activeConnection,
    provider,
    error: errorMessage
  });
});
app.post("/api/leads", async (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      companyName,
      projectType,
      requirementType,
      cityLocation,
      approximateArea,
      briefRequirement,
      preferredContactMethod,
      ctaUsed
    } = req.body;
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: "Full Name is required." });
    }
    if (!mobileNumber || !mobileNumber.trim()) {
      return res.status(400).json({ error: "Mobile Number is required." });
    }
    if (!projectType || !projectType.trim()) {
      return res.status(400).json({ error: "Project Type is required." });
    }
    if (!requirementType || !requirementType.trim()) {
      return res.status(400).json({ error: "Requirement Type is required." });
    }
    if (!cityLocation || !cityLocation.trim()) {
      return res.status(400).json({ error: "City / Location is required." });
    }
    await ensureTablesExist();
    const result = await db.insert(leads).values({
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email?.trim() || null,
      companyName: companyName?.trim() || null,
      projectType: projectType.trim(),
      requirementType: requirementType.trim(),
      cityLocation: cityLocation.trim(),
      approximateArea: approximateArea ? String(approximateArea).trim() : null,
      briefRequirement: briefRequirement?.trim() || null,
      preferredContactMethod: preferredContactMethod || null,
      ctaUsed: ctaUsed || "Default CTA",
      status: "Pending"
    }).returning();
    const createdLead = result[0];
    return res.status(201).json({
      success: true,
      message: "Lead collected successfully!",
      lead: createdLead
    });
  } catch (error) {
    console.error("Failed to save lead to database:", error);
    return res.status(500).json({
      error: "Database query failed. Please check connection string or try again later.",
      details: error.message
    });
  }
});
app.post("/api/users/sync", requireAuth, async (req, res) => {
  try {
    const { uid, email, name } = req.user;
    const user = await getOrCreateUser(uid, email || "", name || null);
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Failed to sync auth user to db:", error);
    return res.status(500).json({ error: error.message });
  }
});
app.get("/api/leads", requireAuth, async (req, res) => {
  try {
    const records = await db.select().from(leads).orderBy(desc(leads.createdAt));
    return res.json(records);
  } catch (error) {
    console.error("Failed to retrieve leads from database:", error);
    return res.status(500).json({
      error: "Database query failed. Please check connection logs.",
      details: error.message
    });
  }
});
app.put("/api/leads/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }
    const updated = await db.update(leads).set({ status }).where(eq(leads.id, Number(id))).returning();
    return res.json({ success: true, lead: updated[0] });
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return res.status(500).json({ error: error.message });
  }
});
var server_app_default = app;

// api/index.ts
var index_default = server_app_default;
export {
  index_default as default
};
