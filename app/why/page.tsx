import styles from "./page.module.css";

export default function WhyPage() {
  return (
    <section className={`space-y-6 ${styles.textMain}`}>
      <h1 className="text-3xl font-bold">Why CloudVault?</h1>
      <p className={styles.textMuted}>CloudVault focuses on unified file organization, intelligent search, and easy import/export flows so users can store, retrieve and present any media without chasing multiple platforms.</p>

      <h2 className="text-2xl font-semibold">Solution Overview</h2>
      <ul className={`list-disc pl-6 ${styles.textMuted}`}>
        <li>Unified tagging and categorization across file types</li>
        <li>Simple import/export flows for students and creators</li>
        <li>AI-assisted search and auto-tag suggestions (planned)</li>
      </ul>

      <h3 className="text-xl font-semibold">Challenges</h3>
      <p className={styles.textMuted}>Handling very large files and preserving original file fidelity are constraints; initial MVP will use client-side storage to demonstrate features and flows.</p>
    </section>
  );
}
