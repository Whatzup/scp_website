import dotenv from 'dotenv';
dotenv.config();

import { createPool, db } from './src/db/index.ts';
import { leads } from './src/db/schema.ts';
import { sql } from 'drizzle-orm';

async function diagnose() {
  console.log('--- NEON DIAGNOSTICS START ---');
  
  const neonUrl = process.env.NEON_DATABASE_URL;
  if (!neonUrl) {
    console.error('ERROR: NEON_DATABASE_URL is not defined in your /.env file!');
    return;
  }
  
  console.log('Attempting to connect to pool and query "SELECT NOW()"...');
  const pool = createPool();
  try {
    const timeRes = await pool.query('SELECT NOW()');
    console.log('✅ Connection successful. Server time is:', timeRes.rows[0].now);
  } catch (err: any) {
    console.error('❌ Connection test failed with error:', err.message);
    console.error('Error Code:', err.code);
    return;
  }

  // Check if tables exist
  try {
    console.log('\nChecking what tables exist in public schema...');
    const tablesRes = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Existing tables in public schema:', tablesRes.rows.map(r => r.table_name));
    
    // Check columns of the leads table if it exists
    if (tablesRes.rows.some(r => r.table_name === 'leads')) {
      console.log('\nChecking columns of "leads" table...');
      const colsRes = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'leads'
      `);
      console.log('Actual database "leads" columns:');
      colsRes.rows.forEach(col => {
        console.log(` - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
      });
    }
  } catch (err: any) {
    console.error('❌ Error checking database catalog:', err.message);
  }

  // Try dummy insert using Drizzle
  try {
    console.log('\nTrying a dry run insert into "leads" using Drizzle...');
    const testInsert = await db.insert(leads)
      .values({
        fullName: 'Test Diagnostic Name',
        mobileNumber: '9999999999',
        projectType: 'Residential',
        requirementType: 'Cassette AC',
        cityLocation: 'Gurugram',
        ctaUsed: 'Diagnostic Test',
        status: 'Pending'
      })
      .returning();
    console.log('✅ Dry-run Drizzle query succeeded! Inserted ID:', testInsert[0].id);
    
    // Clean up
    await pool.query('DELETE FROM leads WHERE full_name = $1', ['Test Diagnostic Name']);
    console.log('🧹 Cleaned up dry-run insert.');
  } catch (err: any) {
    console.error('❌ Dry-run Drizzle insert failed!');
    console.error('Error message:', err.message);
    if (err.detail) console.error('Detail:', err.detail);
    if (err.code) console.error('SQL Error Code:', err.code);
  }
  
  await pool.end();
  console.log('--- DIAGNOSTICS END ---');
}

diagnose();
