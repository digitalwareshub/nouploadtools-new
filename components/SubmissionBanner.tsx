'use client';

import { useEffect, useState } from 'react';

const BANNER_KEY = 'submission_banner_dismissed';

export default function SubmissionBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem(BANNER_KEY)) setVisible(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    localStorage.setItem(BANNER_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        background: 'var(--accent-bg)',
        borderBottom: '1px solid var(--accent-br)',
        padding: '10px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <p style={{ fontSize: 13, color: 'var(--accent)', lineHeight: 1.5, margin: 0 }}>
          We have received a lot of submissions and are going through them one by one. Your tool
          will be listed once we have done our due diligence and it qualifies.
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--accent)',
            fontSize: 18,
            lineHeight: 1,
            flexShrink: 0,
            padding: '0 4px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
