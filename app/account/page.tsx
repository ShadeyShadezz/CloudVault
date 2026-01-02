"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";

const INSTRUCTOR_EMAILS = [
  'rob@launchpadphilly.org',
  'sanaa@launchpadphilly.org',
  'taheera@launchpadphilly.org',
];

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <section className={`space-y-6 ${styles.textMain}`}>
        <p className={styles.textMuted}>Loading...</p>
      </section>
    );
  }

  if (!session?.user) {
    return (
      <section className={`space-y-6 ${styles.textMain}`}>
        <h1 className="text-3xl font-bold">Account</h1>
        <p className={styles.textMuted}>You are not signed in. <a href="/auth" className="underline">Sign in here</a></p>
      </section>
    );
  }

  const isInstructor = INSTRUCTOR_EMAILS.includes(session.user.email || "");

  return (
    <section className={`space-y-6 ${styles.textMain}`}>
      <h1 className="text-3xl font-bold">Your Account</h1>

      <div className={styles.panel}>
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        
        <div className={`space-y-4 ${styles.info}`}>
          <div>
            <p className={styles.label}>Email</p>
            <p className={styles.value}>{session.user.email}</p>
          </div>

          <div>
            <p className={styles.label}>Name</p>
            <p className={styles.value}>{session.user.name || session.user.email}</p>
          </div>

          <div>
            <p className={styles.label}>Role</p>
            <p className={`${styles.value} ${isInstructor ? styles.instructor : styles.user}`}>
              {isInstructor ? "Instructor" : "User"}
            </p>
          </div>

          {isInstructor && (
            <div className={styles.permissions}>
              <p className={styles.label}>Access</p>
              <ul className={`${styles.permissionList}`}>
                <li className={styles.permissionItem}>✓ Rubric Evidence</li>
                <li className={styles.permissionItem}>✓ Project Reflection</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={styles.logoutBtn}
        >
          Sign Out
        </button>
      </div>
    </section>
  );
}
