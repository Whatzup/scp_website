import * as dotenv from 'dotenv';
dotenv.config();

import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import * as schema from './schema.ts';

const { Pool } = pkg;

export const createPool = () => {
  const dbUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
  if (dbUrl) {
    console.log('Connecting to database using NEON_DATABASE_URL/DATABASE_URL...');
    return new Pool({
      connectionString: dbUrl,
      connectionTimeoutMillis: 15000,
      ssl: dbUrl.includes('neon') || dbUrl.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }

  console.log('Connecting using Object configuration variables (SQL_*)...');
  return new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    connectionTimeoutMillis: 15000,
  });
};

const pool = createPool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle SQL pool client:', err);
});

export const bootstrapDb = async () => {
  try {
    console.log('Bootstrapping database tables if they do not exist...');
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
    console.log('Database tables verified or created successfully!');
  } catch (error) {
    console.error('Failed to bootstrap database tables:', error);
  }
};

let bootstrapped = false;
export const ensureTablesExist = async () => {
  if (bootstrapped) return;
  try {
    await bootstrapDb();
    bootstrapped = true;
  } catch (err) {
    console.error('Lazy bootstrap error:', err);
  }
};

export const db = drizzle(pool, { schema });
export { schema };
