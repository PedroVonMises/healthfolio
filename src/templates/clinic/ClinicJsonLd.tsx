import React from 'react';
import type { ClinicConfig } from './types';

interface ClinicJsonLdProps {
  config: ClinicConfig;
  /** Canonical URL of the rendered clinic page. */
  url: string;
}

/**
 * `MedicalClinic` (a `MedicalBusiness`) structured data for local SEO.
 * Carries consistent NAP (name/address/phone) for Google Business Profile and
 * `areaServed` derived from the config's city/bairro.
 */
export function ClinicJsonLd({ config, url }: ClinicJsonLdProps) {
  const areaServed = [config.seo.city, config.seo.bairro].filter(Boolean) as string[];

  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: config.brand.name,
    description: config.seo.description,
    url,
    telephone: config.contact.phone,
    email: config.contact.email,
    medicalSpecialty: config.specialties.map((s) => s.name),
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.contact.address,
      addressLocality: config.seo.city,
      addressRegion: config.seo.state,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.contact.geo.lat,
      longitude: config.contact.geo.lng,
    },
    areaServed: areaServed.map((name) => ({ '@type': 'City', name })),
    openingHours: config.contact.hours,
    sameAs: [`https://wa.me/${config.contact.whatsapp}`],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
