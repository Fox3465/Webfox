'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewCoursePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    const response = await fetch('/api/courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description }) });
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(data.error || 'Kurs kaydedilemedi.');
    window.location.assign('/dashboard');
  }
  return <section className="dashboard-panel form-panel"><Link className="text-link" href="/dashboard">← Dashboard’a dön</Link><span className="eyebrow">İÇERİK YÖNETİMİ</span><h1>Yeni kurs oluştur</h1><p>Kurs bilgilerini girerek öğrenme içeriğini alanına ekle.</p><form onSubmit={submit}><label>Kurs başlığı<input required maxLength={120} value={title} onChange={e => setTitle(e.target.value)} placeholder="Örn. Python ile ilk adımlar" /></label><label>Açıklama<textarea maxLength={2000} rows={5} value={description} onChange={e => setDescription(e.target.value)} placeholder="Kursun neler öğreteceğini kısaca anlat…" /></label><button className="button button-dark" disabled={busy}>{busy ? 'Kaydediliyor…' : 'Kursu kaydet'}</button>{message && <p className="form-message" role="alert">{message}</p>}</form></section>;
}
