'use client';

import styles from "./page.module.css";

import Link from 'next/link';

export default function Home() {
  return (
    <section className={styles.homeSection}>
      <div className={styles.panel}>
        <h1 className={styles.homeTitle}>CloudVault</h1>
        <p className={styles.homeDescription}>A unified import/export app for storing images, videos, 3D objects, PDFs and any digital media — organized for students and creators.</p>
        <div className={styles.homeActions}>
          <a href="/product" className={styles.cta}>Open Vault</a>
          <a href="/features" className={`${styles.textMuted} ${styles.homeLink}`}>See features</a>
          <a href="/about" className={`${styles.textMuted} ${styles.homeLink}`}>Learn more</a>
        </div>
      </div>

      <div className={styles.homeGrid}>
        <div className={`${styles.panelSub} ${styles.homeGridItem}`}>
          <h3 className={styles.homeGridTitle}>Who benefits most</h3>
          <p className={styles.homeGridText}>Students, portfolio-builders, and creative professionals who work with mixed media.</p>
        </div>
        <div className={`${styles.panelSub} ${styles.homeGridItem}`}>
          <h3 className={styles.homeGridTitle}>Quick start</h3>
          <p className={styles.homeGridText}>Sign up and upload files in the Product page. This demo stores files client-side for prototyping.</p>
        </div>
      </div>
    </section>
  );
}
