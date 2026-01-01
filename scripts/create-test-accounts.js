require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL not set. Set it in .env or environment and retry.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const ACCOUNTS = [
  { email: 'admin@test.com', password: 'Admin123!', name: 'Admin User', role: 'admin' },
  { email: 'user@test.com', password: 'User123!', name: 'Test User', role: 'user' },
  { email: 'demo@test.com', password: 'Demo123!', name: 'Demo Account', role: 'demo' },
];

async function main() {
  const client = await pool.connect();
  const created = [];
  try {
    console.log('Ensuring users table exists...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);

    for (const acct of ACCOUNTS) {
      try {
        const res = await client.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [acct.email]);
        if (res.rowCount > 0) {
          console.log(`EXISTS: ${acct.email} (skipped)`);
          continue;
        }

        const hashed = await bcrypt.hash(acct.password, 12);
        await client.query(
          'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4)',
          [acct.email, hashed, acct.name, acct.role]
        );
        console.log(`CREATED: ${acct.email}`);
        created.push({ email: acct.email, password: acct.password, name: acct.name });
      } catch (err) {
        console.error(`ERROR processing ${acct.email}:`, err.message || err);
      }
    }

    if (created.length) {
      console.log('\nCreated accounts (for ThunderClient testing):');
      for (const c of created) {
        console.log(`- Email: ${c.email}  Password: ${c.password}  Name: ${c.name}`);
      }
    } else {
      console.log('\nNo new accounts were created.');
    }

    console.log('\nDone.');
  } catch (err) {
    console.error('Fatal error:', err.message || err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
