import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load environment variables for migrations
dotenv.config();

const connectionStringEnvKeys = [
  'NEON_DATABASE_URL',
  'DATABASE_URL',
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'DATABASE_URL_UNPOOLED',
  'POSTGRES_URL_NON_POOLING',
] as const;

const dbUrl = connectionStringEnvKeys
  .map((key) => process.env[key])
  .find((value) => value?.trim());
const sqlHost = process.env.PGHOST || process.env.SQL_HOST;
const sqlDbName = process.env.PGDATABASE || process.env.SQL_DB_NAME;
const user = process.env.PGUSER || process.env.SQL_ADMIN_USER || process.env.SQL_USER;
const password = process.env.PGPASSWORD || process.env.SQL_ADMIN_PASSWORD || process.env.SQL_PASSWORD;
const port = process.env.PGPORT ? Number(process.env.PGPORT) : undefined;

if (!dbUrl && (!sqlHost || !sqlDbName || !user || !password)) {
  throw new Error(`Set one of ${connectionStringEnvKeys.join(', ')}, or complete PG*/SQL_* environment variables.`);
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  schemaFilter: ['public'],
  dbCredentials: dbUrl
    ? {
        url: dbUrl,
        ssl: dbUrl.includes('neon') || dbUrl.includes('neon.tech') ? { rejectUnauthorized: false } : undefined,
      }
    : {
        host: sqlHost || '',
        user: user || '',
        password: password || '',
        database: sqlDbName || '',
        port,
        ssl: sqlHost?.includes('neon') || sqlHost?.includes('neon.tech')
          ? { rejectUnauthorized: false }
          : false,
      },
  verbose: true,
});
