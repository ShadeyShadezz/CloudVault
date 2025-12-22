"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getCurrentUser, isInstructor } from "../../lib/auth";

export default function ReflectionPage(){
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(()=>{
    const u = getCurrentUser();
    setAuthorized(isInstructor(u));
    setChecked(true);
  },[]);

  if (!checked) return null;

  if (!authorized) {
    return (
      <section className={`space-y-6 ${styles.textMain}`}>
        <h1 className="text-3xl font-bold">Reflection</h1>
        <p className={styles.textMuted}>You must be signed in as an instructor to view this page. <a href="/auth" className="underline">Sign in</a></p>
      </section>
    );
  }

  return (
    <section className={`space-y-6 ${styles.textMain}`}>
      <h1 className="text-3xl font-bold">Reflection</h1>
      <h2 className="text-xl font-semibold">What went well</h2>
      <p className={styles.textMuted}>Built a consistent UI, navigation and a demo product flow for client-side uploads.</p>

      <h2 className="text-xl font-semibold">What didn't go well</h2>
      <p className={styles.textMuted}>Storing very large files client-side is limited; server-side storage and streaming are needed for production.</p>

      <h2 className="text-xl font-semibold">What I'd build next</h2>
      <ul className={`list-disc pl-6 ${styles.textMuted}`}>
        <li>Server-backed storage (S3) with metadata DB</li>
        <li>Authentication with NextAuth and OAuth providers</li>
        <li>AI integration for tag suggestions and content extraction</li>
      </ul>
    </section>
  );
}
