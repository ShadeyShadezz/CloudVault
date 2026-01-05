import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>© {year} CloudVault — Built for students & creators</div>
    </footer>
  );
}
