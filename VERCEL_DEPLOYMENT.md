# Vercel Deployment Guide - CloudVault

This guide walks you through deploying CloudVault to Vercel with proper authentication setup.

## Prerequisites

- Vercel account with GitHub connected
- Neon PostgreSQL database (or another PostgreSQL provider)
- Repository pushed to GitHub

## Architecture Overview

**Auth Flow for Vercel:**
```
User Login → NextAuth Route Handler (/api/auth/[...nextauth])
         ↓
    Credentials Provider
         ↓
   PostgreSQL Database (Neon)
         ↓
   JWT Session Created
         ↓
   User Authenticated
```

**Single Auth Source:**
- **File**: `src/lib/auth.ts`
- **Database**: PostgreSQL `users` table
- **Strategy**: JWT with 30-day expiration
- **Provider**: Credentials (email/password)

## Step 1: Prepare Your Repository

Ensure these files are committed:

```bash
git add .env.example VERCEL_DEPLOYMENT.md
git commit -m "Add Vercel deployment configuration"
git push
```

**Delete old/duplicate auth files** (optional but recommended):
- `lib/auth/serverAuth.ts` - hardcoded instructors (deprecated, use database)
- `lib/auth/clientAuth.ts` - no longer used
- `pages/api/auth/[...nextauth].ts` - duplicate of `src/app/api/auth/[...nextauth]/route.ts`

## Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your CloudVault repository
4. Select Framework: **Next.js**
5. **Don't deploy yet** - configure environment variables first

## Step 3: Set Environment Variables in Vercel

In the Vercel project settings, go to **Settings** → **Environment Variables** and add:

### Required Variables

#### `DATABASE_URL`
- **Value**: Your Neon PostgreSQL connection string
- **Get it from**: [Neon Console](https://console.neon.tech)
  - Select your project → Copy connection string
  - Format: `postgresql://user:password@host/dbname?sslmode=require`
- **Environments**: Production, Preview, Development

#### `NEXTAUTH_SECRET`
- **Value**: Generate with: `openssl rand -base64 32`
- **Important**: Use a strong random value
- **Environments**: Production, Preview, Development
- **⚠️ CRITICAL**: Must be the same across all environments for JWT to work
  - Changing this will invalidate all existing sessions

#### `NEXTAUTH_URL`
- **Value**: Your Vercel deployment URL
  - **Production**: `https://yourproject.vercel.app`
  - **Preview**: `https://[branch]--yourproject.vercel.app`
  - **Development**: `http://localhost:3000`
- **Environments**: Vary by environment (see table below)

#### `NEXTAUTH_URL_INTERNAL` (Recommended)
- **Value**: Same as `NEXTAUTH_URL` 
- **Purpose**: Ensures server-to-server auth requests work reliably
- **Environments**: Production, Preview, Development

### Optional Variables

#### `NEXTAUTH_DEBUG`
- **Value**: `"false"` (production) or `"true"` (debugging)
- **Purpose**: Logs authentication flow details
- **Default**: `false`

#### `SEED_DEFAULT_PASSWORD` & `API_KEY`
- Set these if your app needs them
- Not required for basic auth

### Environment Variable Setup Table

| Variable | Production | Preview | Development |
|----------|-----------|---------|-------------|
| `DATABASE_URL` | Your Neon prod URL | Same or separate DB | Local/dev DB |
| `NEXTAUTH_SECRET` | `[your-secret]` | `[same-secret]` | `[same-secret]` |
| `NEXTAUTH_URL` | `https://yourdomain.com` | `https://[branch]--project.vercel.app` | `http://localhost:3000` |
| `NEXTAUTH_URL_INTERNAL` | `https://yourdomain.com` | `https://[branch]--project.vercel.app` | `http://localhost:3000` |

**Example for Production:**
```
DATABASE_URL=postgresql://user:pass@ep-xyz.us-east-1.aws.neon.tech/db?sslmode=require
NEXTAUTH_SECRET=xY7kZ9mW2pQ5rT8uV1aB3cD6eF4gH9iJ0
NEXTAUTH_URL=https://cloudvault.vercel.app
NEXTAUTH_URL_INTERNAL=https://cloudvault.vercel.app
NEXTAUTH_DEBUG=false
```

## Step 4: Deploy to Vercel

1. In Vercel dashboard, click **Deploy**
2. Monitor build logs for errors
3. Once deployed, test the auth flow

## Step 5: Initialize Database on Vercel

After first deployment, run the seed script to create instructor accounts:

**Option A: Via Vercel Deployments**
```bash
vercel env pull  # Get env vars locally
npm run seed     # Seed database
```

**Option B: Via Database Console**
Login to [Neon Console](https://console.neon.tech), run this SQL:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert instructors (passwords are bcrypt hashed)
INSERT INTO users (email, password, role) VALUES
  ('rob@launchpadphilly.org', '$2b$10$...bcrypt-hash-for-lpuser1...', 'instructor'),
  ('sanaa@launchpadphilly.org', '$2b$10$...bcrypt-hash-for-lpuser2...', 'instructor'),
  ('taheera@launchpadphilly.org', '$2b$10$...bcrypt-hash-for-lpuser3...', 'instructor');
```

**Easier: Run seed locally and copy to Vercel**
```bash
npm run seed
# Then verify in Neon console that users were created
```

## Step 6: Test Authentication on Vercel

1. Go to your Vercel deployment URL
2. Click "Sign in" 
3. Use credentials:
   - Email: `rob@launchpadphilly.org`
   - Password: `lpuser1`
4. Should redirect to `/account` page showing your profile

## Troubleshooting

### "Sign in failed" or "Invalid credentials"

1. **Check database connection**: Verify `DATABASE_URL` is correct and accessible from Vercel
   - Test in Neon console: can you connect with the string?
2. **Check user exists**: Verify instructor accounts were seeded
   ```sql
   SELECT email, role FROM users LIMIT 5;
   ```
3. **Check Vercel logs**: Go to Deployments → Logs → Function logs, look for auth errors

### "Session lost immediately after login"

1. **Check `NEXTAUTH_SECRET`**: Must be consistent across all deploys
   - Never change this in production unless you want to log everyone out
2. **Check `NEXTAUTH_URL`**: Must match your actual Vercel domain exactly
3. **Check cookies**: Open DevTools → Application → Cookies, look for `next-auth` cookies

### Database connection errors

1. **Verify SSL mode**: Neon requires `?sslmode=require` in connection string
2. **Check IP allowlist**: Vercel's IP may need to be allowlisted in your database provider
   - Most cloud databases (like Neon) allow all IPs by default
3. **Test connection locally**:
   ```bash
   psql "your-DATABASE_URL-here"
   ```

### Build fails with "Cannot find module"

1. Check all imports use `@/` path alias (auto-configured in Next.js)
2. Verify `src/lib/auth.ts` exists and exports `authOptions`
3. Check `tsconfig.json` has proper path mappings

## Next Steps

1. **Monitor in production**: Use Vercel's built-in Analytics
2. **Set up custom domain**: Vercel → Project Settings → Domains
3. **Enable Vercel Analytics**: See real user metrics
4. **Add error monitoring**: Integrate Sentry for error tracking

## Important Notes

- **Never commit `.env` to GitHub** - only `.env.example`
- **NEXTAUTH_SECRET must remain the same** across all environments and redeploys
- **Database backups**: Neon provides automatic backups, set retention to desired period
- **Session duration**: Currently 30 days, configurable in `src/lib/auth.ts`

## References

- [NextAuth.js Deployment Docs](https://next-auth.js.org/deployment)
- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Neon PostgreSQL](https://neon.tech)
