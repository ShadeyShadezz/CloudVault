# CloudVault Authentication Guide

## Overview
CloudVault uses NextAuth.js for authentication with hardcoded instructor accounts. Only instructors can access the Rubric Evidence and Project Reflection pages.

## Instructor Accounts

The following accounts have instructor (admin) access:

| Email | Password |
|-------|----------|
| rob@launchpadphilly.org | lpuser1 |
| sanaa@launchpadphilly.org | lpuser2 |
| taheera@launchpadphilly.org | lpuser3 |

## Authentication Flow

### 1. Sign In Page (`/auth`)
- Located at `/app/auth/page.tsx`
- Wrapped with Suspense to handle `useSearchParams()`
- Uses `LoginForm` component from `/app/auth/components/LoginForm.tsx`

### 2. Login Form Component
- Submits credentials to NextAuth Credentials Provider
- On successful login, redirects to `/account`
- Shows error message on failed login

### 3. Session Management
- **Strategy**: JWT (JSON Web Tokens)
- **Session Duration**: 30 days
- **Provider**: NextAuth.js with Credentials Provider
- **Config**: `/lib/auth/serverAuth.ts`

## Protected Pages

### Rubric Evidence (`/rubric`)
- **Access**: Instructors only (authenticated + valid instructor email)
- **Features**:
  - Shows CCC requirement mapping
  - Lists all instructor accounts
  - Redirects unauthenticated users to `/auth`

### Project Reflection (`/reflection`)
- **Access**: Instructors only (authenticated + valid instructor email)
- **Features**:
  - Project retrospective
  - What went well / didn't go well
  - Future improvements
  - Redirects unauthenticated users to `/auth`

## User Account Page (`/account`)
- **Access**: All authenticated users
- **Features**:
  - Display email address
  - Show user role (Instructor or User)
  - List permissions for instructors
  - Sign out button

## Navigation Updates
- **Header**: Updated to show "Account" button when logged in, "Sign in" when logged out
- **Rubric/Reflection links**: Only visible to authenticated instructors

## File Structure

```
app/
├── auth/
│   ├── components/
│   │   ├── AuthForm.tsx
│   │   ├── AuthForm.module.css
│   │   ├── LoginForm.tsx
│   │   └── LoginForm.module.css
│   ├── page.tsx
│   └── page.module.css
├── account/
│   ├── page.tsx
│   └── page.module.css
├── rubric/
│   ├── page.tsx
│   └── page.module.css
├── reflection/
│   ├── page.tsx
│   └── page.module.css
├── providers.tsx (SessionProvider wrapper)
└── layout.tsx (wraps with Providers)

lib/auth/
├── serverAuth.ts (NextAuth configuration)
├── clientAuth.ts (client-side utilities - deprecated)
└── index.ts (exports)

pages/api/auth/[...nextauth].ts (NextAuth route handler)
```

## Environment Variables Required

```env
NEXTAUTH_SECRET=<your-secret-here>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_DEBUG=true
```

## Testing the Authentication

### Test as Instructor:
1. Go to http://localhost:3001/auth
2. Enter email: `rob@launchpadphilly.org`
3. Enter password: `lpuser1`
4. Click "Sign in"
5. You should see `/account` page with your profile
6. Navigation should show "Rubric" and "Reflection" links
7. Click "Account" button in header to view account page
8. Click "Sign Out" to logout

### Test Protected Pages:
1. Try accessing `/rubric` without signing in → redirects to `/auth`
2. Sign in with instructor account → can view Rubric page
3. Sign out and try accessing `/reflection` → redirects to `/auth`

### Test Account Page:
1. Sign in with instructor account
2. Click "Account" button in header
3. Verify account information displays correctly
4. Verify permissions list shows properly
5. Click "Sign Out" to logout and redirect to home

## Security Notes

- Instructor passwords are currently hardcoded in `lib/auth/serverAuth.ts`
- For production, migrate to database-backed authentication
- Session tokens are JWT-based and expire after 30 days
- NEXTAUTH_SECRET should be a strong, randomly generated value

## Troubleshooting

### Users can't sign in:
1. Verify NEXTAUTH_SECRET is set in .env
2. Check NEXTAUTH_URL matches your deployment URL
3. Ensure email matches exactly (case-insensitive internally)

### Session expires immediately:
1. Check NEXTAUTH_SECRET is consistent across restarts
2. Verify JWT configuration in serverAuth.ts
3. Check browser cookies are enabled

### Account page shows "not signed in":
1. Check if session is properly initialized
2. Verify SessionProvider is wrapping the app layout
3. Check browser console for auth errors

## Next Steps

1. **Database Integration**: Move instructor accounts to database
2. **OAuth Providers**: Add GitHub/Google sign-in options
3. **Email Verification**: Implement email-based signup
4. **Password Reset**: Add password recovery flow
5. **User Roles**: Expand role system beyond instructor/user
