'use client';

import React, { useMemo } from 'react';
import { MapPin, Phone, Clock, Star, Stethoscope } from 'lucide-react';
import FadeIn, { StaggerContainer } from '@/components/ui/FadeIn';
import LocalPresenceMap from '@/components/ui/LocalPresenceMap';
import { Button } from '@/components/ui/Button';
import { BookingFunnel } from './booking/BookingFunnel';
import { themeToCssVars } from './theme';
import {
  selectProvider,
  createWhatsappLeadProvider,
} from './booking/providers';
import type { BookingContext } from '@/app/actions/booking';
import type { BookingProvider, ClinicConfig } from './types';

interface ClinicSiteProps {
  config: ClinicConfig;
}

export function ClinicSite({ config }: ClinicSiteProps) {
  const { brand, contact, specialties, doctors, content, seo, compliance } = config;
  const cityLine = [seo.bairro, seo.city].filter(Boolean).join(', ');

  // Resolve the booking provider from config. For `whatsappLead` we bind the
  // server-action context (clinic NAP + the selected specialty/doctor labels).
  const provider: BookingProvider = useMemo(() => {
    if (config.booking.provider === 'whatsappLead') {
      return createWhatsappLeadProvider((): BookingContext => ({
        clinicName: brand.name,
        whatsapp: contact.whatsapp,
        // Best-effort labels; the funnel always sends ids, server re-validates.
        specialtyName: specialties[0]?.name ?? '',
        doctorName: doctors[0]?.name ?? '',
      }));
    }
    return selectProvider(config.booking.provider);
  }, [config.booking.provider, brand.name, contact.whatsapp, specialties, doctors]);

  return (
    <div style={themeToCssVars(brand.theme)} className="bg-bg text-text">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
              <Stethoscope className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {brand.name}
            </p>
          </FadeIn>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <FadeIn delay={0.05}>
                {/* H1 carries city + bairro for local SEO */}
                <h1 className="font-display text-4xl font-bold leading-tight text-text sm:text-5xl">
                  {content.hero.headline}
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-2 text-sm font-medium text-primary">{cityLine}</p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-4 max-w-xl text-lg text-text-muted">{content.hero.sub}</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-3 text-base text-text-muted">{brand.tagline}</p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <a href="#agendar" className="mt-6 inline-block">
                  <Button type="button">{content.hero.ctaLabel}</Button>
                </a>
              </FadeIn>
            </div>

            {/* Booking funnel */}
            <div id="agendar" className="scroll-mt-24">
              <BookingFunnel config={config} provider={provider} />
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section aria-labelledby="especialidades-title" className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="especialidades-title" className="font-display text-2xl font-bold text-text sm:text-3xl">
            Especialidades
          </h2>
          <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specialties.map((s) => (
              <FadeIn key={s.id}>
                <article className="h-full rounded-xl border border-border bg-surface p-5">
                  <h3 className="font-display text-lg font-semibold text-text">{s.name}</h3>
                  {s.description && <p className="mt-2 text-sm text-text-muted">{s.description}</p>}
                </article>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Doctors */}
      <section aria-labelledby="medicos-title" className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 id="medicos-title" className="font-display text-2xl font-bold text-text sm:text-3xl">
            Corpo clínico
          </h2>
          <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((d) => {
              const spec = specialties.find((s) => s.id === d.specialtyId);
              return (
                <FadeIn key={d.id}>
                  <article className="h-full rounded-xl border border-border bg-surface p-5">
                    <h3 className="font-display text-lg font-semibold text-text">{d.name}</h3>
                    <p className="text-xs font-medium text-primary">{spec?.name}</p>
                    <p className="mt-1 text-xs text-text-faint">{d.crm}</p>
                    {d.bio && <p className="mt-2 text-sm text-text-muted">{d.bio}</p>}
                  </article>
                </FadeIn>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust / reviews */}
      {content.trust && (content.trust.reviews?.length || content.trust.metrics?.length) && (
        <section aria-labelledby="confianca-title" className="border-t border-border px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 id="confianca-title" className="font-display text-2xl font-bold text-text sm:text-3xl">
              Quem confia na {brand.name}
            </h2>
            {content.trust.metrics && content.trust.metrics.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {content.trust.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="font-display text-3xl font-bold text-primary">{m.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            )}
            {content.trust.reviews && content.trust.reviews.length > 0 && (
              <StaggerContainer className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {content.trust.reviews.map((r) => (
                  <FadeIn key={r.author}>
                    <figure className="h-full rounded-xl border border-border bg-surface p-5">
                      {r.rating && (
                        <div className="flex gap-0.5" aria-label={`Avaliação ${r.rating} de 5`}>
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
                          ))}
                        </div>
                      )}
                      <blockquote className="mt-2 text-sm text-text">{r.text}</blockquote>
                      <figcaption className="mt-2 text-xs font-medium text-text-muted">— {r.author}</figcaption>
                    </figure>
                  </FadeIn>
                ))}
              </StaggerContainer>
            )}
          </div>
        </section>
      )}

      {/* Location */}
      <section aria-labelledby="local-title" className="border-t border-border px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-2">
          <div>
            <h2 id="local-title" className="font-display text-2xl font-bold text-text sm:text-3xl">
              Onde estamos — {cityLine}
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{contact.hours}</span>
              </li>
            </ul>
          </div>
          <div className="min-h-[260px]">
            <LocalPresenceMap />
          </div>
        </div>
      </section>

      {/* LGPD footer */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center text-xs text-text-muted">
          <p>
            © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
          </p>
          <p>
            Seus dados são tratados conforme a LGPD.{' '}
            <a href={compliance.privacyPolicyHref} className="text-primary underline-offset-2 hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
