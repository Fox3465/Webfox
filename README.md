# Webfox

Webfox, öğrenciler ve eğitmenler için Türkçe bir edtech SaaS başlangıç projesidir. Landing page'e ek olarak Supabase tabanlı e-posta/şifre kimlik doğrulama, kullanıcıya özel kurs oluşturma alanı ve Stripe abonelik checkout/webhook akışı içerir.

## Teknoloji
- Next.js 15, React 19 ve TypeScript
- Supabase Auth + PostgreSQL (RLS)
- Stripe Checkout ve abonelik webhook'ları

## Kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local` içindeki Supabase ve Stripe değerlerini kendi projelerinizle doldurun. Supabase SQL Editor'da `supabase/schema.sql` dosyasını çalıştırın. Supabase Auth ayarlarında site URL'sini `http://localhost:3000`, redirect URL'sini `http://localhost:3000/auth/callback` olarak tanımlayın.

Stripe tarafında tekrarlayan bir fiyat oluşturun ve ID'sini `STRIPE_PRICE_ID` olarak ekleyin. Webhook endpoint'i `/api/stripe/webhook` için en az `checkout.session.completed`, `customer.subscription.updated` ve `customer.subscription.deleted` olaylarını etkinleştirip signing secret'ını `STRIPE_WEBHOOK_SECRET` olarak tanımlayın. Webhook'un `profiles` tablosunu güvenli biçimde güncellemesi için `SUPABASE_SERVICE_ROLE_KEY` gerekir; bu anahtarı yalnızca sunucu ortamında tutun.

## Uygulama yolları
- `/` — edtech tanıtım sayfası
- `/signup`, `/login` — kayıt ve giriş
- `/dashboard` — kullanıcı paneli ve abonelik durumu
- `/dashboard/courses/new` — kullanıcıya özel kurs oluşturma

Kurslar kullanıcı RLS politikalarıyla ayrıştırılır. Stripe anahtarları, Supabase anahtarları ve e-posta doğrulaması sağlayıcı panelinde yapılandırılmadan üretim ortamında ödeme/auth akışı çalışmaz. Bu başlangıç paketi gerçek kurs oynatımı, içerik yükleme veya eğitimci/öğrenci rolleri uygulamaz.
