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
  provider: { '@type': 'Organization', name: 'Digiwares', url: 'https://digiwares.xyz' },
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
          through server-side tracking.
        </p>
        <TrackingCheckerClient />
      </main>
      <Footer />
    </>
  );
}
