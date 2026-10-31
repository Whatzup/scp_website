import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import {
  db,
  ensureTablesExist,
  getDatabaseConfigError,
  getDatabaseProviderLabel,
} from './db/index.ts';
import { leads } from './db/schema.ts';
import { desc, eq, sql } from 'drizzle-orm';
import { requireAuth } from './middleware/auth.ts';
import type { AuthRequest } from './middleware/auth.ts';
import { getOrCreateUser } from './db/users.ts';

const app = express();
app.use(express.json());

// In-memory fallback leads list when DB is unreachable or credentials fail
const memoryLeads: any[] = [];
let nextMemoryId = 1;

// 1. Health check
app.get('/api/health', async (req, res) => {
  let activeConnection = false;
  let provider = getDatabaseProviderLabel();
  let errorMessage = null;

  try {
    const configError = getDatabaseConfigError();
    if (configError) {
      errorMessage = configError;
    } else {
      await ensureTablesExist();

      // Execute a quick, fast validation query against the active database.
      await db.execute(sql`SELECT 1`);
      activeConnection = true;
    }
  } catch (error: any) {
    console.warn('API Health check database notice (non-fatal):', error?.message || error);
    errorMessage = error?.message || 'Database connection error';
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

    let createdLead: any = null;

    // Try DB insertion if configured
    const configError = getDatabaseConfigError();
    if (!configError) {
      try {
        await ensureTablesExist();
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
        createdLead = result[0];
      } catch (dbErr: any) {
        console.warn('DB lead insert skipped due to connection notice:', dbErr?.message || dbErr);
      }
    }

    // Fallback to in-memory store if DB wasn't available or insert failed
    if (!createdLead) {
      createdLead = {
        id: nextMemoryId++,
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
        createdAt: new Date().toISOString(),
      };
      memoryLeads.unshift(createdLead);
    }

    return res.status(201).json({
      success: true,
      message: 'Lead collected successfully!',
      lead: createdLead,
    });
  } catch (error: any) {
    console.warn('Failed to process lead:', error?.message || error);
    return res.status(500).json({
      error: 'Unable to process lead at this time.',
      details: error?.message,
    });
  }
});

// 3. SECURED: Sync current logged-in user with DB
app.post('/api/users/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { uid, email, name } = req.user!;
    try {
      const user = await getOrCreateUser(uid, email || '', name || null);
      return res.json({ success: true, user });
    } catch (dbError: any) {
      console.warn('User sync DB notice:', dbError?.message || dbError);
      return res.json({
        success: true,
        user: { id: 1, uid, email: email || '', name: name || 'Admin User' }
      });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'User sync failed' });
  }
});

// 4. SECURED: Get all leads for admin dashboard view
app.get('/api/leads', requireAuth, async (req: AuthRequest, res) => {
  try {
    let dbRecords: any[] = [];
    const configError = getDatabaseConfigError();
    if (!configError) {
      try {
        dbRecords = await db.select()
          .from(leads)
          .orderBy(desc(leads.createdAt));
      } catch (dbErr: any) {
        console.warn('Retrieving DB leads skipped:', dbErr?.message || dbErr);
      }
    }
    // Return DB records if present, merged with in-memory fallback leads
    const combined = [...dbRecords, ...memoryLeads];
    return res.json(combined);
  } catch (error: any) {
    console.warn('Lead retrieval notice:', error?.message || error);
    return res.json(memoryLeads);
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

    const numId = Number(id);
    let updatedLead: any = null;

    const configError = getDatabaseConfigError();
    if (!configError) {
      try {
        const updated = await db.update(leads)
          .set({ status })
          .where(eq(leads.id, numId))
          .returning();
        if (updated && updated.length > 0) {
          updatedLead = updated[0];
        }
      } catch (dbErr: any) {
        console.warn('DB lead status update notice:', dbErr?.message || dbErr);
      }
    }

    if (!updatedLead) {
      const found = memoryLeads.find((l) => l.id === numId);
      if (found) {
        found.status = status;
        updatedLead = found;
      }
    }

    return res.json({ success: true, lead: updatedLead || { id: numId, status } });
  } catch (error: any) {
    console.warn('Failed to update lead status:', error?.message || error);
    return res.status(500).json({ error: error?.message || 'Update status failed' });
  }
});

export default app;
