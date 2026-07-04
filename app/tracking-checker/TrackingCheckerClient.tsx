'use client';

import { useState } from 'react';

interface CheckResult {
  url: string;
  score: number;
  totalTrackers: number;
  trackers: Record<string, string[]>;
  thirdPartyDomains: string[];
  summary: string;
  disclaimer: string;
  error?: string;
}

function ScoreMeter({ score }: { score: number }) {
  const color =
    score >= 75 ? 'var(--green)' : score >= 50 ? 'var(--warning, #f59e0b)' : 'var(--red)';
  const label = score >= 75 ? 'Good' : score >= 50 ? 'Moderate' : 'Poor';
  return (
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <div style={{ fontSize: 48, fontWeight: 700, color, lineHeight: 1 }}>{score}</div>
      <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
        Privacy score · {label}
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: 'var(--border)',
          marginTop: 10,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${score}%`,
            background: color,
            borderRadius: 3,
            transition: 'width .4s',
          }}
        />
      </div>
    </div>
  );
}

export default function TrackingCheckerClient() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [inputError, setInputError] = useState('');

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    const val = url.trim();
    if (!val) {
      setInputError('Please enter a URL.');
      return;
    }
    if (!/^https?:\/\//i.test(val)) {
      setInputError('URL must start with http:// or https://');
      return;
    }
    setInputError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/check-tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: val }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        url: val,
        score: 0,
        totalTrackers: 0,
        trackers: {},
        thirdPartyDomains: [],
        summary: '',
        disclaimer: '',
        error: 'Request failed. Please try again.',
      });
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <form
        onSubmit={handleCheck}
        style={{ display: 'flex', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}
      >
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          style={{
            flex: 1,
            minWidth: 240,
            padding: '10px 14px',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            border: `1px solid ${inputError ? 'var(--red)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            background: 'var(--bg-card)',
            color: 'var(--text)',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 22px',
            background: 'var(--accent)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            border: 'none',
            borderRadius: 'var(--radius)',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {loading ? 'Checking…' : 'Check →'}
        </button>
      </form>
      {inputError && (
        <p style={{ fontSize: 12, color: 'var(--red)', marginBottom: 16 }}>{inputError}</p>
      )}

      {result && (
        <div
          style={{
            marginTop: 28,
            border: '1px solid var(--border)',
            borderRadius: 12,
            background: 'var(--bg-card)',
            padding: 24,
          }}
        >
          {result.error ? (
            <p style={{ fontSize: 14, color: 'var(--red)' }}>{result.error}</p>
          ) : (
            <>
              <ScoreMeter score={result.score} />

              <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 20 }}>{result.summary}</p>

              {Object.keys(result.trackers).length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h3
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      marginBottom: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '.06em',
                      color: 'var(--text-3)',
                    }}
                  >
                    Trackers found
                  </h3>
                  {Object.entries(result.trackers).map(([cat, hits]) => (
                    <div key={cat} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{cat}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {hits.map((h) => (
                          <span
                            key={h}
                            style={{
                              fontSize: 11,
                              padding: '3px 8px',
                              background: 'var(--red-bg)',
                              color: 'var(--red)',
                              border: '1px solid var(--red-br)',
                              borderRadius: 4,
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {result.thirdPartyDomains.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <h3
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      marginBottom: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '.06em',
                      color: 'var(--text-3)',
                    }}
                  >
                    Third-party domains ({result.thirdPartyDomains.length})
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {result.thirdPartyDomains.map((d) => (
                      <span
                        key={d}
                        style={{
                          fontSize: 11,
                          padding: '3px 8px',
                          background: 'var(--bg)',
                          color: 'var(--text-2)',
                          border: '1px solid var(--border)',
                          borderRadius: 4,
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p
                style={{
                  fontSize: 11,
                  color: 'var(--text-3)',
                  borderTop: '1px solid var(--border)',
                  paddingTop: 12,
                  marginTop: 8,
                }}
              >
                ⚠️ {result.disclaimer}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
