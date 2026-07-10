import * as dotenv from 'dotenv';
dotenv.config();

import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import * as schema from './schema.ts';

const { Pool } = pkg;

const connectionStringEnvKeys = [
  'NEON_DATABASE_URL',
  'DATABASE_URL',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_URL_NON_POOLING',
] as const;

const getDatabaseUrl = () => {
  for (const key of connectionStringEnvKeys) {
    const value = process.env[key];
    if (value?.trim()) {
      return { key, value: value.trim() };
    }
  }
  return null;
};

const getObjectConnectionConfig = () => {
  const host = process.env.PGHOST || process.env.SQL_HOST;
  const user = process.env.PGUSER || process.env.SQL_USER;
  const password = process.env.PGPASSWORD || process.env.SQL_PASSWORD;
  const database = process.env.PGDATABASE || process.env.SQL_DB_NAME;

  if (!host || !user || !password || !database) {
    return null;
  }

  return {
    host,
    user,
    password,
    database,
    port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
  };
};

export const getDatabaseConfigError = () => {
  if (getDatabaseUrl() || getObjectConnectionConfig()) {
    return null;
  }

  return `No database connection environment variables found. Set one of ${connectionStringEnvKeys.join(', ')} in Vercel, or provide PGHOST/PGUSER/PGPASSWORD/PGDATABASE.`;
};

export const getDatabaseProviderLabel = () => {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    return dbUrl.value.includes('neon') || dbUrl.value.includes('neon.tech')
      ? `Neon PostgreSQL via ${dbUrl.key}`
      : `PostgreSQL via ${dbUrl.key}`;
  }

  if (getObjectConnectionConfig()) {
    return process.env.PGHOST ? 'PostgreSQL via PG* variables' : 'Custom SQL Host';
  }

  return 'None/Locally Configured';
};

export const createPool = () => {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    console.log(`Connecting to database using ${dbUrl.key}...`);
    return new Pool({
      connectionString: dbUrl.value,
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 10000,
      max: 1,
      ssl: dbUrl.value.includes('neon') || dbUrl.value.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }

  const objectConfig = getObjectConnectionConfig();
  if (objectConfig) {
    console.log('Connecting using object configuration variables...');
    return new Pool({
      ...objectConfig,
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 10000,
      max: 1,
      ssl: objectConfig.host.includes('neon') || objectConfig.host.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }

  console.warn(getDatabaseConfigError());
  return new Pool({
    connectionTimeoutMillis: 15000,
    idleTimeoutMillis: 10000,
    max: 1,
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
