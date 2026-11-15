'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setMessage(error.message);
    window.location.assign('/dashboard');
  }

  return <main className="auth-page"><Link className="brand" href="/">✳ webfox<span className="brand-dot">.</span></Link><section className="auth-card"><span className="eyebrow">ÖĞRENME YOLCULUĞUNA DEVAM ET</span><h1>Tekrar hoş geldin.</h1><p>Hesabına giriş yap ve kaldığın yerden devam et.</p><form onSubmit={submit}><label>E-posta<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@email.com" /></label><label>Şifre<input type="password" autoComplete="current-password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder="En az 8 karakter" /></label><button className="button button-dark" disabled={busy}>{busy ? 'Giriş yapılıyor…' : 'Giriş yap'}</button>{message && <p className="form-message" role="alert">{message}</p>}</form><div className="auth-foot">Hesabın yok mu? <Link href="/signup">Ücretsiz hesap oluştur</Link></div></section></main>;
}
