'use client';

import { useState, useMemo } from 'react';
import type { Tool } from '@/lib/supabase';

const CAT_LABELS: Record<string, string> = {
  documents: '📄 Documents',
  images: '🖼️ Images',
  'text-writing': '✍️ Text & Writing',
  'audio-video': '🎵 Audio & Video',
  'security-privacy': '🔐 Security',
  learning: '📚 Learning',
  'calculators-data': '🧮 Data',
  'developer-tools': '💻 Developer',
};

const FEATURES = [
  { key: 'is_open_source', label: 'Open source' },
  { key: 'is_zero_login', label: 'Zero login' },
  { key: 'is_works_offline', label: 'Works offline' },
  { key: 'is_free_forever', label: 'Free forever' },
  { key: 'is_no_ads', label: 'No ads' },
] as const;

type FeatureKey = (typeof FEATURES)[number]['key'];

function domain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

function ToolCard({ t }: { t: Tool }) {
  const dm = domain(t.url);
  const fav = t.favicon_url || `https://www.google.com/s2/favicons?domain=${dm}&sz=64`;

  return (
    <a
      href={t.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: 18,
        background: 'var(--bg-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fav}
          alt=""
          width={32}
          height={32}
          style={{
            borderRadius: 6,
            border: '1px solid var(--border)',
            objectFit: 'contain',
            flexShrink: 0,
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
            {t.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{dm}</div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, flex: 1, margin: 0 }}>
        {t.tagline}
      </p>

      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {t.is_no_upload && <Badge label="NO UPLOAD" cls="orange" />}
        {t.is_open_source && <Badge label="OPEN SOURCE" cls="green" />}
        {t.is_zero_login && <Badge label="NO LOGIN" cls="gray" />}
        {t.is_no_ads && <Badge label="NO ADS" cls="gray" />}
        {t.is_works_offline && <Badge label="OFFLINE OK" cls="gray" />}
        {t.is_free_forever && <Badge label="FREE FOREVER" cls="gray" />}
        {t.is_mobile_friendly && <Badge label="MOBILE OK" cls="gray" />}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
          borderTop: '1px solid var(--border)',
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            letterSpacing: '.06em',
          }}
        >
          {CAT_LABELS[t.category] || t.category}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            padding: '2px 7px',
            borderRadius: 4,
            background: 'var(--green-bg)',
            color: 'var(--green)',
            border: '1px solid var(--green-br)',
            letterSpacing: '.03em',
          }}
        >
          LISTED ↗
        </span>
      </div>
    </a>
  );
}

function Badge({ label, cls }: { label: string; cls: 'orange' | 'green' | 'gray' }) {
  const styles: Record<string, React.CSSProperties> = {
    orange: {
      background: 'var(--accent-bg)',
      color: 'var(--accent)',
      border: '1px solid var(--accent-br)',
    },
    green: {
      background: 'var(--green-bg)',
      color: 'var(--green)',
      border: '1px solid var(--green-br)',
    },
    gray: { background: 'var(--bg)', color: 'var(--text-2)', border: '1px solid var(--border)' },
  };
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 600,
        padding: '2px 7px',
        borderRadius: 4,
        letterSpacing: '.03em',
        whiteSpace: 'nowrap',
        ...styles[cls],
      }}
    >
      {label}
    </span>
  );
}

export default function DirectoryClient({ tools }: { tools: Tool[] }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFeatures, setActiveFeatures] = useState<Set<FeatureKey>>(new Set());

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      if (activeCategory !== 'all' && t.category !== activeCategory) return false;
      for (const f of activeFeatures) if (!t[f]) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          ![t.name, t.tagline, t.description || '', t.category].some((s) =>
            s.toLowerCase().includes(q),
          )
        )
          return false;
      }
      return true;
    });
  }, [tools, activeCategory, activeFeatures, search]);

  function toggleFeature(f: FeatureKey) {
    setActiveFeatures((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  }

  return (
    <div>
      {/* TOOLBAR */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ position: 'relative', maxWidth: 400 }}>
          <svg
            style={{
              position: 'absolute',
              left: 11,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-3)',
              pointerEvents: 'none',
            }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search — e.g. compress PDF, resize image…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 34px',
              fontSize: 13,
              fontFamily: 'Inter, sans-serif',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              background: 'var(--bg-card)',
              color: 'var(--text)',
              outline: 'none',
            }}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[['all', 'All tools'], ...Object.entries(CAT_LABELS)].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                padding: '5px 14px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 500,
                border: '1px solid var(--border)',
                background: activeCategory === key ? 'var(--accent)' : 'var(--bg-card)',
                color: activeCategory === key ? '#fff' : 'var(--text-2)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Feature filters */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Filter:</span>
          {FEATURES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleFeature(key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 12px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 500,
                border: '1px solid var(--border)',
                background: activeFeatures.has(key) ? 'var(--accent-bg)' : 'var(--bg-card)',
                borderColor: activeFeatures.has(key) ? 'var(--accent-br)' : 'var(--border)',
                color: 'var(--text-2)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 72px' }}>
        <p
          style={{
            fontSize: 12,
            color: 'var(--text-3)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 7,
            padding: '10px 14px',
            lineHeight: 1.6,
            marginBottom: 18,
          }}
        >
          Listings are reviewed before publication, but badges are based on submitted information
          and basic manual checks. Verification is best-effort, not a security certification.
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 14 }}>
          {filtered.length} tool{filtered.length !== 1 ? 's' : ''}
        </p>
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '72px 24px',
              color: 'var(--text-2)',
              fontSize: 14,
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12, opacity: 0.35 }}>🔍</div>
            <p>No tools match your filters.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 12,
            }}
          >
            {filtered.map((t) => (
              <ToolCard key={t.id} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
