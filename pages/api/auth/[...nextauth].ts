import NextAuth from 'next-auth';
import { authOptions } from '../../../lib/auth/serverAuth';

export default NextAuth(authOptions as any);
