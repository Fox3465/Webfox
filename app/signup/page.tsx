'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setBusy(false);
    if (error) return setMessage(error.message);
    if (data.session) window.location.assign('/dashboard');
    else setMessage('Hesabın oluşturuldu. Giriş bağlantısı için e-postanı kontrol et.');
  }

  return <main className="auth-page"><Link className="brand" href="/">✳ webfox<span className="brand-dot">.</span></Link><section className="auth-card"><span className="eyebrow">İLK ADIMINI BUGÜN AT</span><h1>Ücretsiz hesap oluştur.</h1><p>Öğrenme hedeflerini belirle ve gelişimini takip et.</p><form onSubmit={submit}><label>Ad soyad<input autoComplete="name" required value={name} onChange={e => setName(e.target.value)} placeholder="Ada Yılmaz" /></label><label>E-posta<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@email.com" /></label><label>Şifre<input type="password" autoComplete="new-password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder="En az 8 karakter" /></label><button className="button button-dark" disabled={busy}>{busy ? 'Hesap oluşturuluyor…' : 'Ücretsiz hesap oluştur'}</button>{message && <p className="form-message" role="status">{message}</p>}</form><div className="auth-foot">Zaten hesabın var mı? <Link href="/login">Giriş yap</Link></div></section></main>;
}
