# CloudVault

CloudVault is a nighttime-themed import/export app designed to hold files of any kind — images, videos, 3D objects, PDFs and more — and make organization simple for students and creators.

## Project overview
- App name: CloudVault
- Who benefits most: Students, creators, and professionals who manage mixed-media portfolios and files.

## Problem summary
Files are scattered across multiple platforms and formats. CloudVault aims to unify storage, provide tags and collections, and offer import/export bundles.

## Features
- Universal file support (MVP stores files client-side for demo)
- Manual organization (tags, collections)
- AI-assisted tag suggestions & content extraction (planned)

## Tech stack
- Next.js (app router)
- React
- Tailwind CSS (already present in project)

## How to run
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`

Note: This repo's product page stores files client-side (localStorage) for demo purposes. For production, add server-side storage.

## Where to find CCC evidence
- CCC.1.1: `app/about/page.tsx` + README section "Problem summary"
- CCC.1.2: `app/why/page.tsx` and `project-plan.md` in repo
- CCC.1.3: `app/features/page.tsx` and `app/product/page.tsx`

## Reflection
See `app/reflection/page.tsx` for notes on what went well, what didn’t, and next steps.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
