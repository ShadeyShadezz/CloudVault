"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getCurrentUser, isInstructor, instructorList } from "../../lib/auth";

export default function RubricPage() {
  const [authorized, setAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    setAuthorized(isInstructor(u));
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!authorized) {
    return (
      <section className={`space-y-6 ${styles.textMain}`}>
        <h1 className="text-3xl font-bold">Rubric Evidence</h1>
        <p className={styles.textMuted}>You must be signed in as an instructor to view this page.</p>
        <p className={styles.textMuted}>Please <a href="/auth" className="underline">sign in</a> with an instructor account.</p>
      </section>
    );
  }

  const instructors = instructorList();

  return (
    <section className={`space-y-6 ${styles.textMain}`}>
      <h1 className="text-3xl font-bold">Rubric Evidence</h1>
      <p className={styles.textMuted}>This page helps instructors quickly find where you meet the CCC requirements.</p>

      <ul className={`space-y-3 ${styles.textMuted}`}>
        <li><strong>CCC.1.1:</strong> Problem summary — See <a href="/about" className={`${styles.textMain} underline`}>About page</a> and README section 2.</li>
        <li><strong>CCC.1.2:</strong> Solution plan and wireframes — See <a href="/why" className={`${styles.textMain} underline`}>Why</a> and project-plan.md (in repo).</li>
        <li><strong>CCC.1.3:</strong> Working features — See <a href="/features" className={`${styles.textMain} underline`}>Features</a> and <a href="/product" className={`${styles.textMain} underline`}>Product</a> pages.</li>
      </ul>

      <h2 className="text-xl font-semibold">Instructor logins</h2>
      <div className={styles.textMuted}>
        {instructors.map((s) => (
          <div key={s}>{s} ➜ (use instructor password)</div>
        ))}
      </div>
    </section>
  );
}
