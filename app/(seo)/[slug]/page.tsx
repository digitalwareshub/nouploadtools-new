import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getApprovedTools, type Tool } from '@/lib/supabase';
import { getSeoLandingBySlug, seoLandings } from '@/lib/seo-landings';

const SITE = 'https://nouploadtools.com';

function domain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

function toolMatchesLanding(tool: Tool, landing: NonNullable<ReturnType<typeof getSeoLandingBySlug>>) {
  if (landing.category) return tool.category === landing.category;
  if (landing.feature) return Boolean(tool[landing.feature]);
  return false;
}

function ToolSummaryCard({ tool }: { tool: Tool }) {
  const dm = domain(tool.url);
  return (
    <a
      href={`/go/${tool.slug}?source=directory`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 16,
        border: '1px solid var(--border)',
        borderRadius: 8,
        background: 'var(--bg-card)',
        color: 'inherit',
      }}
    >
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{tool.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{dm}</div>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55, margin: 0 }}>
        {tool.tagline}
      </p>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 'auto' }}>
        {tool.is_no_upload && <Badge>No upload</Badge>}
        {tool.is_open_source && <Badge>Open source</Badge>}
        {tool.is_zero_login && <Badge>No login</Badge>}
        {tool.is_works_offline && <Badge>Offline ok</Badge>}
      </div>
    </a>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        padding: '2px 7px',
        borderRadius: 4,
        background: 'var(--accent-bg)',
        color: 'var(--accent)',
        border: '1px solid var(--accent-br)',
        letterSpacing: '.03em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  );
}

export function generateStaticParams() {
  return seoLandings.map((landing) => ({ slug: landing.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const landing = getSeoLandingBySlug(slug);
  if (!landing) return {};

  return {
    title: landing.title,
    description: landing.description,
    alternates: { canonical: `${SITE}/${landing.slug}` },
    openGraph: {
      title: `${landing.title} - NoUploadTools`,
      description: landing.description,
      url: `${SITE}/${landing.slug}`,
    },
  };
}

export default async function SeoLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landing = getSeoLandingBySlug(slug);
  if (!landing) notFound();

  const tools = (await getApprovedTools()).filter((tool) => toolMatchesLanding(tool, landing));

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: landing.title,
    url: `${SITE}/${landing.slug}`,
    description: landing.description,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: tools.length,
      itemListElement: tools.slice(0, 20).map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        description: tool.tagline,
        url: tool.url,
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: landing.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <Breadcrumbs items={[{ label: landing.shortTitle, href: `/${landing.slug}` }]} />
      <main>
        <header style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 28px' }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: '.07em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Privacy-first guide
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.7rem, 3vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            {landing.title}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 680 }}>
            {landing.intro}
          </p>
        </header>

        <section style={{ borderTop: '1px solid var(--border)', padding: '36px 24px' }}>
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 28,
            }}
          >
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                When to use these tools
              </h2>
              <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {landing.searchIntent.map((item) => (
                  <li key={item} style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                How to verify privacy claims
              </h2>
              <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {landing.checks.map((item) => (
                  <li key={item} style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-card)', padding: '36px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
              Reviewed listings
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 20 }}>
              {tools.length} matching {tools.length === 1 ? 'tool' : 'tools'} from the NoUploadTools
              directory.
            </p>
            {tools.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 12,
                }}
              >
                {tools.map((tool) => (
                  <ToolSummaryCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--text-2)' }}>
                No matching tools are currently listed. Check the full directory for newer entries.
              </p>
            )}
            <Link
              href={landing.category ? `/directory?cat=${landing.category}` : '/directory'}
              style={{ display: 'inline-block', marginTop: 22, fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}
            >
              Browse the full directory
            </Link>
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', padding: '36px 24px 72px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto 0 0', paddingLeft: 'max(24px, calc((100vw - 1100px) / 2 + 24px))' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              Questions before you choose
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {landing.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{faq.question}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
