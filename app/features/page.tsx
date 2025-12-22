import styles from "./page.module.css";

export default function FeaturesPage() {
  return (
    <section className={`space-y-6 ${styles.textMain}`}>
      <h1 className="text-3xl font-bold">Features</h1>
      <p className={styles.textMuted}>Core features designed for cross-media organization and easy sharing.</p>

      <ul className={`${styles.featureList} ${styles.textMuted}`}>
        <li><strong>Universal File Support:</strong> Upload any file type and preserve metadata.</li>
        <li><strong>Manual Organization Control:</strong> Folders, tags, and collections for custom workflows.</li>
        <li><strong>Smart Search:</strong> (AI planned) search by content, tags, or file type.</li>
        <li><strong>Import / Export:</strong> Easy export bundles for portfolios or submissions.</li>
      </ul>

      <h2 className="text-2xl font-semibold">How AI helps</h2>
      <p className={styles.textMuted}>AI will suggest tags, extract text from PDFs, and summarize media for faster discovery. (Prototype: client-side suggestions.)</p>
    </section>
  );
}
