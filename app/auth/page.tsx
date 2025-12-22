"use client";
import { useSearchParams } from "next/navigation";
import AuthForm from "../../components/AuthForm";
import styles from "./page.module.css";

export default function AuthPage() {
  const params = useSearchParams();
  const mode = params?.get("mode") === "signup" ? "signup" : "login";
  return (
    <section className={`mx-auto max-w-2xl ${styles.textMain}`}>
      <h1 className="text-2xl font-bold">Welcome to CloudVault</h1>
      <p className={styles.textMuted}>Sign in or create an account to access your vault.</p>
      <div className="mt-6">
        <AuthForm mode={mode as "login" | "signup"} />
      </div>
      <div className={`mt-4 ${styles.textMuted}`}>Demo instructor logins: rob@launchpadphilly.org / lpuser1 etc. (use sign up to create new)</div>
    </section>
  );
}
