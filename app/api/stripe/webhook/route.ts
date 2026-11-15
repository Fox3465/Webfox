import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return NextResponse.json({ error: 'Webhook yapılandırılmamış.' }, { status: 400 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(await request.text(), signature, secret); }
  catch { return NextResponse.json({ error: 'Webhook imzası geçersiz.' }, { status: 400 }); }

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return NextResponse.json({ error: 'Webhook veritabanı erişimi yapılandırılmamış.' }, { status: 503 });
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, { auth: { persistSession: false } });
  let userId: string | undefined;
  let customerId: string | undefined;
  let status: string | undefined;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    userId = session.client_reference_id ?? undefined;
    customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
    if (userId) {
      const subscription = session.subscription ? await stripe.subscriptions.retrieve(typeof session.subscription === 'string' ? session.subscription : session.subscription.id) : null;
      status = subscription?.status ?? 'active';
    }
  } else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    userId = subscription.metadata.supabase_user_id;
    customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
    status = event.type === 'customer.subscription.deleted' ? 'canceled' : subscription.status;
  }

  if (userId && status) {
    const { error } = await supabase.from('profiles').upsert({ id: userId, stripe_customer_id: customerId ?? null, subscription_status: status, updated_at: new Date().toISOString() });
    if (error) return NextResponse.json({ error: 'Abonelik durumu kaydedilemedi.' }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
