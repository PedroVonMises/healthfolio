import { describe, it, expect } from 'vitest';
import { projects } from '@/lib/projects';

// Import the default export of the sitemap module directly.
// Next.js MetadataRoute.Sitemap is just an array, so we can call it as a plain function.
import sitemapFn from '@/app/sitemap';

describe('sitemap', () => {
  const entries = sitemapFn();

  it('contains an entry for every project slug', () => {
    for (const project of projects) {
      const expectedPath = `/projetos/${project.id}`;
      const found = entries.some((e) => e.url.endsWith(expectedPath));
      expect(found, `Missing sitemap entry for ${expectedPath}`).toBe(true);
    }
  });

  it('contains no duplicate URLs', () => {
    const urls = entries.map((e) => e.url);
    const unique = new Set(urls);
    expect(unique.size).toBe(urls.length);
  });

  it('contains the static home route', () => {
    const found = entries.some((e) => {
      const url = new URL(e.url);
      return url.pathname === '/';
    });
    expect(found).toBe(true);
  });

  it('contains the static /privacidade route', () => {
    const found = entries.some((e) => e.url.endsWith('/privacidade'));
    expect(found).toBe(true);
  });

  it('project routes have weekly changeFrequency', () => {
    for (const project of projects) {
      const entry = entries.find((e) => e.url.endsWith(`/projetos/${project.id}`));
      expect(entry).toBeDefined();
      expect(entry!.changeFrequency).toBe('weekly');
    }
  });

  it('total entry count equals static routes + project count', () => {
    // 2 static routes (['', '/privacidade']) + one per project
    expect(entries).toHaveLength(2 + projects.length);
  });
});
