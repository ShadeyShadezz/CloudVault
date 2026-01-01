// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { query } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const res = await query('SELECT id, email, password, role FROM users WHERE email = $1 LIMIT 1', [credentials.email]);
        const user = res.rows?.[0];
        if (!user) return null;
        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;
        return { id: String(user.id), email: user.email, role: user.role };
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
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXTAUTH_DEBUG === 'true',
};

export default authOptions;
