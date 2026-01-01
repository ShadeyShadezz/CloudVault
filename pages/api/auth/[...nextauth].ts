// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const client = await pool.connect();
        try {
          const res = await client.query('SELECT id, email, password, role FROM users WHERE email = $1 LIMIT 1', [credentials.email]);
          const row = res.rows[0];
          if (!row) return null;
          const match = await bcrypt.compare(credentials.password, row.password);
          if (!match) return null;
          return { id: String(row.id), email: row.email, role: row.role };
        } finally {
          client.release();
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || 'user';
      return token;
    },
    async session({ session, token }) {
      (session as any).user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXTAUTH_DEBUG === 'true',
});
