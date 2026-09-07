import { NextRequest, NextResponse } from 'next/server';
import { verifyTurnstileToken } from '@/lib/turnstile';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

const VALID_CATEGORIES = new Set([
  'documents',
  'images',
  'text-writing',
  'audio-video',
  'security-privacy',
  'learning',
  'calculators-data',
  'developer-tools',
]);

const FEATURE_KEYS = [
  'is_no_upload',
  'is_open_source',
  'is_zero_login',
  'is_no_ads',
  'is_works_offline',
  'is_mobile_friendly',
  'is_free_forever',
] as const;

function text(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validUrl(value: string): boolean {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Cheap bot trap before any external verification or database work.
  if (typeof body.company === 'string' && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, 80);
  const url = text(body.url, 300);
  const tagline = text(body.tagline, 120);
  const description = text(body.description, 300) || null;
  const category = text(body.category, 80);
  const submittedByEmail = text(body.submitted_by_email, 200).toLowerCase();
  const submittedByName = text(body.submitted_by_name, 80) || null;
  const githubUrl = text(body.github_url, 300) || null;

  const features = Object.fromEntries(
    FEATURE_KEYS.map((key) => [key, body[key] === true]),
  ) as Record<(typeof FEATURE_KEYS)[number], boolean>;

  if (!name || !validUrl(url) || !tagline || !VALID_CATEGORIES.has(category)) {
    return NextResponse.json({ error: 'Please check the required tool details.' }, { status: 400 });
  }

  if (!validEmail(submittedByEmail)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!FEATURE_KEYS.some((key) => features[key])) {
    return NextResponse.json({ error: 'Please select at least one privacy feature.' }, { status: 400 });
  }

  if (features.is_open_source && (!githubUrl || !validUrl(githubUrl))) {
    return NextResponse.json(
      { error: 'Please add a valid source repository URL for an open-source tool.' },
      { status: 400 },
    );
  }

  const turnstile = await verifyTurnstileToken(body.turnstile_token, request, 'submit-tool');
  if (!turnstile.success) {
    return NextResponse.json(
      {
        error: turnstile.temporaryFailure
          ? 'Security verification is temporarily unavailable. Please try again.'
          : 'Please complete the security check and try again.',
      },
      { status: turnstile.temporaryFailure ? 503 : 403 },
    );
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('[submit-tool] Supabase environment variables are not configured');
    return NextResponse.json(
      { error: 'Tool submission is temporarily unavailable. Please try again shortly.' },
      { status: 503 },
    );
  }

  const payload = {
    name,
    url,
    tagline,
    description,
    category,
    github_url: features.is_open_source ? githubUrl : null,
    submitted_by_email: submittedByEmail,
    submitted_by_name: submittedByName,
    ...features,
    slug: '',
    status: 'pending',
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/tools`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!response.ok) {
    const raw = await response.text().catch(() => '');
    let code = '';
    try {
      code = (JSON.parse(raw) as { code?: string }).code ?? '';
    } catch {
      // Keep generic error handling below.
    }

    if (response.status === 409 || code === '23505') {
      return NextResponse.json(
        { error: 'This URL is already in our directory or pending review.' },
        { status: 409 },
      );
    }

    console.error('[submit-tool] Supabase insert failed', {
      status: response.status,
      body: raw,
    });
    return NextResponse.json(
      { error: 'Could not submit this tool right now. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
