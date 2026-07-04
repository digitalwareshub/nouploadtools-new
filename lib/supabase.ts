const SUPABASE_URL = 'https://djbbwvlzgsbkqqntgpoa.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYmJ3dmx6Z3Nia3FxbnRncG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NTM1MzIsImV4cCI6MjA5ODIyOTUzMn0.ubhJGLV1jD5Y4kHnEbgXGhetvTWuAck-303BNmVjo4w';

export type ReviewStatus = 'pending' | 'claimed' | 'reviewed' | 'verified' | 'rejected';

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
}

export async function getApprovedTools(): Promise<Tool[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/tools?status=eq.approved&order=approved_at.desc`,
    {
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
      },
      next: { revalidate: 300 },
    },
  );
  if (!res.ok) return [];
  return res.json();
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
