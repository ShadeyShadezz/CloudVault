import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <section className={styles.pageSection}>
      <h1 className={styles.pageTitle}>About CloudVault</h1>
      <p className={styles.textMuted}>CloudVault is a nighttime-themed import/export app designed to hold files of any kind — images, videos, 3D objects, PDFs and more — while simplifying organization for students, creators, and professionals.</p>

      <h2 className={styles.sectionTitle}>The File Storage Problem</h2>
      <p className={styles.textMuted}>Files come in many types and sizes. Managing them in a way that preserves metadata, versions, and structure is difficult. Young creators face fragmented storage (multiple cloud accounts), inconsistent file naming, and loss of context.</p>

      <h3 className={styles.subSectionTitle}>Real-life example</h3>
      <p className={styles.textMuted}>A student working on a portfolio has images, video walkthroughs, and 3D models across drives and social platforms — finding the right files for a presentation becomes time-consuming and stressful.</p>

      <h3 className={styles.subSectionTitle}>Existing solutions</h3>
      <p className={styles.textMuted}>Google Drive and Dropbox provide storage but limited manual organization for specialized file types; they work but don't solve cross-media organization or contextual tagging well.</p>
    </section>
  );
}
