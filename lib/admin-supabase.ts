const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

function headers() {
  return {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
}

export interface AdminTool {
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
  status: string;
  submitted_at: string;
  approved_at: string | null;
}

export async function adminGetAllTools(): Promise<AdminTool[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/tools?order=submitted_at.desc&limit=500`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!res.ok) {
    console.error('[admin] getAllTools failed', res.status, await res.text().catch(() => ''));
    return [];
  }
  return res.json();
}

export async function adminSetStatus(
  id: string,
  status: 'approved' | 'rejected' | 'pending',
): Promise<boolean> {
  const body: Record<string, unknown> = { status };
  if (status === 'approved') {
    body.approved_at = new Date().toISOString();
  } else {
    body.approved_at = null;
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/tools?id=eq.${id}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(body),
  });
  return res.ok;
}

export async function adminDeleteTool(id: string): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/tools?id=eq.${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  return res.ok;
}

export interface ClickStats {
  totalClicks: number;
  clicksToday: number;
  clicksLast7d: number;
  mostClickedName: string | null;
  topTools: {
    id: string;
    name: string;
    url: string;
    status: string;
    totalClicks: number;
    clicksLast7d: number;
    lastClickedAt: string | null;
  }[];
}

export async function adminGetClickStats(tools: AdminTool[]): Promise<ClickStats> {
  // Fetch all clicks (up to 10k) — aggregate server-side
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/tool_clicks?select=tool_id,clicked_at&order=clicked_at.desc&limit=10000`,
    { headers: headers(), cache: 'no-store' },
  );

  if (!res.ok) {
    console.error('[admin] getClickStats failed', res.status);
    return { totalClicks: 0, clicksToday: 0, clicksLast7d: 0, mostClickedName: null, topTools: [] };
  }

  const clicks: { tool_id: string; clicked_at: string }[] = await res.json();
  const now = Date.now();
  const DAY = 86400000;
  const WEEK = 7 * DAY;

  const totalClicks = clicks.length;
  const clicksToday = clicks.filter((c) => now - new Date(c.clicked_at).getTime() < DAY).length;
  const clicksLast7d = clicks.filter((c) => now - new Date(c.clicked_at).getTime() < WEEK).length;

  // Aggregate per tool_id
  const countMap = new Map<string, { total: number; last7d: number; lastAt: string | null }>();
  for (const c of clicks) {
    const existing = countMap.get(c.tool_id) ?? { total: 0, last7d: 0, lastAt: null };
    existing.total++;
    if (now - new Date(c.clicked_at).getTime() < WEEK) existing.last7d++;
    if (!existing.lastAt || c.clicked_at > existing.lastAt) existing.lastAt = c.clicked_at;
    countMap.set(c.tool_id, existing);
  }

  // Join with tool names
  const toolMap = new Map(tools.map((t) => [t.id, t]));
  const topTools = [...countMap.entries()]
    .map(([id, stats]) => {
      const t = toolMap.get(id);
      return {
        id,
        name: t?.name ?? 'Unknown',
        url: t?.url ?? '',
        status: t?.status ?? 'unknown',
        totalClicks: stats.total,
        clicksLast7d: stats.last7d,
        lastClickedAt: stats.lastAt,
      };
    })
    .sort((a, b) => b.totalClicks - a.totalClicks)
    .slice(0, 20);

  const mostClickedName = topTools[0]?.name ?? null;

  return { totalClicks, clicksToday, clicksLast7d, mostClickedName, topTools };
}
