'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-gray-800 rounded-md shadow">
        <h1 className="text-2xl mb-4">Sign in</h1>
        {error && <div className="mb-3 text-red-400">{error}</div>}
        <label className="block mb-2">Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-2 rounded bg-gray-700" />
        </label>
        <label className="block mb-4">Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 p-2 rounded bg-gray-700" />
        </label>
        <button type="submit" className="w-full py-2 bg-blue-600 rounded">Sign in</button>
      </form>
    </div>
  );
}
