"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { getCurrentUser, isInstructor } from "../lib/auth";

export default function Header() {
  const [user, setUser] = useState<string | null>(null);
  const [instructor, setInstructor] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    setInstructor(isInstructor(u));
  }, []);

  return (
    <header className={`w-full ${styles.headerBorder} bg-transparent`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className={`${styles.logo} flex items-center justify-center font-bold`}>CV</div>
          <div className={`text-xl font-semibold ${styles.brand}`}>CloudVault</div>
        </Link>
        <nav className={styles.nav}>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/why" className={styles.navLink}>Why</Link>
          <Link href="/features" className={styles.navLink}>Features</Link>
          <Link href="/product" className={styles.navLink}>Product</Link>
          {instructor && <Link href="/rubric" className={styles.navLink}>Rubric</Link>}
          {instructor && <Link href="/reflection" className={styles.navLink}>Reflection</Link>}
          {user ? (
            <Link href="/product" className={`ml-4 ${styles.cta}`}>{user}</Link>
          ) : (
            <Link href="/auth" className={`ml-4 ${styles.cta}`}>Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
