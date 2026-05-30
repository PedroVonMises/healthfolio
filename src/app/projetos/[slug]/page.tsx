import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import FadeIn, { StaggerContainer } from '@/components/ui/FadeIn';
import { projects, getProjectBySlug } from '@/lib/projects';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projeto não encontrado",
    };
  }

  return {
    title: project.caseStudy.title,
    description: project.caseStudy.challenge,
    openGraph: {
      title: `${project.caseStudy.title} | Pedro Augusto`,
      description: project.caseStudy.challenge,
    }
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const cs = project.caseStudy;

  return (
    <article className="bg-bg py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link href="/#projetos" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Voltar para o portfólio
        </Link>

        <FadeIn>
          <header className="mb-16">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-text mb-6 text-balance">
              {cs.title}
            </h1>
            <p className="text-xl text-text-muted mb-8">
              Cliente: <strong className="text-text">{cs.client}</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {cs.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <FadeIn className="col-span-1 md:col-span-2">
            <div className="bg-surface-2 p-8 rounded-2xl border border-border border-l-4 border-l-red-500/50 relative overflow-hidden">
              <h3 className="text-xl font-semibold text-text mb-4">O Desafio</h3>
              <p className="text-text-muted leading-relaxed relative z-10">
                {cs.challenge}
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-surface-2 p-8 rounded-2xl h-full border border-border">
              <h3 className="text-xl font-semibold text-text mb-4 text-primary">A Abordagem</h3>
              <p className="text-text-muted leading-relaxed">
                {cs.approach}
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-surface-2 p-8 rounded-2xl h-full border border-border">
              <h3 className="text-xl font-semibold text-text mb-4 text-green-500">Resultados Obtidos</h3>
              <p className="text-text-muted leading-relaxed mb-6">
                {cs.result}
              </p>
              <ul className="space-y-4">
                {cs.metrics.map((metric, idx) => (
                  <li key={idx} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
                    <span className="text-text-muted text-sm">{metric.label}</span>
                    <span className="text-primary font-bold flex items-center gap-2">
                      {metric.value} <metric.icon className="w-4 h-4" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </StaggerContainer>

        <FadeIn>
          <section className="bg-surface border border-border rounded-3xl p-8 sm:p-12">
            <h2 className="text-2xl font-display font-bold text-text mb-8">Arquitetura e Decisões Técnicas</h2>
            <div className="prose prose-invert prose-p:text-text-muted prose-li:text-text-muted max-w-none">
              <p className="text-text-muted leading-relaxed mb-6">
                Para garantir a estabilidade e performance exigidas no setor de saúde, a solução foi desenhada focando em alta disponibilidade e segurança dos dados dos pacientes, seguindo as diretrizes da LGPD.
              </p>
              <ul className="space-y-4">
                {cs.technicalHighlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>
      </div>
    </article>
  );
}
