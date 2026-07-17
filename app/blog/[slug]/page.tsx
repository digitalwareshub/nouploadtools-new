import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { blogPosts, type BlogPost } from '@/lib/blog';

const SITE = 'https://nouploadtools.com';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — NoUploadTools`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${SITE}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE}/blog/${post.slug}`,
      type: 'article',
      publishedTime: new Date(post.publishDate).toISOString(),
      modifiedTime: new Date(post.dateModified).toISOString(),
      authors: ['NoUploadTools'],
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${SITE}/blog/${post.slug}`,
    datePublished: new Date(post.publishDate).toISOString(),
    dateModified: new Date(post.dateModified).toISOString(),
    author: { '@type': 'Organization', name: 'NoUploadTools', url: SITE },
    publisher: { '@type': 'Organization', name: 'NoUploadTools', url: SITE },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${post.slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 80px' }}>
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
          }}
        >
          {post.description}
        </p>

        <article>{renderContent(post.content)}</article>

        <footer
          style={{
            marginTop: 48,
            paddingTop: 20,
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-3)' }}>
            Published by NoUploadTools — a curated directory of browser-based tools that avoid
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
