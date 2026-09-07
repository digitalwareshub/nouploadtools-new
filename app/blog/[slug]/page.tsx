import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { blogPosts, type BlogPost } from '@/lib/blog-all';

const SITE = 'https://nouploadtools.com';
const SOCIAL_IMAGE = `${SITE}/og-image.png`;
const DELTA4_SLUG = 'before-you-build-that-saas-delta-4-ai-substitution-test';

const deltaFourFaqs = [
  {
    question: 'What is the Delta 4 framework?',
    answer:
      'Delta 4 is a product lens associated with Kunal Shah. Score the efficiency of the current behaviour and the proposed new behaviour from 1 to 10. A difference of four points or more is the key threshold in the framework.',
  },
  {
    question: 'Is the AI substitution test part of Delta 4?',
    answer:
      'No. The AI substitution test in this article is a separate NoUploadTools lens for comparing a proposed product with general-purpose AI assistants and other realistic substitutes.',
  },
  {
    question: 'Does a Delta of 4 guarantee that a startup will succeed?',
    answer:
      'No. It is a heuristic, not a guarantee. Distribution, market size, willingness to pay, execution, timing, retention, and many other factors still matter.',
  },
  {
    question: 'Should founders score their own products?',
    answer:
      'A founder can use an initial score as a hypothesis, but customer scores are more useful. Founders are naturally biased toward the product they want to build.',
  },
];

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE}/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.publishDate).toISOString(),
      modifiedTime: new Date(post.dateModified).toISOString(),
      authors: ['NoUploadTools'],
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: `${post.title} - NoUploadTools`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [SOCIAL_IMAGE],
    },
  };
}

function renderContent(content: BlogPost['content']) {
  return content.map((block, i) => {
    if (block.type === 'heading') {
      return (
        <h2
          key={i}
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginTop: 32,
            marginBottom: 8,
          }}
        >
          {block.text}
        </h2>
      );
    }
    if (block.type === 'paragraph') {
      return (
        <p key={i} style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 12 }}>
          {block.text}
        </p>
      );
    }
    if (block.type === 'list') {
      return (
        <ul
          key={i}
          style={{
            paddingLeft: 20,
            marginBottom: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {block.items.map((item, j) => (
            <li key={j} style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.65 }}>
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isDelta4Article = post.slug === DELTA4_SLUG;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: SOCIAL_IMAGE,
    url: `${SITE}/blog/${post.slug}`,
    datePublished: new Date(post.publishDate).toISOString(),
    dateModified: new Date(post.dateModified).toISOString(),
    author: { '@type': 'Organization', name: 'NoUploadTools', url: SITE },
    publisher: { '@type': 'Organization', name: 'NoUploadTools', url: SITE },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${post.slug}` },
  };

  const faqSchema = isDelta4Article
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: deltaFourFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <Nav />
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>
        <div
          style={{
            fontSize: 11,
            color: 'var(--text-3)',
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: '.06em',
          }}
        >
          {new Date(post.publishDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 10,
            lineHeight: 1.2,
            maxWidth: 820,
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            fontSize: 15,
            color: 'var(--text-2)',
            lineHeight: 1.65,
            marginBottom: 36,
            borderBottom: '1px solid var(--border)',
            paddingBottom: 24,
            maxWidth: 820,
          }}
        >
          {post.description}
        </p>

        <article style={{ maxWidth: 780 }}>{renderContent(post.content)}</article>

        {isDelta4Article ? (
          <>
            <section
              style={{
                maxWidth: 780,
                marginTop: 40,
                padding: '22px 24px',
                border: '1px solid var(--accent-br)',
                borderRadius: 10,
                background: 'var(--accent-bg)',
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Want someone to argue against your startup?
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 12 }}>
                Devil&apos;s Advocate is a NoUploadTools experiment built around this same discipline:
                challenge the idea, the website, the substitutes, and the reasons a customer may
                never switch before you keep investing in the build.
              </p>
              <Link href="/devils-advocate" style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>
                See Devil&apos;s Advocate →
              </Link>
            </section>

            <section style={{ maxWidth: 780, marginTop: 42 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Frequently asked questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {deltaFourFaqs.map((faq) => (
                  <details
                    key={faq.question}
                    style={{
                      padding: '12px 14px',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      background: 'var(--bg-card)',
                    }}
                  >
                    <summary style={{ cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
                      {faq.question}
                    </summary>
                    <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginTop: 9 }}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <section style={{ maxWidth: 780, marginTop: 42 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Sources and further reading</h2>
              <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li style={{ fontSize: 13, lineHeight: 1.6 }}>
                  <a
                    href="https://www.lennysnewsletter.com/p/kunal-shah-on-winning-in-india-second"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)' }}
                  >
                    Lenny&apos;s Podcast: Kunal Shah on winning in India, second-order thinking, and the Delta 4 framework
                  </a>
                </li>
                <li style={{ fontSize: 13, lineHeight: 1.6 }}>
                  <a
                    href="https://medium.com/accel-india-insights/insights-25-kunal-shah-cred-shares-anecdotes-from-his-entrepreneurial-journey-b35b634b6209"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)' }}
                  >
                    Accel India Insights: Kunal Shah shares anecdotes from his entrepreneurial journey
                  </a>
                </li>
              </ul>
            </section>
          </>
        ) : null}

        <footer
          style={{
            maxWidth: 780,
            marginTop: 48,
            paddingTop: 20,
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
            Published by NoUploadTools - a curated directory of browser-based tools that avoid
            unnecessary file uploads.
          </p>
          <Link href="/blog" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>
            ← Back to blog
          </Link>
        </footer>
      </main>
      <Footer />
    </>
  );
}
