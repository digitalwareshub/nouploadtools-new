import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubmitForm from './SubmitForm';

export const metadata: Metadata = {
  title: 'Submit a Tool',
  description: 'Submit an open-source, no-login, no-ads, privacy-first web tool for review.',
  alternates: { canonical: 'https://nouploadtools.com/submit' },
  openGraph: {
    title: 'Submit a Tool — NoUploadTools',
    description: 'Submit an open-source, no-login, no-ads, privacy-first web tool for review.',
    url: 'https://nouploadtools.com/submit',
  },
};

export default function SubmitPage() {
  return (
    <>
      <Nav />
      <Breadcrumbs items={[{ label: 'Submit a Tool', href: '/submit' }]} />
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
          Submit a tool
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 1.9rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 10,
          }}
        >
          List Your Tool, Free
        </h1>
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-2)',
            marginBottom: 36,
            lineHeight: 1.65,
            maxWidth: 600,
          }}
        >
          Every tool is manually reviewed before going live. Open source and fully client-side tools
          get priority. Approval usually takes 1–3 days.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: 48,
            alignItems: 'start',
          }}
        >
          <SubmitForm />

          <aside>
            <div
              style={{
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '18px 20px',
                background: 'var(--bg-card)',
              }}
            >
              <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                What gets approved quickly
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  'Tools with a public GitHub repo get reviewed first',
                  'Client-side / WebAssembly tools that truly never upload',
                  'Clear, specific use case — not generic AI chatbots',
                  'Taglines that say what the tool does, not that it\'s "amazing"',
                  'Tools that actually work — we test every submission',
                ].map((tip) => (
                  <li
                    key={tip}
                    style={{
                      fontSize: 12,
                      color: 'var(--text-2)',
                      display: 'flex',
                      gap: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: 'var(--text-3)', flexShrink: 0 }}>→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '18px 20px',
                background: 'var(--bg-card)',
                marginTop: 16,
              }}
            >
              <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                <a href="/how-we-review" style={{ color: 'inherit' }}>
                  How we review ↗
                </a>
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  'We check whether the tool works without login',
                  'We check for obvious third-party tracking/ad scripts',
                  'We prefer public source code',
                  'We check whether processing happens client-side where possible',
                  'We do not guarantee perfect security',
                  'Users should review source code for sensitive use cases',
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 12,
                      color: 'var(--text-2)',
                      display: 'flex',
                      gap: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: 'var(--text-3)', flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
