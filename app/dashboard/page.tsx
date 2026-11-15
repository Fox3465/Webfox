import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import BillingButton from './billing-button';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('subscription_status').eq('id', user!.id).maybeSingle();
  const { data: courses } = await supabase.from('courses').select('id,title,description,created_at').eq('user_id', user!.id).order('created_at', { ascending: false });
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'öğrenci';
  return <><div className="dashboard-heading"><div><span className="eyebrow">ÖĞRENME ALANIN</span><h1>Merhaba, {name} 👋</h1><p>Bugün öğrenme yolculuğunda küçük bir adım at.</p></div><Link className="button button-dark" href="/dashboard/courses/new">+ Kurs oluştur</Link></div><div className="dashboard-stats"><article><span>OLUŞTURDUĞUN KURSLAR</span><b>{courses?.length ?? 0}</b><small>Öğrenme içeriklerin</small></article><article><span>ÜYELİK DURUMU</span><b className="status-text">{profile?.subscription_status === 'active' ? 'Pro' : 'Ücretsiz'}</b><small>{profile?.subscription_status === 'active' ? 'Aktif abonelik' : 'Dilediğinde planını yükselt'}</small></article><article><span>ÖĞRENME SERİSİ</span><b>✦ 0 gün</b><small>İlk dersini tamamla</small></article></div><section className="dashboard-panel"><div className="panel-heading"><div><h2>Kursların</h2><p>Kendi öğrenme içeriklerini buradan yönet.</p></div></div>{courses?.length ? <div className="managed-courses">{courses.map(course => <article key={course.id}><div className="managed-course-icon">✳</div><div><h3>{course.title}</h3><p>{course.description || 'Açıklama eklenmemiş.'}</p></div></article>)}</div> : <div className="empty-state"><span>✳</span><h3>İlk kursunu oluştur</h3><p>Öğrenme içeriklerini bir yerde düzenle ve takip et.</p><Link className="text-link" href="/dashboard/courses/new">Kurs oluştur <span>→</span></Link></div>}</section><section className="upgrade-card"><div><span className="eyebrow">WEBFOX PRO</span><h2>Ö��renme deneyimini büyüt.</h2><p>Ücretli planı etkinleştirmek için Stripe test fiyatını bağla.</p></div><BillingButton active={profile?.subscription_status === 'active'} /></section></>;
}
