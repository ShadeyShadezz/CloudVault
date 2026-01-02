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

export default function ReflectionPage(){
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
      <section className={`space-y-6 ${styles.textMain}`}>
        <h1 className="text-3xl font-bold">Reflection</h1>
        <p className={styles.textMuted}>You must be signed in as an instructor to view this page. <a href="/auth" className="underline">Sign in</a></p>
      </section>
    );
  }

  return (
    <section className={`space-y-8 ${styles.textMain}`}>
      <div>
        <h1 className="text-4xl font-bold mb-2">Project Reflection</h1>
        <p className={styles.textMuted}>Self-assessment of CloudVault development and future direction.</p>
      </div>

      <div className={styles.reflectionBox}>
        <div className={styles.reflectionIcon}>✓</div>
        <h2 className={`text-2xl font-bold mb-4 ${styles.positive}`}>What Went Well</h2>
        <p className={styles.textMuted}>
          Built a consistent UI, navigation and a demo product flow for client-side uploads. 
          Established clear architectural patterns and maintainable code structure.
        </p>
      </div>

      <div className={styles.reflectionBox}>
        <div className={`${styles.reflectionIcon} ${styles.negative}`}>⚠</div>
        <h2 className={`text-2xl font-bold mb-4 ${styles.negative}`}>What Didn't Go Well / Challenges</h2>
        <p className={styles.textMuted}>
          Storing very large files client-side is limited; server-side storage and streaming are needed for production. 
          Scalability is a significant constraint without proper backend infrastructure.
        </p>
      </div>

      <div className={styles.reflectionBox}>
        <div className={styles.reflectionIcon}>→</div>
        <h2 className={`text-2xl font-bold mb-4 ${styles.future}`}>What I'd Build Next</h2>
        <ul className={`${styles.buildList} ${styles.textMuted}`}>
          <li>
            <strong>Server-backed storage (S3)</strong> with metadata DB
            <span className={styles.description}> — Enable scalable file handling and persistent storage</span>
          </li>
          <li>
            <strong>OAuth providers</strong> (GitHub, Google)
            <span className={styles.description}> — Simplify authentication for broader user adoption</span>
          </li>
          <li>
            <strong>AI integration</strong> for tag suggestions and content extraction
            <span className={styles.description}> — Enhance discoverability and reduce manual organization</span>
          </li>
        </ul>
      </div>

      <div className={styles.summaryBox}>
        <h2 className={`text-lg font-semibold mb-3 ${styles.future}`}>Key Takeaways</h2>
        <ul className={`${styles.takeawayList} ${styles.textMuted}`}>
          <li>Full-stack architecture is essential for file-handling applications</li>
          <li>User experience consistency drives engagement</li>
          <li>MVP scope with clear future roadmap enables iterative improvement</li>
        </ul>
      </div>
    </section>
  );
}
