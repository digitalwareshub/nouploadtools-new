import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nouploadtools.com';
  return [
    { url: `${base}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/directory`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/submit`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/tracking-checker`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/how-we-review`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
