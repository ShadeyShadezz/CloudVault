"use client";
import { Suspense } from "react";
import LoginForm from "./components/LoginForm";
import styles from "./page.module.css";

function AuthPageContent() {
  return (
    <section className={styles.pageSection}>
      <h1 className={styles.pageTitle}>Welcome to CloudVault</h1>
      <p className={styles.textMuted}>Sign in to access your account.</p>
      <div className={styles.credentialsSection}>
        <LoginForm />
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
