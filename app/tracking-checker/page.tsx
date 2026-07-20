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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can this checker detect every tracker on a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. It scans page HTML and common script references, but it may miss trackers loaded later by JavaScript, after interaction, inside bundled code, or through server-side tracking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does a clean result mean a website does not track visitors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A clean result is a useful signal, not a privacy certification. Check browser developer tools, privacy policies, cookies, network requests, and consent behavior for a fuller review.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kinds of tracking scripts does this tool look for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It looks for common analytics, advertising, tag manager, pixel, and third-party script patterns in the HTML returned by the target URL.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to check a website for common tracking scripts',
  description:
    'Use the NoUploadTools tracking checker for a first-pass scan, then verify results with browser developer tools.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Scan the page URL',
      text: 'Enter the full webpage URL and run the tracking checker.',
    },
    {
      '@type': 'HowToStep',
      name: 'Review detected scripts',
      text: 'Look at any detected analytics, advertising, tag manager, pixel, or third-party script signals.',
    },
    {
      '@type': 'HowToStep',
      name: 'Verify manually',
      text: 'Open browser developer tools and inspect Network, Application, and Cookies tabs for behavior that a static HTML scan can miss.',
    },
  ],
};

export default function TrackingCheckerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trackingCheckerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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

        <section style={{ borderTop: '1px solid var(--border)', marginTop: 48, paddingTop: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
            Use this as a first-pass privacy check
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 720 }}>
            A tracking scan is most useful when you are deciding whether a website deserves more
            trust. It can quickly reveal common analytics and advertising scripts, but it should be
            paired with browser-level checks before you rely on the result for sensitive work.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 12,
              marginTop: 22,
            }}
          >
            {[
              ['Analytics', 'Pageview, event, and behavior measurement scripts.'],
              ['Advertising', 'Ad networks, remarketing tags, and conversion pixels.'],
              ['Tag managers', 'Containers that can load more scripts after the page starts.'],
              ['Third parties', 'External script domains that may receive visitor signals.'],
            ].map(([title, body]) => (
              <div
                key={title}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '16px 18px',
                  background: 'var(--bg-card)',
                }}
              >
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', marginTop: 40, paddingTop: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
            How to verify the result manually
          </h2>
          <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 760 }}>
            {[
              'Open the same page in a fresh browser profile or private window.',
              'Open developer tools and watch the Network tab during the first load and after interaction.',
              'Check Application or Storage panels for cookies, local storage, and service workers.',
              'Look for tag manager containers that can load scripts not visible in the initial HTML.',
              'Read the privacy policy for server-side analytics, log retention, and data sharing claims.',
            ].map((step) => (
              <li key={step} style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', marginTop: 40, paddingTop: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
            Tracking checker FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 760 }}>
            {[
              [
                'Can this checker detect every tracker on a website?',
                'No. It scans page HTML and common script references, so it can miss trackers loaded later by JavaScript, after interaction, inside bundled code, or through server-side tracking.',
              ],
              [
                'Does a clean result mean a website does not track visitors?',
                'No. A clean result is a useful signal, not a privacy certification. Treat it as a starting point for deeper manual checks.',
              ],
              [
                'What should I do if a site has trackers?',
                'Decide whether those scripts match the trust level of the task. For sensitive uploads or private data, prefer tools with minimal third-party scripts and clear local-processing behavior.',
              ],
            ].map(([question, answer]) => (
              <div key={question}>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{question}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>{answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
