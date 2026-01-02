import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const INSTRUCTORS: Record<string, string> = {
  'rob@launchpadphilly.org': 'lpuser1',
  'sanaa@launchpadphilly.org': 'lpuser2',
  'taheera@launchpadphilly.org': 'lpuser3',
};

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
        
        const email = credentials.email.toLowerCase().trim();
        const password = credentials.password;
        
        if (INSTRUCTORS[email] && INSTRUCTORS[email] === password) {
          return { 
            id: email, 
            email: email, 
            name: email,
            role: 'instructor' 
          };
        }
        
        return null;
      },
    }),
  ],
  session: { 
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'instructor';
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth?error=true',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXTAUTH_DEBUG === 'true',
};

export default authOptions;
