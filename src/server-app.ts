import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { db } from './db/index.ts';
import { leads } from './db/schema.ts';
import { desc, eq, sql } from 'drizzle-orm';
import { requireAuth, AuthRequest } from './middleware/auth.ts';
import { getOrCreateUser } from './db/users.ts';

const app = express();
app.use(express.json());

// 1. Health check
app.get('/api/health', async (req, res) => {
  let activeConnection = false;
  let provider = 'None/Locally Configured';
  let errorMessage = null;

  try {
    const dbUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || process.env.SUPABASE_DATABASE_URL;
    if (dbUrl) {
      if (dbUrl.includes('neon') || dbUrl.includes('neon.tech')) {
        provider = 'Neon PostgreSQL';
      } else if (dbUrl.includes('supabase.co')) {
        provider = 'Supabase PostgreSQL';
      } else {
        provider = 'PostgreSQL';
      }
      
      // Execute a quick, fast validation query against the active database
      await db.execute(sql`SELECT 1`);
      activeConnection = true;
    } else if (process.env.SQL_HOST) {
      provider = 'Custom SQL Host';
      await db.execute(sql`SELECT 1`);
      activeConnection = true;
    }
  } catch (error: any) {
    console.error('API Health check database error:', error);
    errorMessage = error.message;
  }

  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    databaseConnected: activeConnection,
    provider,
    error: errorMessage,
  });
});

// 2. Public endpoint to submit lead
app.post('/api/leads', async (req, res) => {
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
      ctaUsed,
    } = req.body;

    // Validation
    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: 'Full Name is required.' });
    }
    if (!mobileNumber || !mobileNumber.trim()) {
      return res.status(400).json({ error: 'Mobile Number is required.' });
    }
    if (!projectType || !projectType.trim()) {
      return res.status(400).json({ error: 'Project Type is required.' });
    }
    if (!requirementType || !requirementType.trim()) {
      return res.status(400).json({ error: 'Requirement Type is required.' });
    }
    if (!cityLocation || !cityLocation.trim()) {
      return res.status(400).json({ error: 'City / Location is required.' });
    }

    // Safe database insert wrapping in a try-catch
    const result = await db.insert(leads)
      .values({
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
        ctaUsed: ctaUsed || 'Default CTA',
        status: 'Pending',
      })
      .returning();

    const createdLead = result[0];
    return res.status(201).json({
      success: true,
      message: 'Lead collected successfully!',
      lead: createdLead,
    });
  } catch (error: any) {
    console.error('Failed to save lead to database:', error);
    return res.status(500).json({
      error: 'Database query failed. Please check connection string or try again later.',
      details: error.message,
    });
  }
});

// 3. SECURED: Sync current logged-in user with DB
app.post('/api/users/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { uid, email, name } = req.user!;
    const user = await getOrCreateUser(uid, email || '', name || null);
    return res.json({ success: true, user });
  } catch (error: any) {
    console.error('Failed to sync auth user to db:', error);
    return res.status(500).json({ error: error.message });
  }
});

// 4. SECURED: Get all leads for admin dashboard view
app.get('/api/leads', requireAuth, async (req: AuthRequest, res) => {
  try {
    const records = await db.select()
      .from(leads)
      .orderBy(desc(leads.createdAt));
    return res.json(records);
  } catch (error: any) {
    console.error('Failed to retrieve leads from database:', error);
    return res.status(500).json({
      error: 'Database query failed. Please check connection logs.',
      details: error.message,
    });
  }
});

// 5. SECURED: Update a lead's status
app.put('/api/leads/:id', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const updated = await db.update(leads)
      .set({ status })
      .where(eq(leads.id, Number(id)))
      .returning();

    return res.json({ success: true, lead: updated[0] });
  } catch (error: any) {
    console.error('Failed to update lead status:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default app;
