// src/lib/db.ts
import { Pool } from 'pg';

// Use DATABASE_URL from environment (dotenv loaded by Next.js at runtime)
if (!process.env.DATABASE_URL) {
  console.warn('src/lib/db.ts: DATABASE_URL is not set. Ensure .env or environment variables include DATABASE_URL.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // For Neon, SSL is required; in local dev we still set rejectUnauthorized: false
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : { rejectUnauthorized: false },
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

export { pool };
