import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrackingCheckerClient from './TrackingCheckerClient';

export const metadata: Metadata = {
  title: 'Website Tracking Checker',
  description:
    'Check a webpage for common analytics, ad, and tracking scripts. A basic scan of the page HTML — not a full browser-level security audit.',
  alternates: { canonical: 'https://nouploadtools.com/tracking-checker' },
  openGraph: {
    title: 'Website Tracking Checker — NoUploadTools',
    description: 'Check a webpage for common analytics, ad, and tracking scripts.',
    url: 'https://nouploadtools.com/tracking-checker',
  },
};

const trackingCheckerSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Website Tracking Checker',
  url: 'https://nouploadtools.com/tracking-checker',
  description:
    'Check a webpage for common analytics, ad, and tracking scripts. A basic scan of the page HTML.',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'NoUploadTools', url: 'https://nouploadtools.com' },
};

export default function TrackingCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trackingCheckerSchema) }}
      />
      <Nav />
      <Breadcrumbs items={[{ label: 'Tracking Checker', href: '/tracking-checker' }]} />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '.07em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Free tool
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 10,
          }}
        >
          Website Tracking Checker
        </h1>
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-2)',
            marginBottom: 32,
            lineHeight: 1.65,
            maxWidth: 600,
          }}
        >
          This checker performs a basic scan of the page HTML for common analytics, ad, and tracking
          scripts. It may not detect trackers loaded later by JavaScript, after user interaction, or
          through server-side tracking.{' '}
          <a
            href="https://github.com/digitalwareshub/nouploadtools-new"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)' }}
          >
            The checker is open source — review how it works on GitHub.
          </a>
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 32,
            maxWidth: 640,
          }}
          className="tracking-info-grid"
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '14px 16px',
              fontSize: 13,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
              What this checks
            </div>
            <ul
              style={{ margin: 0, padding: '0 0 0 16px', color: 'var(--text-2)', lineHeight: 1.7 }}
            >
              <li>Common analytics scripts</li>
              <li>Ad scripts</li>
              <li>Tracking pixels</li>
              <li>Third-party domains in HTML</li>
            </ul>
          </div>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '14px 16px',
              fontSize: 13,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
              What it cannot fully detect
            </div>
            <ul
              style={{ margin: 0, padding: '0 0 0 16px', color: 'var(--text-2)', lineHeight: 1.7 }}
            >
              <li>Trackers loaded by JavaScript</li>
              <li>Tracking after user interaction</li>
              <li>Server-side tracking</li>
              <li>Fingerprinting in bundled scripts</li>
            </ul>
          </div>
        </div>
        <TrackingCheckerClient />
      </main>
      <Footer />
    </>
  );
}
