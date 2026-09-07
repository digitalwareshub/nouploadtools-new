import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

function normalizeWebsite(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: bots tend to fill hidden fields. Return success without storing anything.
  if (typeof body.company === 'string' && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const paidInterest = body.paid_interest === true;
  const websiteRaw = typeof body.website_url === 'string' ? body.website_url.trim() : '';
  const websiteUrl = websiteRaw ? normalizeWebsite(websiteRaw) : null;

  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (websiteRaw && !websiteUrl) {
    return NextResponse.json({ error: 'Please enter a valid website URL.' }, { status: 400 });
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('[devils-advocate-waitlist] Supabase environment variables are not configured');
    return NextResponse.json(
      { error: 'Waitlist signup is not connected yet. Please try again shortly.' },
      { status: 503 },
    );
  }

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/devils_advocate_waitlist?on_conflict=email`,
    {
      method: 'POST',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({
        email,
        website_url: websiteUrl,
        paid_interest: paidInterest,
        source: 'devils-advocate-landing',
        updated_at: new Date().toISOString(),
      }),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    console.error('[devils-advocate-waitlist] Supabase insert failed', {
      status: response.status,
      body: errorBody,
    });
    return NextResponse.json(
      { error: 'Could not join the waitlist right now. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
