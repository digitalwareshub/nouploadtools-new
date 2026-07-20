import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog';
import { seoLandings } from '@/lib/seo-landings';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nouploadtools.com';
  return [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/directory`, changeFrequency: 'daily', priority: 0.9 },
    ...seoLandings.map((landing) => ({
      url: `${base}/${landing.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    { url: `${base}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ...blogPosts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: new Date(p.dateModified),
    })),
    { url: `${base}/submit`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/tracking-checker`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/how-we-review`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
