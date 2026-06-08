import type { Metadata } from 'next';
import { ClinicSite } from '@/templates/clinic/ClinicSite';
import { ClinicJsonLd } from '@/templates/clinic/ClinicJsonLd';
import { demoClinic } from '@/config/clinics/demo.config';

const PATH = '/demo/clinica';

function pageUrl(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://pedroaugusto.dev';
  return `${base}${PATH}`;
}

/** Per-config metadata — city + bairro in the title for local SEO. */
export function generateMetadata(): Metadata {
  const { seo } = demoClinic;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: pageUrl() },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: pageUrl(),
      type: 'website',
      locale: 'pt_BR',
    },
  };
}

export default function DemoClinicaPage() {
  return (
    <>
      <ClinicJsonLd config={demoClinic} url={pageUrl()} />
      <ClinicSite config={demoClinic} />
    </>
  );
}
