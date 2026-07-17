'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const SECTIONS = [
  {
    title: 'Directory',
    links: [
      { label: 'All Tools', href: '/directory' },
      { label: 'Submit a Tool', href: '/submit' },
      { label: 'Tracking Checker', href: '/tracking-checker' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Documents', href: '/directory?cat=documents' },
      { label: 'Images', href: '/directory?cat=images' },
      { label: 'Security', href: '/directory?cat=security-privacy' },
      { label: 'Developer', href: '/directory?cat=developer-tools' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'How We Review', href: '/how-we-review' },
      {
        label: 'Source code',
        href: 'https://github.com/digitalwareshub/nouploadtools-new',
        external: true,
      },
      { label: 'Digiwares', href: 'https://digiwares.xyz', external: true },
    ],
  },
];

function FooterSection({
  title,
  links,
  open,
  onToggle,
}: (typeof SECTIONS)[number] & { open: boolean; onToggle: () => void }) {
  return (
    <div className="footer-section">
      <strong className="footer-heading-desktop">{title}</strong>

      <button className="footer-heading-mobile" onClick={onToggle} aria-expanded={open}>
        {title}
        <span className="footer-toggle-icon">{open ? '−' : '+'}</span>
      </button>

      <div className={`footer-links ${open ? 'footer-links-open' : ''}`}>
        {links.map((l) =>
          l.external ? (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: 'var(--text-2)' }}
            >
              {l.label}
            </a>
          ) : (
            <Link key={l.label} href={l.href} style={{ fontSize: 13, color: 'var(--text-2)' }}>
              {l.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    setVisible(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 200,
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        color: 'var(--text-2)',
        cursor: 'pointer',
        fontSize: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.25s ease',
      }}
    >
      ↑
    </button>
  );
}

export default function Footer() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-card)',
        padding: '32px 24px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em' }}>
              No<span style={{ color: 'var(--accent)' }}>Upload</span>Tools
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>
              Privacy-first tools, reviewed before listing.
            </div>
          </div>

          {SECTIONS.map((s, i) => (
            <FooterSection key={s.title} {...s} open={openIndex === i} onToggle={() => toggle(i)} />
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 20,
            marginTop: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            fontSize: 12,
            color: 'var(--text-3)',
          }}
        >
          <span>
            © {new Date().getFullYear()} NoUploadTools · A{' '}
            <a href="https://digiwares.xyz" style={{ color: 'var(--text-2)' }}>
              Digiwares
            </a>{' '}
            product
          </span>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/blog" style={{ color: 'var(--text-3)' }}>Blog</Link>
            <Link href="/privacy" style={{ color: 'var(--text-3)' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'var(--text-3)' }}>Terms</Link>
          </div>
          <span>Made in Bangkok 🇹🇭</span>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  );
}
