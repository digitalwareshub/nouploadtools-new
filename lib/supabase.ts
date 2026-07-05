const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export type ReviewStatus =
  'pending' | 'approved' | 'claimed' | 'reviewed' | 'verified' | 'rejected';

export interface Tool {
  id: string;
  name: string;
  url: string;
  slug: string;
  tagline: string;
  description: string | null;
  category: string;
  github_url: string | null;
  submitted_by_name: string | null;
  submitted_by_email: string | null;
  is_no_upload: boolean;
  is_open_source: boolean;
  is_zero_login: boolean;
  is_no_ads: boolean;
  is_works_offline: boolean;
  is_mobile_friendly: boolean;
  is_free_forever: boolean;
  favicon_url: string | null;
  status: ReviewStatus;
  submitted_at: string;
  approved_at: string | null;
  clickCount?: number;
}

export async function getApprovedTools(): Promise<Tool[]> {
  const [toolsRes, clickCounts] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/tools?status=eq.approved&order=approved_at.desc`, {
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
      },
      next: { revalidate: 300 },
    }),
    getToolClickCounts(),
  ]);

  if (!toolsRes.ok) {
    const body = await toolsRes.text().catch(() => '');
    console.error('[supabase] getApprovedTools failed', {
      status: toolsRes.status,
      statusText: toolsRes.statusText,
      body,
      hasUrl: Boolean(SUPABASE_URL),
      hasKey: Boolean(SUPABASE_ANON),
    });
    return [];
  }

  const tools: Tool[] = await toolsRes.json();
  return tools.map((t) => ({ ...t, clickCount: clickCounts.get(t.id) ?? 0 }));
}

// Returns a map of tool_id → click count. Uses service role — server-side only.
export async function getToolClickCounts(): Promise<Map<string, number>> {
  if (!SERVICE_ROLE_KEY) return new Map();
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/tool_clicks?select=tool_id&limit=10000`,
    {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      next: { revalidate: 300 },
    },
  );
  if (!res.ok) return new Map();
  const rows: { tool_id: string }[] = await res.json();
  const counts = new Map<string, number>();
  for (const { tool_id } of rows) {
    counts.set(tool_id, (counts.get(tool_id) ?? 0) + 1);
  }
  return counts;
}

export async function submitTool(payload: Record<string, unknown>): Promise<{ error?: string }> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/tools`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (err.code === '23505')
      return { error: 'This URL is already in our directory or pending review.' };
    return { error: err.message || `Error ${res.status}` };
  }
  return {};
}
