import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import WaitlistForm from './WaitlistForm';

export const metadata: Metadata = {
  title: "Devil's Advocate — Startup & Website Audit",
  description:
    "Join the waitlist for Devil's Advocate: a skeptical startup and website audit that challenges your idea, checks your positioning and discoverability, and gives a preliminary Delta 4 assessment.",
  alternates: { canonical: 'https://nouploadtools.com/devils-advocate' },
  openGraph: {
    title: "Devil's Advocate — Should You Keep Building This Startup?",
    description:
      'Enter your website. We will challenge the idea, inspect the site, and tell you what looks weak, missing, unclear, or difficult to scale.',
    url: 'https://nouploadtools.com/devils-advocate',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Devil's Advocate — Should You Keep Building This Startup?",
    description:
      'A deliberately skeptical startup and website audit. Free first scan, deeper investigation optional.',
  },
};

const freeChecks = [
  {
    icon: '🧠',
    title: 'Idea clarity + preliminary Delta 4',
    text: 'What are you actually selling, who is it for, what do they do today, and does the new behaviour look meaningfully better?',
  },
  {
    icon: '🎯',
    title: 'Homepage & conversion',
    text: 'Hero clarity, positioning, calls to action, trust, pricing visibility, missing sections, and stronger headline suggestions.',
  },
  {
    icon: '🔎',
    title: 'SEO & AI discoverability',
    text: 'Titles, descriptions, headings, canonicals, robots, sitemap, internal links, schema/JSON-LD, Open Graph, and obvious crawlability gaps.',
  },
  {
    icon: '😈',
    title: 'Reasons not to use it',
    text: 'The uncomfortable part: the strongest reasons a real visitor may ignore, distrust, replace, or never pay for your product.',
  },
];

const paidChecks = [
  'Direct and indirect competitors',
  'Existing customer behaviour and substitutes',
  'ChatGPT / Claude / AI commoditisation risk',
  'Switching friction and willingness-to-pay signals',
  'Distribution difficulty and pricing power',
  'Scalability, defensibility, and market risk',
  'A deeper Delta 4 assessment',
  'Keep building, pivot, or stop — with reasons',
];

const faq = [
  {
    q: 'Is this just another SEO audit?',
    a: 'No. SEO and technical discoverability are only part of the free scan. The main purpose is to challenge whether the product itself is compelling enough, whether the website communicates that clearly, and what could prevent people from switching or paying.',
  },
  {
    q: 'How will the website be read?',
    a: "The first path is designed around lightweight public-page fetching and Mozilla Readability, the open-source extraction technology behind Firefox Reader View. More capable crawling can be used as a fallback when a site needs it.",
  },
  {
    q: 'Will the free report tell me if my startup is bad?',
    a: 'It will give a deliberately skeptical preliminary verdict based on the public website. A serious business verdict needs more context and external research, which is why the deeper investigation will be separate.',
  },
  {
    q: 'Is this affiliated with Delta 4 or CRED?',
    a: 'No. Devil’s Advocate is an independent NoUploadTools product. The analysis will use the Delta 4 framework as one lens among several and will not claim endorsement or affiliation.',
  },
];

export default function DevilsAdvocatePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: "Devil's Advocate — Startup & Website Audit",
    url: 'https://nouploadtools.com/devils-advocate',
    description:
      'A coming-soon skeptical startup and website audit from NoUploadTools, with a free first scan and optional deeper business investigation.',
    isPartOf: { '@type': 'WebSite', name: 'NoUploadTools', url: 'https://nouploadtools.com' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <Breadcrumbs items={[{ label: "Devil's Advocate", href: '/devils-advocate' }]} />

      <main>
        <section
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '42px 24px 64px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(36px, 7vw, 84px)',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '5px 11px',
                marginBottom: 18,
                border: '1px solid var(--accent-br)',
                borderRadius: 100,
                background: 'var(--accent-bg)',
                color: 'var(--accent-dk)',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              😈 Coming soon · Free first scan
            </div>

            <h1
              style={{
                maxWidth: 720,
                marginBottom: 18,
                fontSize: 'clamp(2.2rem, 6vw, 4.6rem)',
                fontWeight: 800,
                lineHeight: 0.98,
                letterSpacing: '-0.055em',
              }}
            >
              Let the Devil&apos;s Advocate try to kill your startup.
            </h1>

            <p
              style={{
                maxWidth: 650,
                marginBottom: 18,
                fontSize: 'clamp(1rem, 2vw, 1.12rem)',
                color: 'var(--text-2)',
                lineHeight: 1.7,
              }}
            >
              Enter your website and get an intentionally skeptical audit of the business idea and
              the site selling it — including a preliminary Delta 4 assessment, positioning,
              homepage weaknesses, SEO/AI discoverability, schema, Open Graph, missing pages, and
              the strongest reasons someone may never use your product.
            </p>

            <p
              style={{
                maxWidth: 610,
                paddingLeft: 14,
                borderLeft: '3px solid var(--accent)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text)',
                lineHeight: 1.65,
              }}
            >
              Not “your CTA should be green.” We want to answer the harder question: is this worth
              building at all?
            </p>
          </div>

          <div>
            <div
              style={{
                marginBottom: 12,
                padding: '14px 16px',
                border: '1px solid var(--red-br)',
                borderRadius: 10,
                background: 'var(--red-bg)',
              }}
            >
              <div
                style={{
                  marginBottom: 5,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--red)',
                }}
              >
                Early access
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>
                Join with your email. Add your website too if you want us to understand what early
                users are building.
              </p>
            </div>
            <WaitlistForm />
          </div>
        </section>

        <section
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-card)',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '58px 24px' }}>
            <div style={{ maxWidth: 680, marginBottom: 30 }}>
              <p
                style={{
                  marginBottom: 8,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '.09em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                The free report
              </p>
              <h2
                style={{
                  marginBottom: 10,
                  fontSize: 'clamp(1.55rem, 3vw, 2.15rem)',
                  fontWeight: 750,
                  letterSpacing: '-0.035em',
                }}
              >
                We&apos;ll inspect more than pixels and keywords.
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>
                The free scan is designed to be useful enough on its own. It challenges what the
                visitor sees, what search engines and AI systems can understand, and whether the
                product&apos;s promised behaviour change looks compelling in the first place.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: 12,
              }}
            >
              {freeChecks.map((item) => (
                <article
                  key={item.title}
                  style={{
                    padding: 20,
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    background: 'var(--bg)',
                  }}
                >
                  <div style={{ marginBottom: 12, fontSize: 24 }}>{item.icon}</div>
                  <h3 style={{ marginBottom: 7, fontSize: 14, fontWeight: 750 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(28px, 6vw, 72px)',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  marginBottom: 8,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '.09em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                Example output
              </p>
              <h2
                style={{
                  marginBottom: 12,
                  fontSize: 'clamp(1.55rem, 3vw, 2.15rem)',
                  fontWeight: 750,
                  letterSpacing: '-0.035em',
                }}
              >
                A verdict you can disagree with.
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75 }}>
                The goal is not an artificial 87/100 score. The report should make a clear argument,
                show the evidence behind it, identify assumptions, and tell you what would change
                the verdict.
              </p>
            </div>

            <div
              style={{
                overflow: 'hidden',
                border: '1px solid var(--border)',
                borderRadius: 12,
                background: 'var(--bg-card)',
                boxShadow: '0 16px 48px rgba(26, 27, 38, 0.07)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--border)',
                  fontSize: 11,
                  color: 'var(--text-3)',
                }}
              >
                <span>DEVIL&apos;S ADVOCATE / PREVIEW</span>
                <span>yourstartup.com</span>
              </div>
              <div style={{ padding: 20 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    padding: '4px 8px',
                    marginBottom: 14,
                    border: '1px solid #fde68a',
                    borderRadius: 6,
                    background: '#fffbeb',
                    color: '#a16207',
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  🟡 PROVISIONAL: HARD TO JUSTIFY THE SWITCH
                </div>
                <h3 style={{ marginBottom: 7, fontSize: 16 }}>Preliminary Delta 4</h3>
                <div style={{ display: 'flex', gap: 10, marginBottom: 17, flexWrap: 'wrap' }}>
                  <div
                    style={{
                      flex: '1 1 120px',
                      padding: 12,
                      borderRadius: 8,
                      background: 'var(--bg)',
                    }}
                  >
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Old behaviour</div>
                    <strong style={{ fontSize: 22 }}>6/10</strong>
                  </div>
                  <div
                    style={{
                      flex: '1 1 120px',
                      padding: 12,
                      borderRadius: 8,
                      background: 'var(--accent-bg)',
                    }}
                  >
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>New behaviour</div>
                    <strong style={{ fontSize: 22 }}>8/10</strong>
                  </div>
                  <div
                    style={{
                      flex: '1 1 120px',
                      padding: 12,
                      borderRadius: 8,
                      background: 'var(--red-bg)',
                    }}
                  >
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Difference</div>
                    <strong style={{ fontSize: 22 }}>+2</strong>
                  </div>
                </div>
                <p style={{ marginBottom: 15, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>
                  Your site makes the product look somewhat easier, but not obviously better enough
                  to force a change in behaviour. The biggest missing proof is…
                </p>
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: '1px solid var(--border)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--red)',
                  }}
                >
                  😈 5 reasons I would not use this product →
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            background: '#17171c',
            color: '#fff',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: '64px 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(32px, 7vw, 88px)',
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  marginBottom: 8,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '.09em',
                  textTransform: 'uppercase',
                  color: '#fb923c',
                }}
              >
                Optional paid investigation
              </p>
              <h2
                style={{
                  marginBottom: 12,
                  fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
                  fontWeight: 750,
                  letterSpacing: '-0.04em',
                }}
              >
                The website is only the witness. The business is the defendant.
              </h2>
              <p style={{ maxWidth: 560, fontSize: 14, color: '#b9b9c2', lineHeight: 1.75 }}>
                The deeper report will go outside your site and investigate the market, substitutes,
                competitors, switching behaviour, AI risk, distribution, monetisation, and whether
                there is a stronger version of the idea hiding inside the current one.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: 9,
              }}
            >
              {paidChecks.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    gap: 9,
                    padding: '10px 12px',
                    border: '1px solid #303039',
                    borderRadius: 8,
                    background: '#202027',
                    fontSize: 12,
                    color: '#d5d5dd',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: '#fb923c' }}>→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ maxWidth: 720, marginBottom: 28 }}>
            <p
              style={{
                marginBottom: 8,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '.09em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              How it will work
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.55rem, 3vw, 2.15rem)',
                fontWeight: 750,
                letterSpacing: '-0.035em',
              }}
            >
              Paste a URL. We do the arguing.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: 14,
            }}
          >
            {[
              ['01', 'Enter your site', 'Give us the public URL you want challenged.'],
              [
                '02',
                'We read key pages',
                'Lightweight extraction first, with more capable crawling only when needed.',
              ],
              [
                '03',
                'We argue against it',
                'Idea, messaging, Delta 4, technical discovery, trust, and conversion are challenged.',
              ],
              [
                '04',
                'You get the case',
                'A free report with concrete fixes, objections, and a preliminary verdict.',
              ],
            ].map(([num, title, text]) => (
              <article
                key={num}
                style={{
                  padding: 18,
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  background: 'var(--bg-card)',
                }}
              >
                <div style={{ marginBottom: 18, fontSize: 11, fontWeight: 800, color: 'var(--accent)' }}>
                  {num}
                </div>
                <h3 style={{ marginBottom: 6, fontSize: 14, fontWeight: 750 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px' }}>
            <h2
              style={{
                marginBottom: 26,
                fontSize: 'clamp(1.45rem, 3vw, 1.9rem)',
                fontWeight: 750,
                letterSpacing: '-0.03em',
              }}
            >
              Questions before we launch
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {faq.map((item) => (
                <details
                  key={item.q}
                  style={{
                    padding: '15px 17px',
                    border: '1px solid var(--border)',
                    borderRadius: 9,
                    background: 'var(--bg)',
                  }}
                >
                  <summary style={{ cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
                    {item.q}
                  </summary>
                  <p
                    style={{
                      paddingTop: 11,
                      paddingRight: 18,
                      fontSize: 13,
                      color: 'var(--text-2)',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)' }}>
          <div
            style={{
              maxWidth: 760,
              margin: '0 auto',
              padding: '68px 24px 78px',
              textAlign: 'center',
            }}
          >
            <div style={{ marginBottom: 12, fontSize: 28 }}>😈</div>
            <h2
              style={{
                marginBottom: 10,
                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
              }}
            >
              Better to hear the objections before your customers disappear silently.
            </h2>
            <p style={{ margin: '0 auto 24px', maxWidth: 560, fontSize: 14, color: 'var(--text-2)' }}>
              Join the launch list. The first website audit will be free.
            </p>
            <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'left' }}>
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
