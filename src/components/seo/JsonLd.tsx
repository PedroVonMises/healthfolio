import React from 'react';

export function PersonJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pedroaugusto.dev';
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': ['Person', 'ProfessionalService'],
        name: 'Pedro Augusto',
        jobTitle: 'Desenvolvedor Front-end',
        description: 'Especialista em interfaces para saúde digital e soluções B2B para clínicas e hospitais.',
        url: siteUrl,
        image: `${siteUrl}/og-image.jpg`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vitória',
          addressRegion: 'ES',
          addressCountry: 'BR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '-20.3155',
          longitude: '-40.3128',
        },
        priceRange: '$$$',
        areaServed: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica'],
        knowsAbout: ['React', 'Next.js', 'Saúde Digital', 'LGPD', 'UX'],
        sameAs: [
          'https://linkedin.com/in/pedroaugusto',
          'https://github.com/pedroaugusto',
        ],
      })}}
    />
  );
}
