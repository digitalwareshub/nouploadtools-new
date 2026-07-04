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
