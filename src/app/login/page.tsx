'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', { redirect: false, email, password });
    if (!res) return setError('Sign-in failed');
    if (res.error) return setError(res.error);
    // successful
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Sign in</h1>
        {error && <div className={styles.error}>{error}</div>}
        <label className={styles.label}>Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
        </label>
        <label className={styles.labelPassword}>Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
        </label>
        <button type="submit" className={styles.button}>Sign in</button>
      </form>
    </div>
  );
}
