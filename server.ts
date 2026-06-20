import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { db } from './src/db/index.ts';
import { leads } from './src/db/schema.ts';
import { desc, eq } from 'drizzle-orm';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser } from './src/db/users.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json());

  // Logo.jpg fallback serving
  app.get('/logo.jpg', (req, res) => {
    const publicPath = path.join(process.cwd(), 'public', 'logo.jpg');
    if (fs.existsSync(publicPath)) {
      return res.sendFile(publicPath);
    }
    const assetsPath = path.join(process.cwd(), 'src', 'assets', 'logo.jpg');
    if (fs.existsSync(assetsPath)) {
      return res.sendFile(assetsPath);
    }
    const distPath = path.join(process.cwd(), 'dist', 'logo.jpg');
    if (fs.existsSync(distPath)) {
      return res.sendFile(distPath);
    }
    res.status(404).send('Logo not found');
  });

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
      databaseConnected: !!process.env.SQL_HOST,
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

      // Safe database insert wrapping in a try-catch to satisfy Robust Error Handling Layer
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

  // Integrate Vite server or serve static dist folder built files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
