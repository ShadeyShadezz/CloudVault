'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const res = await signIn('credentials', { 
      redirect: false, 
      email, 
      password 
    });
    
    setLoading(false);
    
    if (!res) return setError('Sign-in failed');
    if (res.error) return setError(res.error || 'Invalid credentials');
    
    router.push('/account');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.title}>Sign in</h3>
      {error && <div className={styles.error}>{error}</div>}
      
      <div>
        <label className={styles.label}>Email</label>
        <input 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className={styles.input}
          disabled={loading}
        />
      </div>
      
      <div>
        <label className={styles.label}>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className={styles.input}
          disabled={loading}
        />
      </div>
      
      <div className={styles.formActions}>
        <button 
          type="submit" 
          className={styles.btn}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}
