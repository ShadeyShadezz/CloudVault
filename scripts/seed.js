require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const force = process.argv.includes('--force');

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set in your environment (.env or .env.local).');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const INSTRUCTORS = [
  { email: 'rob@launchpadphilly.org', password: process.env.SEED_DEFAULT_PASSWORD || 'lpuser1', role: 'instructor' },
  { email: 'sanaa@launchpadphilly.org', password: process.env.SEED_DEFAULT_PASSWORD || 'lpuser2', role: 'instructor' },
  { email: 'taheera@launchpadphilly.org', password: process.env.SEED_DEFAULT_PASSWORD || 'lpuser3', role: 'instructor' },
];

async function run() {
  const client = await pool.connect();
  try {
    console.log('Connected to database. Ensuring users table exists...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);

    for (const u of INSTRUCTORS) {
      try {
        const existing = await client.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [u.email]);
        if (existing.rowCount > 0 && !force) {
          console.log(`SKIP (exists): ${u.email}`);
          continue;
        }

        const hashed = await bcrypt.hash(u.password, 10);

        if (existing.rowCount > 0 && force) {
          await client.query(
            `UPDATE users SET password = $1, role = $2 WHERE email = $3`,
            [hashed, u.role, u.email]
          );
          console.log(`UPDATED: ${u.email}`);
        } else {
          await client.query(
            `INSERT INTO users (email, password, role) VALUES ($1, $2, $3)`,
            [u.email, hashed, u.role]
          );
          console.log(`CREATED: ${u.email}`);
        }
      } catch (err) {
        console.error(`ERROR processing ${u.email}:`, err.message || err);
      }
    }

    console.log('Seed script finished successfully.');
    if (!force) console.log('Run with --force to overwrite existing accounts: npm run seed:force');
  } catch (err) {
    console.error('Seed error:', err.message || err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

run();