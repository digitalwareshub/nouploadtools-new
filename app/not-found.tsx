import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you were looking for does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '80px 24px 120px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: 'var(--border)',
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-2)',
            lineHeight: 1.65,
            maxWidth: 400,
            margin: '0 auto 36px',
          }}
        >
          The page you were looking for doesn&apos;t exist or may have been removed.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/directory"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--accent)',
              color: '#fff',
              padding: '10px 22px',
              borderRadius: 'var(--radius)',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Browse directory →
          </Link>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
              padding: '10px 18px',
              borderRadius: 'var(--radius)',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Go home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
