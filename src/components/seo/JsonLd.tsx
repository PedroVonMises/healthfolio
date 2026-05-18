import React from 'react';

export function PersonJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pedroaugusto.dev';
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Pedro Augusto',
        jobTitle: 'Desenvolvedor Front-end',
        description: 'Especialista em interfaces para saúde digital',
        url: siteUrl,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Grande Vitória',
          addressRegion: 'ES',
          addressCountry: 'BR',
        },
        knowsAbout: ['React', 'Next.js', 'Saúde Digital', 'UX', 'TypeScript'],
        sameAs: [
          'https://linkedin.com/in/pedroaugusto',
          'https://github.com/pedroaugusto',
        ],
      })}}
    />
  );
}
