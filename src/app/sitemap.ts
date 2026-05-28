import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pedroaugusto.dev';
  
  // As rotas estáticas principais
  const routes = ['', '/privacidade'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.5,
  }));

  // Os slugs dos projetos
  const projects = ['portal-paciente', 'dashboard-gestao', 'agendamento-whatsapp'];
  
  const projectRoutes = projects.map((slug) => ({
    url: `${baseUrl}/projetos/${slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
