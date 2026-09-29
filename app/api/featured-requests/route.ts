import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

const ALLOWED_ROLES = new Set([
  'owner_founder',
  'employee_team_member',
  'agency_representative',
  'other',
]);

const ALLOWED_TIMING = new Set(['asap', 'next_month', 'exploring']);

function serviceHeaders(prefer = 'return=minimal') {
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: prefer,
  };
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function cleanString(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without storing them.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const toolId = cleanString(body.tool_id, 36);
  const applicantName = cleanString(body.applicant_name, 100);
  const applicantEmail = cleanString(body.applicant_email, 254).toLowerCase();
  const role = cleanString(body.role, 40);
  const preferredTiming = cleanString(body.preferred_timing, 40);
  const reason = cleanString(body.reason, 220);
  const message = cleanString(body.message, 500);
  const ownershipConfirmed = body.ownership_confirmed === true;

  if (!isUuid(toolId)) {
    return NextResponse.json({ error: 'Please select a valid approved tool.' }, { status: 400 });
  }

  if (!applicantName) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }

  if (!applicantEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantEmail)) {
    return NextResponse.json({ error: 'Please enter a valid work email.' }, { status: 400 });
  }

  if (!ALLOWED_ROLES.has(role)) {
    return NextResponse.json({ error: 'Please select your role.' }, { status: 400 });
  }

  if (!ALLOWED_TIMING.has(preferredTiming)) {
    return NextResponse.json({ error: 'Please select your preferred timing.' }, { status: 400 });
  }

  if (!reason) {
    return NextResponse.json(
      { error: 'Please tell us why NoUploadTools visitors would care about this tool.' },
      { status: 400 },
    );
  }

  if (!ownershipConfirmed) {
    return NextResponse.json(
      { error: 'Please confirm that you own or officially represent this tool.' },
      { status: 400 },
    );
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('[featured-requests] Supabase environment variables are not configured');
    return NextResponse.json(
      { error: 'Featured requests are temporarily unavailable. Please try again shortly.' },
      { status: 503 },
    );
  }

  // Never trust the dropdown alone: confirm this exact tool is still approved at submit time.
  const toolResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/tools?id=eq.${encodeURIComponent(toolId)}&status=eq.approved&select=id&limit=1`,
    {
      headers: serviceHeaders(),
      cache: 'no-store',
    },
  );

  if (!toolResponse.ok) {
    console.error(
      '[featured-requests] Approved-tool lookup failed',
      toolResponse.status,
      await toolResponse.text().catch(() => ''),
    );
    return NextResponse.json(
      { error: 'Could not verify the selected tool right now. Please try again.' },
      { status: 500 },
    );
  }

  const approvedTools = (await toolResponse.json()) as { id: string }[];
  if (approvedTools.length !== 1) {
    return NextResponse.json(
      { error: 'Featured placement is available only for approved directory listings.' },
      { status: 400 },
    );
  }

  // Avoid accidentally creating multiple active requests for the same tool from the same email.
  const existingResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/featured_requests?tool_id=eq.${encodeURIComponent(toolId)}&applicant_email=eq.${encodeURIComponent(applicantEmail)}&status=in.(submitted,reviewing,waitlisted,accepted)&select=id&limit=1`,
    {
      headers: serviceHeaders(),
      cache: 'no-store',
    },
  );

  if (existingResponse.ok) {
    const existing = (await existingResponse.json()) as { id: string }[];
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'You already have an active featured-placement request for this tool.' },
        { status: 409 },
      );
    }
  } else {
    console.error(
      '[featured-requests] Duplicate check failed',
      existingResponse.status,
      await existingResponse.text().catch(() => ''),
    );
  }

  const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/featured_requests`, {
    method: 'POST',
    headers: serviceHeaders(),
    body: JSON.stringify({
      tool_id: toolId,
      applicant_name: applicantName,
      applicant_email: applicantEmail,
      role,
      preferred_timing: preferredTiming,
      reason,
      message: message || null,
      ownership_confirmed: true,
      ownership_status: 'pending',
      status: 'submitted',
    }),
    cache: 'no-store',
  });

  if (!insertResponse.ok) {
    console.error(
      '[featured-requests] Supabase insert failed',
      insertResponse.status,
      await insertResponse.text().catch(() => ''),
    );
    return NextResponse.json(
      { error: 'Could not submit your request right now. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
