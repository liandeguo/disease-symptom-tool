import type { RequestHandler } from '@sveltejs/kit';
import dataset from '$lib/data/dataset.json';

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

export const GET: RequestHandler = async () => {
  const baseUrl = 'https://your-url.vercel.app'; // replace with your actual URL

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
  ];

  const diseasePages = dataset.map((disease) => ({
    url: `/diseases/${toSlug(disease.name)}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  const allPages = [...staticPages, ...diseasePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
};