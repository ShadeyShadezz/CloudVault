"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";

const INSTRUCTOR_EMAILS = [
  'rob@launchpadphilly.org',
  'sanaa@launchpadphilly.org',
  'taheera@launchpadphilly.org',
];

export default function RubricPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.textMuted}>Loading...</div>;
  }

  if (!session?.user?.email || !INSTRUCTOR_EMAILS.includes(session.user.email)) {
    return (
      <section className={styles.deniedSection}>
        <h1 className={styles.pageTitle}>Rubric Evidence</h1>
        <p className={styles.textMuted}>You must be signed in as an instructor to view this page.</p>
        <p className={styles.textMuted}>Please <a href="/auth">sign in</a> with an instructor account.</p>
      </section>
    );
  }

  return (
    <section className={styles.pageSection}>
      <div>
        <h1 className={styles.mainTitle}>Rubric Evidence Page</h1>
        <p className={styles.textMuted}>This page helps instructors quickly find where you meet the CCC requirements.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>CCC.1.1 - Problem Understanding</h2>
        
        <div className={styles.evidence}>
          <h3 className={styles.evidenceTitle}>Where to Find Evidence:</h3>
          <ul className={styles.evidenceList}>
            <li>See <a href="/about" className={styles.evidenceLink}>About page</a> for problem summary and user needs</li>
            <li>README section 2 for detailed problem statement</li>
          </ul>
        </div>

        <div className={styles.evidence}>
          <h3 className={styles.evidenceTitle}>Key Evidence Includes:</h3>
          <ul className={styles.evidenceList}>
            <li>File storage fragmentation across platforms</li>
            <li>Need for unified organization of mixed media</li>
            <li>Student and creator workflow challenges</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>CCC.1.2 - Solution Planning & Design</h2>
        
        <div className={styles.evidence}>
          <h3 className={styles.evidenceTitle}>Where to Find Evidence:</h3>
          <ul className={styles.evidenceList}>
            <li>See <a href="/why" className={styles.evidenceLink}>Why page</a> for solution overview</li>
            <li>project-plan.md in repo for detailed planning</li>
            <li>Wireframes in public/wireframes directory</li>
          </ul>
        </div>

        <div className={styles.evidence}>
          <h3 className={styles.evidenceTitle}>Key Evidence Includes:</h3>
          <ul className={styles.evidenceList}>
            <li>Unified tagging and categorization across file types</li>
            <li>Import/export flows for portfolios and submissions</li>
            <li>AI-assisted search (planned)</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>CCC.1.3 - Working Implementation</h2>
        
        <div className={styles.evidence}>
          <h3 className={styles.evidenceTitle}>Where to Find Evidence:</h3>
          <ul className={styles.evidenceList}>
            <li>See <a href="/features" className={styles.evidenceLink}>Features page</a> for core functionality</li>
            <li>Visit <a href="/product" className={styles.evidenceLink}>Product page</a> for working demo</li>
            <li>GitHub repo for codebase and implementation</li>
          </ul>
        </div>

        <div className={styles.evidence}>
          <h3 className={styles.evidenceTitle}>Key Evidence Includes:</h3>
          <ul className={styles.evidenceList}>
            <li>Universal file upload and storage functionality</li>
            <li>Client-side file management and download</li>
            <li>Responsive UI with consistent design</li>
            <li>Authentication system with role-based access</li>
          </ul>
        </div>
      </div>

      <div className={styles.quickNav}>
        <h2 className={styles.navMainTitle}>Quick Navigation to Evidence</h2>
        <div className={styles.navGrid}>
          <a href="/about" className={styles.navLink}>Instructor Access</a>
          <a href="/why" className={styles.navLink}>Solution Overview</a>
          <a href="/features" className={styles.navLink}>Core Features</a>
          <a href="/product" className={styles.navLink}>Working Demo</a>
        </div>
      </div>
    </section>
  );
}
