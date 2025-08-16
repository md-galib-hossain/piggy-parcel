import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { AppConfig } from '@piggy/config';
const config = AppConfig.getInstance();
const dbUrl = config.database.url;

if (!dbUrl) {
  throw new Error("PostgreSQL connection URL not found in environment variables");
}

const pool = new Pool({
  connectionString: dbUrl,
  max: 10, 
  idleTimeoutMillis: 30000, 
});

export const db = drizzle(pool);
