import type { Metadata } from 'next';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { adminGetAllTools, type AdminTool } from '@/lib/admin-supabase';
import {
  loginAction,
  logoutAction,
  approveAction,
  rejectAction,
  pendingAction,
  deleteAction,
} from './actions';

export const metadata: Metadata = {
  title: 'Admin — NoUploadTools',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const CAT_LABELS: Record<string, string> = {
  documents: 'Documents',
  images: 'Images',
  'text-writing': 'Text & Writing',
  'audio-video': 'Audio & Video',
  'security-privacy': 'Security',
  learning: 'Learning',
  'calculators-data': 'Data',
  'developer-tools': 'Developer',
};

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      style={{
        padding: '14px 18px',
        border: `1px solid ${accent ? 'var(--accent-br)' : 'var(--border)'}`,
        borderRadius: 8,
        background: accent ? 'var(--accent-bg)' : 'var(--bg-card)',
        minWidth: 110,
      }}
    >
      <div
        style={{ fontSize: 22, fontWeight: 700, color: accent ? 'var(--accent)' : 'var(--text)' }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Badge({ on, label }: { on: boolean; label: string }) {
  if (!on) return null;
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 700,
        padding: '1px 5px',
        borderRadius: 3,
        background: 'var(--accent-bg)',
        color: 'var(--accent)',
        border: '1px solid var(--accent-br)',
        letterSpacing: '.04em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

function ToolRow({ tool, now }: { tool: AdminTool; now: number }) {
  const statusColor: Record<string, string> = {
    pending: '#f97316',
    approved: '#16a34a',
    rejected: '#dc2626',
  };
  const ago = (dateStr: string) => {
    const diff = now - new Date(dateStr).getTime();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor(diff / 60000);
    if (d > 0) return `${d}d ago`;
    if (h > 0) return `${h}h ago`;
    return `${m}m ago`;
  };

  return (
    <details style={{ borderBottom: '1px solid var(--border)' }}>
      <summary
        style={{
          padding: '12px 16px',
          cursor: 'pointer',
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{tool.name}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: 3,
                background: `${statusColor[tool.status] ?? '#999'}22`,
                color: statusColor[tool.status] ?? '#999',
                border: `1px solid ${statusColor[tool.status] ?? '#999'}44`,
              }}
            >
              {tool.status.toUpperCase()}
            </span>
            <Badge on={tool.is_no_upload} label="NO UPLOAD" />
            <Badge on={tool.is_open_source} label="OPEN SOURCE" />
            <Badge on={tool.is_zero_login} label="NO LOGIN" />
            <Badge on={tool.is_no_ads} label="NO ADS" />
            <Badge on={tool.is_works_offline} label="OFFLINE" />
            <Badge on={tool.is_free_forever} label="FREE" />
            <Badge on={tool.is_mobile_friendly} label="MOBILE" />
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>
            {CAT_LABELS[tool.category] ?? tool.category} · {ago(tool.submitted_at)}
            {tool.submitted_by_email && ` · ${tool.submitted_by_email}`}
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
          {new Date(tool.submitted_at).toLocaleDateString()}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tool.status !== 'approved' && (
            <form action={approveAction} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={tool.id} />
              <button
                type="submit"
                style={{
                  padding: '4px 10px',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  background: '#16a34a',
                  color: '#fff',
                  fontFamily: 'inherit',
                }}
              >
                Approve
              </button>
            </form>
          )}
          {tool.status !== 'rejected' && (
            <form action={rejectAction} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={tool.id} />
              <button
                type="submit"
                style={{
                  padding: '4px 10px',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  background: '#dc2626',
                  color: '#fff',
                  fontFamily: 'inherit',
                }}
              >
                Reject
              </button>
            </form>
          )}
          {tool.status !== 'pending' && (
            <form action={pendingAction} style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={tool.id} />
              <button
                type="submit"
                style={{
                  padding: '4px 10px',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  background: '#6b7280',
                  color: '#fff',
                  fontFamily: 'inherit',
                }}
              >
                Pending
              </button>
            </form>
          )}
        </div>
      </summary>

      {/* Expanded detail */}
      <div style={{ padding: '0 16px 16px', background: 'var(--bg)', fontSize: 12 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div>
            <p style={{ color: 'var(--text-3)', marginBottom: 2 }}>Tagline</p>
            <p style={{ color: 'var(--text-2)' }}>{tool.tagline}</p>
          </div>
          {tool.description && (
            <div>
              <p style={{ color: 'var(--text-3)', marginBottom: 2 }}>Description</p>
              <p style={{ color: 'var(--text-2)' }}>{tool.description}</p>
            </div>
          )}
          <div>
            <p style={{ color: 'var(--text-3)', marginBottom: 2 }}>Submitter</p>
            <p style={{ color: 'var(--text-2)' }}>
              {tool.submitted_by_name || '—'} · {tool.submitted_by_email || '—'}
            </p>
          </div>
          {tool.github_url && (
            <div>
              <p style={{ color: 'var(--text-3)', marginBottom: 2 }}>GitHub / Source</p>
              <a
                href={tool.github_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)' }}
              >
                {tool.github_url}
              </a>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 4,
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
              background: 'var(--bg-card)',
            }}
          >
            Open tool ↗
          </a>
          <a
            href={`/tracking-checker?url=${encodeURIComponent(tool.url)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 4,
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
              background: 'var(--bg-card)',
            }}
          >
            Check trackers ↗
          </a>
          {tool.github_url && (
            <a
              href={tool.github_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 4,
                border: '1px solid var(--border)',
                color: 'var(--text-2)',
                background: 'var(--bg-card)',
              }}
            >
              GitHub ↗
            </a>
          )}
          <form action={deleteAction} style={{ display: 'inline' }} onSubmit={undefined}>
            <input type="hidden" name="id" value={tool.id} />
            <button
              type="submit"
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 4,
                border: '1px solid var(--red-br)',
                color: 'var(--red)',
                background: 'var(--red-bg)',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </details>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const authed = await isAdminAuthenticated();
  const params = await searchParams;
  const loginError = params.error === '1';

  if (!authed) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
          padding: 24,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 360,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: 32,
          }}
        >
          <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Admin login</h1>
          <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 24 }}>NoUploadTools</p>
          {loginError && (
            <p
              style={{
                fontSize: 12,
                color: 'var(--red)',
                marginBottom: 16,
                padding: '8px 12px',
                background: 'var(--red-bg)',
                borderRadius: 6,
                border: '1px solid var(--red-br)',
              }}
            >
              Incorrect password.
            </p>
          )}
          <form action={loginAction}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                padding: '9px 12px',
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                border: '1px solid var(--border)',
                borderRadius: 6,
                background: 'var(--bg)',
                color: 'var(--text)',
                marginBottom: 12,
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                background: 'var(--accent)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    );
  }

  const tools = await adminGetAllTools();
  const statusFilter = params.status ?? 'pending';
  const now = new Date().getTime();

  const pending = tools.filter((t) => t.status === 'pending');
  const approved = tools.filter((t) => t.status === 'approved');
  const rejected = tools.filter((t) => t.status === 'rejected');
  const last24h = tools.filter((t) => now - new Date(t.submitted_at).getTime() < 86400000);
  const last7d = tools.filter((t) => now - new Date(t.submitted_at).getTime() < 7 * 86400000);

  const filtered =
    statusFilter === 'all'
      ? tools
      : statusFilter === 'pending'
        ? pending
        : statusFilter === 'approved'
          ? approved
          : statusFilter === 'rejected'
            ? rejected
            : tools;

  const filterLinks = [
    { key: 'pending', label: `Pending (${pending.length})` },
    { key: 'approved', label: `Approved (${approved.length})` },
    { key: 'rejected', label: `Rejected (${rejected.length})` },
    { key: 'all', label: `All (${tools.length})` },
  ];

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', padding: '24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>Admin</h1>
            <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>
              NoUploadTools · Private
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              style={{
                fontSize: 12,
                padding: '6px 14px',
                borderRadius: 6,
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                color: 'var(--text-2)',
              }}
            >
              Sign out
            </button>
          </form>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          <StatCard label="Total" value={tools.length} />
          <StatCard label="Pending" value={pending.length} accent={pending.length > 0} />
          <StatCard label="Approved" value={approved.length} />
          <StatCard label="Rejected" value={rejected.length} />
          <StatCard label="Last 24h" value={last24h.length} />
          <StatCard label="Last 7 days" value={last7d.length} />
          <StatCard label="Open source" value={tools.filter((t) => t.is_open_source).length} />
          <StatCard label="No upload" value={tools.filter((t) => t.is_no_upload).length} />
          <StatCard label="No login" value={tools.filter((t) => t.is_zero_login).length} />
          <StatCard label="No ads" value={tools.filter((t) => t.is_no_ads).length} />
          <StatCard label="Works offline" value={tools.filter((t) => t.is_works_offline).length} />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {filterLinks.map(({ key, label }) => (
            <a
              key={key}
              href={`/admin?status=${key}`}
              style={{
                padding: '5px 14px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 500,
                border: '1px solid var(--border)',
                textDecoration: 'none',
                background: statusFilter === key ? 'var(--accent)' : 'var(--bg-card)',
                color: statusFilter === key ? '#fff' : 'var(--text-2)',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Tool list */}
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 10,
            overflow: 'hidden',
            background: 'var(--bg-card)',
          }}
        >
          {filtered.length === 0 ? (
            <p style={{ padding: 32, textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>
              No tools in this view.
            </p>
          ) : (
            filtered.map((t) => <ToolRow key={t.id} tool={t} now={now} />)
          )}
        </div>
      </div>
    </main>
  );
}
