import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.APP_URL || 'http://localhost:3000';
  const locales = ['en', 'tr'];
  const routes = ['', '/quran', '/hadith', '/articles', '/blog', '/library', '/sirah'];
  const now = new Date();
  return locales.flatMap((loc) =>
    routes.map((r) => ({ url: `${base}/${loc}${r}`, lastModified: now, changeFrequency: 'daily' as const }))
  );
}


