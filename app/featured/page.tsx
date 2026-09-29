import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getApprovedTools } from '@/lib/supabase';
import FeaturedRequestForm from './FeaturedRequestForm';

export const metadata: Metadata = {
  title: 'Featured Placements',
  description:
    'Request a sponsored homepage placement for an already-approved NoUploadTools listing. Payment buys visibility only and never affects review, badges, or organic ranking.',
  alternates: { canonical: 'https://nouploadtools.com/featured' },
  openGraph: {
    title: 'Featured Placements — NoUploadTools',
    description:
      'Sponsored homepage visibility for tools that have already passed the NoUploadTools review process.',
    url: 'https://nouploadtools.com/featured',
  },
};

const INCLUDES = [
  'A clearly labelled Sponsored card on the NoUploadTools homepage',
  'Placement for an agreed, fixed period',
  'Manual review before the sponsored placement goes live',
  'Placement alongside no more than three sponsored tools at a time',
];

const NEVER_BUYS = [
  'Directory approval or faster editorial review',
  'Extra privacy badges or a stronger verification status',
  'Higher placement in directory search or category results',
  'A security certification, endorsement, or permanent listing',
];

const STEPS = [
  {
    title: 'Be listed first',
    text: 'Featured requests are only considered for tools that are already approved and live in the NoUploadTools directory.',
  },
  {
    title: 'Request a placement',
    text: 'Tell us which approved tool you represent, who you are, and when you would ideally like the placement to run.',
  },
  {
    title: 'We review the request',
    text: 'We recheck the live tool, confirm it is suitable for prominent homepage placement, and verify that the requester represents it.',
  },
  {
    title: 'Receive an offer',
    text: 'If accepted, we send the available dates, placement terms, and price. No payment is requested before acceptance.',
  },
  {
    title: 'Go live as Sponsored',
    text: 'The placement is scheduled for the agreed period and is clearly labelled Sponsored. Organic directory ranking remains unchanged.',
  },
];

const FAQ = [
  {
    q: 'Can I pay to get my tool approved?',
    a: 'No. Directory submission and editorial review are free. Sponsorship is considered only after a tool has already been approved.',
  },
  {
    q: 'Does a sponsored tool rank higher in the directory?',
    a: 'No. Sponsored placement is limited to designated homepage space. It does not change organic search results, category ordering, badges, or review status.',
  },
  {
    q: 'How much does a featured placement cost?',
    a: 'Pricing and availability are provided after review. We are not publishing a fixed rate during the initial pilot.',
  },
  {
    q: 'How many sponsored tools appear at once?',
    a: 'No more than three at a time. We want sponsored placement to remain limited and clearly separate from the organic directory.',
  },
  {
    q: 'What happens if a sponsored tool changes after approval?',
    a: 'We may pause or remove the sponsored placement if the tool no longer meets our standards. The underlying directory listing is reviewed separately under the normal editorial process.',
  },
];

export default async function FeaturedPage() {
  const approvedTools = await getApprovedTools();

  return (
    <>
      <Nav />
      <Breadcrumbs items={[{ label: 'Featured Placements', href: '/featured' }]} />
      <main>
        <header style={{ maxWidth: 1100, margin: '0 auto', padding: '42px 24px 48px' }}>
          <div style={{ maxWidth: 760 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              Featured placements
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.08,
                fontWeight: 750,
                letterSpacing: '-0.04em',
                marginBottom: 16,
                maxWidth: 720,
              }}
            >
              Put an approved tool in front of more NoUploadTools visitors.
            </h1>
            <p
              style={{
                fontSize: 16,
                color: 'var(--text-2)',
                lineHeight: 1.75,
                maxWidth: 680,
                marginBottom: 24,
              }}
            >
              Listing is free. Review is free. Approval is never for sale. Featured placement is a
              separate, paid way for an already-approved tool to receive additional homepage
              visibility.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                marginBottom: 26,
              }}
            >
              {['Approved tools only', 'Maximum 3 sponsors', 'No paid ranking'].map((label) => (
                <span
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '5px 10px',
                    borderRadius: 100,
                    background: 'var(--green-bg)',
                    border: '1px solid var(--green-br)',
                    color: 'var(--green)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '.02em',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#request"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius)',
                  fontSize: 14,
                  fontWeight: 650,
                }}
              >
                Request a featured spot →
              </a>
              <Link
                href="/how-we-review"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-2)',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius)',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                How we review
              </Link>
            </div>
          </div>
        </header>

        <section
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-card)',
            padding: '48px 24px',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 18,
            }}
          >
            <div
              style={{
                border: '1px solid var(--green-br)',
                background: 'var(--green-bg)',
                borderRadius: 12,
                padding: 22,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--green)',
                  marginBottom: 14,
                }}
              >
                Featured placement includes
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {INCLUDES.map((item) => (
                  <li
                    key={item}
                    style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}
                  >
                    <span style={{ color: 'var(--green)', fontWeight: 800 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                borderRadius: 12,
                padding: 22,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                  marginBottom: 14,
                }}
              >
                It never buys
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {NEVER_BUYS.map((item) => (
                  <li
                    key={item}
                    style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}
                  >
                    <span style={{ color: 'var(--text-3)', fontWeight: 800 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 24px' }}>
          <div style={{ maxWidth: 760, marginBottom: 28 }}>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: 8,
              }}
            >
              How it works
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>
              Sponsorship starts only after the normal directory review is complete. The two
              decisions stay separate.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
            }}
          >
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: 18,
                  background: 'var(--bg-card)',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: 'var(--accent-bg)',
                    border: '1px solid var(--accent-br)',
                    color: 'var(--accent)',
                    fontSize: 11,
                    fontWeight: 800,
                    marginBottom: 12,
                  }}
                >
                  {index + 1}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{step.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-card)',
            padding: '52px 24px',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ maxWidth: 720, marginBottom: 24 }}>
              <h2
                style={{
                  fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  marginBottom: 8,
                }}
              >
                What users would see
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>
                Sponsored tools are shown in a dedicated section and labelled plainly. They are not
                mixed into organic ranking as if they earned the position editorially.
              </p>
            </div>

            <div
              style={{
                maxWidth: 360,
                border: '1px solid var(--accent-br)',
                background: 'var(--accent-bg)',
                borderRadius: 12,
                padding: 18,
                boxShadow: '0 10px 30px rgba(26,27,38,0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      border: '1px solid var(--accent-br)',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 15,
                      fontWeight: 800,
                      color: 'var(--accent)',
                    }}
                  >
                    N
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>Example privacy tool</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>example.com</div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    padding: '3px 7px',
                    borderRadius: 4,
                    background: '#fff',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent-br)',
                    letterSpacing: '.06em',
                  }}
                >
                  SPONSORED
                </span>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55, marginBottom: 14 }}>
                A sample of how a paid homepage card could appear after the tool has passed review.
              </p>

              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {['NO UPLOAD', 'NO LOGIN'].map((badge) => (
                  <span
                    key={badge}
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: '#fff',
                      color: 'var(--text-2)',
                      border: '1px solid var(--border)',
                      letterSpacing: '.03em',
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="request" style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px' }}>
          <div className="featured-request-layout">
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                Request a placement
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  marginBottom: 10,
                }}
              >
                Tell us which approved tool you represent.
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 28 }}>
                We will review the request manually. If the placement is accepted, we will send
                availability, terms, and pricing before asking for payment.
              </p>

              <FeaturedRequestForm
                tools={approvedTools.map((tool) => ({ name: tool.name, url: tool.url }))}
              />
            </div>

            <aside>
              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '20px',
                  background: 'var(--bg-card)',
                  marginBottom: 16,
                }}
              >
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Who can request</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {[
                    'The tool is already approved and listed',
                    'You own the tool or officially represent it',
                    'The live tool still meets our review standards',
                    'You are comfortable with the placement being labelled Sponsored',
                  ].map((item) => (
                    <li
                      key={item}
                      style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text-2)', lineHeight: 1.55 }}
                    >
                      <span style={{ color: 'var(--accent)' }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '20px',
                  background: 'var(--bg-card)',
                }}
              >
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Pricing</h3>
                <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 10 }}>
                  Pricing and availability are provided after review. No card details are collected
                  on this page, and no payment is taken before a placement is accepted.
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6 }}>
                  Placements are intentionally limited so the homepage remains a useful directory,
                  not an advertising wall.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-card)',
            padding: '52px 24px',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: 22,
              }}
            >
              Frequently asked questions
            </h2>
            <div style={{ maxWidth: 780, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FAQ.map((item) => (
                <div
                  key={item.q}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    padding: '18px 20px',
                    background: 'var(--bg)',
                  }}
                >
                  <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{item.q}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.65 }}>{item.a}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6, marginTop: 22 }}>
              Have a question before applying?{' '}
              <Link href="/contact" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                Contact NoUploadTools
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
