'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    title: 'Guides',
    links: [
      { label: 'No-upload PDF tools', href: '/no-upload-pdf-tools' },
      { label: 'Image privacy tools', href: '/privacy-first-image-tools' },
      { label: 'Developer tools', href: '/client-side-developer-tools' },
      { label: 'Offline browser tools', href: '/offline-browser-tools' },
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
      <button className="footer-heading" onClick={onToggle} aria-expanded={open}>
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
              className="footer-link"
            >
              {l.label}
            </a>
          ) : (
            <Link key={l.label} href={l.href} className="footer-link">
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
      className="scroll-top"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
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
    <footer className="site-footer">
      <div className="footer-bg-word footer-bg-word-one">PDF</div>
      <div className="footer-bg-word footer-bg-word-two">JSON</div>
      <div className="footer-bg-word footer-bg-word-three">EXIF</div>
      <div className="footer-shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <Image
                src="/favicon-32x32.png"
                alt="NoUploadTools logo"
                width={24}
                height={24}
                className="footer-logo"
              />
              <span>
                No<span className="footer-logo-accent">Upload</span>Tools
              </span>
            </div>
            <p className="footer-tagline">
              Privacy-first tools, reviewed before listing.
            </p>
            <div className="footer-status">
              <span />
              No unnecessary uploads
            </div>
          </div>

          <div className="footer-accordion">
            {SECTIONS.map((s, i) => (
              <FooterSection
                key={s.title}
                {...s}
                open={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>

        <div className="footer-explore">
          <h2>Explore NoUploadTools</h2>
          <div>
            <Link href="/no-upload-pdf-tools">No-upload PDF tools</Link>
            <Link href="/privacy-first-image-tools">Image privacy tools</Link>
            <Link href="/tracking-checker">Tracking checker</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} NoUploadTools · A{' '}
            <a href="https://digiwares.xyz">
              Digiwares
            </a>{' '}
            product
          </span>
          <div>
            <Link href="/blog">Blog</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a
              href="https://github.com/digitalwareshub/nouploadtools-new"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </footer>
  );
}
