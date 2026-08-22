'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-henna-dark text-cream-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-mehndi-950 border border-gold-400/30 rounded-3xl p-8 shadow-2xl space-y-6">

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gold-400 text-mehndi-950 font-bold flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-cream-50">{BRAND_INFO.name} Admin</h1>
          <p className="text-xs text-gold-300">Booking Management Portal</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="block text-cream-200 font-medium">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-mehndi-900 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-cream-200 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-mehndi-900 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold-400 hover:bg-gold-300 text-mehndi-950 font-bold uppercase tracking-wider text-xs shadow-lg transition-all disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In To Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-cream-300/50 text-center italic">
          Authorized personnel only.
        </p>

      </div>
    </main>
  );
}
