import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, TrendingUp, Clock, Users } from 'lucide-react';
import FadeIn, { StaggerContainer } from '@/components/ui/FadeIn';

const projectsDB = {
  "portal-paciente": {
    title: "Portal do Paciente Segregado",
    client: "Rede de Clínicas de Imagem",
    tags: ["HIPAA/LGPD", "Next.js", "Integração ERP"],
    challenge: "Agendamentos manuais via WhatsApp consumiam 80% do tempo da recepção, com taxa de no-show de 20% e riscos de conformidade no envio de resultados de exames.",
    approach: "Arquitetura com criptografia em repouso (AES-256) e autenticação biométrica via web. Implementação de fila SQS para sincronização bidirecional com o legado.",
    result: "Autonomia completa do paciente na remarcação de exames e acesso aos laudos. Adoção de 65% na base em 3 meses.",
    metrics: [
      { label: "Redução em chamadas", value: "35%", icon: ArrowLeft },
      { label: "Aumento em consultas efetivadas", value: "22%", icon: TrendingUp },
      { label: "Tempo médio de agendamento", value: "< 2 min", icon: Clock },
      { label: "Satisfação dos pacientes", value: "98%", icon: Users },
    ],
    technicalHighlights: [
      "Autenticação JWT com Refresh Tokens rotativos (Compliance LGPD)",
      "Criptografia de ponta a ponta na visualização de laudos",
      "Integração bidirecional com ERP via fila SQS (AWS)",
      "Renderização híbrida (SSG + SSR) para máxima velocidade",
    ]
  },
  "dashboard-gestao": {
    title: "Painel Gerencial para Sócios-Médicos",
    client: "Rede de Clínicas Capixaba",
    tags: ["React", "RBAC", "Data Viz"],
    challenge: "Falta de visibilidade financeira. Gestores usavam múltiplas planilhas e o fechamento demorava 15 dias, gerando perdas severas com glosas de convênios.",
    approach: "Dashboard com Role-Based Access Control (RBAC). Processamento de 100k+ linhas de CSV de convênios diretamente no navegador usando Web Workers.",
    result: "Clareza absoluta sobre rentabilidade por convênio e métricas de no-show. Fechamento reduzido para 3 dias.",
    metrics: [
      { label: "Tempo de fechamento mensal", value: "-12 dias", icon: Clock },
      { label: "Precisão do faturamento", value: "100%", icon: CheckCircle2 },
      { label: "Aumento na recuperação de glosas", value: "18%", icon: TrendingUp },
      { label: "Adoção pelos sócios", value: "100%", icon: Users },
    ],
    technicalHighlights: [
      "Processamento de grandes volumes de dados via Web Workers",
      "Cache agressivo com SWR para navegação instantânea",
      "Controle de acesso granular (RBAC) isolando visão de sócios e faturamento",
      "Gráficos interativos renderizados em Canvas (Performance)",
    ]
  },
  "agendamento-whatsapp": {
    title: "Autoatendimento Sincronizado",
    client: "Consultório Dr. Marcelo",
    tags: ["HL7/FHIR", "WhatsApp API", "Prisma"],
    challenge: "Recepção sobrecarregada, filas físicas e pacientes abandonando o consultório devido à espera prolongada apenas para confirmar chegada.",
    approach: "Totem integrado via API HL7 ao sistema central. Notificações ativas via WhatsApp API usando Máquina de Estados (XState) para triagem prévia.",
    result: "Fim das filas físicas. Totem e IA resolvem 85% do fluxo de recepção sem intervenção humana.",
    metrics: [
      { label: "Fila de espera na recepção", value: "-50%", icon: ArrowLeft },
      { label: "Redução do no-show", value: "25%", icon: TrendingUp },
      { label: "Agendamentos automáticos", value: "850/mês", icon: Clock },
      { label: "Economia com papel/totens legados", value: "R$ 2.5k", icon: CheckCircle2 },
    ],
    technicalHighlights: [
      "Interoperabilidade (padrões HL7/FHIR) para sincronismo de pacientes",
      "Máquina de estados finitos (XState) para fluxos de conversa",
      "Banco de dados Serverless com criptografia at rest",
      "Design responsivo otimizado para tablets e totens touchscreen",
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsDB[slug as keyof typeof projectsDB];

  if (!project) {
    return {
      title: "Projeto não encontrado",
    };
  }

  return {
    title: project.title,
    description: project.challenge,
    openGraph: {
      title: `${project.title} | Pedro Augusto`,
      description: project.challenge,
    }
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsDB[slug as keyof typeof projectsDB];

  if (!project) {
    notFound();
  }

  return (
    <article className="bg-bg py-24 sm:py-32 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link href="/#projetos" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Voltar para o portfólio
        </Link>
        
        <FadeIn>
          <header className="mb-16">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-text mb-6 text-balance">
              {project.title}
            </h1>
            <p className="text-xl text-text-muted mb-8">
              Cliente: <strong className="text-text">{project.client}</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
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
                {project.challenge}
              </p>
            </div>
          </FadeIn>
          
          <FadeIn>
            <div className="bg-surface-2 p-8 rounded-2xl h-full border border-border">
              <h3 className="text-xl font-semibold text-text mb-4 text-primary">A Abordagem</h3>
              <p className="text-text-muted leading-relaxed">
                {project.approach}
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-surface-2 p-8 rounded-2xl h-full border border-border">
              <h3 className="text-xl font-semibold text-text mb-4 text-green-500">Resultados Obtidos</h3>
              <p className="text-text-muted leading-relaxed mb-6">
                {project.result}
              </p>
              <ul className="space-y-4">
                {project.metrics.map((metric, idx) => (
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
                {project.technicalHighlights.map((highlight, i) => (
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
