"use client";
import { Suspense } from "react";
import LoginForm from "./components/LoginForm";
import styles from "./page.module.css";

function AuthPageContent() {
  return (
    <section className={`mx-auto max-w-2xl ${styles.textMain}`}>
      <h1 className="text-2xl font-bold">Welcome to CloudVault</h1>
      <p className={styles.textMuted}>Sign in with your instructor account to access rubric and reflection pages.</p>
      <div className="mt-6">
        <LoginForm />
      </div>
      <div className={`mt-4 ${styles.textMuted}`}>
        <strong>Instructor accounts:</strong>
        <div>rob@launchpadphilly.org / lpuser1</div>
        <div>sanaa@launchpadphilly.org / lpuser2</div>
        <div>taheera@launchpadphilly.org / lpuser3</div>
      </div>
    </section>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
