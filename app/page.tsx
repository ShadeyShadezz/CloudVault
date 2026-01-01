import styles from "./page.module.css";
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';

function LoginArea() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span>Signed in as {session.user.email}</span>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="px-3 py-1 bg-red-600 rounded">Sign out</button>
      </div>
    );
  }
  return (
    <Link href="/login" className="px-3 py-1 bg-blue-600 rounded">
      Sign in
    </Link>
  );
}

export default function Home() {
  return (
    <section className={`mx-auto max-w-4xl space-y-6 py-12 ${styles.textMain}`}>
      <div className={`rounded-lg ${styles.panel}`}>
        <h1 className="text-4xl font-bold">CloudVault</h1>
        <p className={`mt-2 ${styles.textMuted}`}>A unified import/export app for storing images, videos, 3D objects, PDFs and any digital media — organized for students and creators.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/product" className={`rounded-md ${styles.cta}`}>Open Vault</a>
          <a href="/features" className={`${styles.textMuted} underline`}>See features</a>
          <a href="/about" className={`${styles.textMuted} underline`}>Learn more</a>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className={`rounded-md ${styles.panelSub}`}>
          <h3 className={`font-semibold ${styles.textMain}`}>Who benefits most</h3>
          <p className={styles.textMuted}>Students, portfolio-builders, and creative professionals who work with mixed media.</p>
        </div>
        <div className={`rounded-md ${styles.panelSub}`}>
          <h3 className={`font-semibold ${styles.textMain}`}>Quick start</h3>
          <p className={styles.textMuted}>Sign up and upload files in the Product page. This demo stores files client-side for prototyping.</p>
        </div>
      </div>

      <div className="mt-6">
        <LoginArea />
      </div>
    </section>
  );
}
