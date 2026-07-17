const SITE = 'https://nouploadtools.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export async function submitToIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.warn('[IndexNow] INDEXNOW_KEY not set, skipping submission');
    return;
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'nouploadtools.com',
        key,
        keyLocation: `${SITE}/${key}.txt`,
        urlList: urls,
      }),
    });

    if (!res.ok && res.status !== 202) {
      console.error(`[IndexNow] Submission failed: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error('[IndexNow] Submission error:', err);
  }
}

export function sitemapUrls(): string[] {
  return [
    `${SITE}/`,
    `${SITE}/directory`,
    `${SITE}/blog`,
    `${SITE}/blog/how-to-verify-privacy-first-tools`,
    `${SITE}/blog/how-to-remove-metadata-from-documents`,
    `${SITE}/blog/client-side-vs-server-side-processing`,
    `${SITE}/blog/why-you-should-never-upload-sensitive-pdfs`,
    `${SITE}/blog/hidden-cost-of-free-online-tools`,
    `${SITE}/submit`,
    `${SITE}/tracking-checker`,
    `${SITE}/how-we-review`,
    `${SITE}/privacy`,
    `${SITE}/terms`,
  ];
}
