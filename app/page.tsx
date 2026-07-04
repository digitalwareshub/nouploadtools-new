import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getApprovedTools } from '@/lib/supabase';

export const metadata: Metadata = {
  title: "NoUploadTools — Privacy-First Web Tools That Don't Upload Your Files",
  description:
    'A curated directory of open-source, no-login, no-ads web tools that work locally in your browser whenever possible.',
  alternates: { canonical: 'https://nouploadtools.com/' },
  openGraph: {
    title: "NoUploadTools — Privacy-First Web Tools That Don't Upload Your Files",
    description:
      'A curated directory of open-source, no-login, no-ads web tools that work locally in your browser.',
    url: 'https://nouploadtools.com/',
  },
};

export default async function HomePage() {
  const tools = await getApprovedTools();
  const ossCount = tools.filter((t) => t.is_open_source).length;

  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "NoUploadTools — Privacy-First Web Tools That Don't Upload Your Files",
    url: 'https://nouploadtools.com/',
    description:
      'A curated directory of open-source, no-login, no-ads web tools that work locally in your browser whenever possible.',
    isPartOf: { '@type': 'WebSite', url: 'https://nouploadtools.com' },
    about: {
      '@type': 'Thing',
      name: 'Privacy-first browser-based tools',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <Nav />
      <main>
        {/* HERO */}
        <header style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 44px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--green-bg)',
              border: '1px solid var(--green-br)',
              color: 'var(--green)',
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 600,
              padding: '4px 12px',
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--green)',
                display: 'inline-block',
              }}
            />
            Your files never leave your device
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.7rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: 620,
              marginBottom: 14,
            }}
          >
            Privacy-First Web Tools That Don&apos;t Upload Your Files
          </h1>

          <p
            style={{
              fontSize: 15,
              color: 'var(--text-2)',
              maxWidth: 520,
              lineHeight: 1.65,
              marginBottom: 32,
            }}
          >
            A curated directory of browser-based tools — PDF editors, image compressors, AI writers,
            encryption tools — that process everything locally. No upload. No account. No data
            collected.
          </p>

          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', marginBottom: 32 }}>
            <div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {tools.length || '—'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>
                Verified tools
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {ossCount || '—'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Open source</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                8
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>Categories</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
              }}
            >
              Browse directory →
            </Link>
            <Link
              href="/submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                padding: '10px 22px',
                borderRadius: 'var(--radius)',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Submit a tool
            </Link>
          </div>
        </header>

        {/* TRUST PRINCIPLES */}
        <section
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-card)',
            padding: '52px 24px',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 36,
            }}
          >
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                Impossible by architecture
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                Every tool here processes your files in your browser or is transparent about any API
                calls it makes. Privacy isn&apos;t a promise — it&apos;s the technical default.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                Open source = verifiable
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                Tools marked Open Source link directly to their public repository. Anyone can
                inspect the code and confirm the no-upload claim is real, not just marketing.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                Curated, not scraped
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                Every tool is manually reviewed before approval. We check the privacy policy, test
                the tool, and verify the claims. If something changes we update or remove it.
              </p>
            </div>
          </div>
        </section>

        {/* WHY NO-UPLOAD */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 24px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: 12,
            }}
          >
            Why no-upload tools matter
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--text-2)',
              maxWidth: 680,
              lineHeight: 1.7,
              marginBottom: 24,
            }}
          >
            When you upload a file to a web tool, you lose control of it. It may be stored on a
            server, scanned for training data, or retained longer than the privacy policy admits.
            Browser-based tools eliminate this risk entirely — your data never leaves your machine.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 12,
            }}
          >
            {[
              {
                icon: '🔒',
                label: 'No login required',
                desc: 'Zero accounts. Zero profiles. No ad trackers.',
              },
              {
                icon: '📴',
                label: 'Works offline',
                desc: 'Many tools function without an internet connection after first load.',
              },
              {
                icon: '🆓',
                label: 'Free forever',
                desc: 'No freemium traps. No credit card required.',
              },
              {
                icon: '📖',
                label: 'Open source preferred',
                desc: 'Public code anyone can audit and verify.',
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: 18,
                  background: 'var(--bg-card)',
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA STRIP */}
        <section style={{ borderTop: '1px solid var(--border)' }}>
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: '40px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Built a no-upload tool?
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
                Submit it free. Open source and client-side tools get priority listing.
              </p>
            </div>
            <Link
              href="/submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--text)',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: 'var(--radius)',
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Submit your tool →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
