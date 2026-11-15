'use client';

import { useState } from 'react';

export default function BillingButton({ active }: { active: boolean }) {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function checkout() {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/stripe/checkout', { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Ödeme oturumu oluşturulamadı.');
      window.location.assign(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Bir hata oluştu.'); setBusy(false);
    }
  }
  return <div><button className="button button-dark" onClick={checkout} disabled={busy || active}>{active ? 'Pro aktif' : busy ? 'Yönlendiriliyor…' : 'Pro’ya geç'}</button>{error && <small className="form-message">{error}</small>}</div>;
}
