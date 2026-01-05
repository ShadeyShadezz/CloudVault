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
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.headerLogo}>
          <div className={styles.logo}>CV</div>
          <div className={styles.brandText}>CloudVault</div>
        </Link>
        <nav className={styles.nav}>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/features" className={styles.navLink}>Features</Link>
          <Link href="/product" className={styles.navLink}>Product</Link>
          <Link href="/why" className={styles.navLink}>Why</Link>
          {isInstructor && <Link href="/rubric" className={styles.navLink}>Rubric</Link>}
          {isInstructor && <Link href="/reflection" className={styles.navLink}>Reflection</Link>}
          {session?.user ? (
            <Link href="/account" className={styles.ctaLink}>Account</Link>
          ) : (
            <Link href="/auth" className={styles.ctaLink}>Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
