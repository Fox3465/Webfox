import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  return <div className="dashboard-shell"><header className="dashboard-nav"><Link className="brand" href="/">✳ webfox<span className="brand-dot">.</span></Link><nav><Link href="/dashboard">Özet</Link><Link href="/dashboard/courses/new">Kurs oluştur</Link><form action="/api/auth/logout" method="post"><button type="submit">Çıkış yap</button></form></nav></header><main className="dashboard-main">{children}</main></div>;
}
