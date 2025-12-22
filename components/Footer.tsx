import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="mx-auto max-w-6xl px-6">© {year} CloudVault — Built for students & creators</div>
    </footer>
  );
}
