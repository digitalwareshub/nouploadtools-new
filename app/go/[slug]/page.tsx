import { notFound, redirect } from 'next/navigation';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

const ALLOWED_SOURCES = new Set(['homepage', 'directory', 'unknown']);

export const dynamic = 'force-dynamic';

export default async function GoPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const rawSource = sp.source ?? 'unknown';
  const source = ALLOWED_SOURCES.has(rawSource) ? rawSource : 'unknown';

  // Look up approved tool by slug
  const toolRes = await fetch(
    `${SUPABASE_URL}/rest/v1/tools?slug=eq.${encodeURIComponent(slug)}&status=eq.approved&select=id,url&limit=1`,
    {
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
      },
      cache: 'no-store',
    },
  );

  if (!toolRes.ok) notFound();

  const tools: { id: string; url: string }[] = await toolRes.json();
  const tool = tools[0];

  if (!tool) notFound();

  // Validate destination URL
  let dest: URL;
  try {
    dest = new URL(tool.url);
  } catch {
    notFound();
  }
  if (!['http:', 'https:'].includes(dest!.protocol)) notFound();

  // Record click — fire and forget, never block redirect
  fetch(`${SUPABASE_URL}/rest/v1/tool_clicks`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ tool_id: tool.id, source }),
  }).catch(() => {
    console.warn('[go] click insert failed for slug:', slug);
  });

  redirect(tool.url);
}
