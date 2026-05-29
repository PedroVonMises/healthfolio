import { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';

const BUILD_DATE = '2026-05-29';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pedroaugusto.dev';

  // As rotas estáticas principais
  const routes = ['', '/privacidade'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.5,
  }));

  // Os slugs dos projetos derivados dinamicamente de lib/projects
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projetos/${project.id}`,
    lastModified: project.updatedAt ?? BUILD_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
