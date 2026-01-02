"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "./Header.module.css";

const INSTRUCTOR_EMAILS = [
  'rob@launchpadphilly.org',
  'sanaa@launchpadphilly.org',
  'taheera@launchpadphilly.org',
];

export default function Header() {
  const { data: session } = useSession();
  const isInstructor = session?.user?.email && INSTRUCTOR_EMAILS.includes(session.user.email);

  return (
    <header className={`w-full ${styles.headerBorder} bg-transparent`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className={`${styles.logo} flex items-center justify-center font-bold`}>CV</div>
          <div className={`text-xl font-semibold ${styles.brand}`}>CloudVault</div>
        </Link>
        <nav className={styles.nav}>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/features" className={styles.navLink}>Features</Link>
          <Link href="/product" className={styles.navLink}>Product</Link>
          <Link href="/why" className={styles.navLink}>Why</Link>
          {isInstructor && <Link href="/rubric" className={styles.navLink}>Rubric</Link>}
          {isInstructor && <Link href="/reflection" className={styles.navLink}>Reflection</Link>}
          {session?.user ? (
            <Link href="/account" className={`ml-4 ${styles.cta}`}>Account</Link>
          ) : (
            <Link href="/auth" className={`ml-4 ${styles.cta}`}>Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
