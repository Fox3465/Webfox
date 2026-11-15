import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Oturum açmanız gerekiyor.' }, { status: 401 });
  let body: { title?: unknown; description?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 }); }
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  if (!title || title.length > 120 || description.length > 2000) return NextResponse.json({ error: 'Başlık zorunludur (en fazla 120 karakter); açıklama 2000 karakteri aşamaz.' }, { status: 400 });
  const { data, error } = await supabase.from('courses').insert({ user_id: user.id, title, description }).select('id').single();
  if (error) return NextResponse.json({ error: 'Kurs kaydedilemedi. Veritabanı kurulumunu kontrol edin.' }, { status: 500 });
  return NextResponse.json({ id: data.id }, { status: 201 });
}
