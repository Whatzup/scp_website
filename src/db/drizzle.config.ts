import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Load environment variables for migrations
dotenv.config();

const dbUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
const sqlHost = process.env.SQL_HOST;
const sqlDbName = process.env.SQL_DB_NAME;
const user = process.env.SQL_ADMIN_USER || process.env.SQL_USER;
const password = process.env.SQL_ADMIN_PASSWORD || process.env.SQL_PASSWORD;

if (!dbUrl && (!sqlHost || !sqlDbName || !user || !password)) {
  throw new Error('Either DATABASE_URL or complete SQL_* environment variables must be defined.');
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  schemaFilter: ['public'],
  dbCredentials: dbUrl
    ? {
        url: dbUrl,
        ssl: dbUrl.includes('supabase.co') || dbUrl.includes('neon') ? { rejectUnauthorized: false } : undefined,
      }
    : {
        host: sqlHost || '',
        user: user || '',
        password: password || '',
        database: sqlDbName || '',
        ssl: false,
      },
  verbose: true,
});
