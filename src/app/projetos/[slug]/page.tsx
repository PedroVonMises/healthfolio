import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, TrendingUp, Clock, Users } from 'lucide-react';
import FadeIn, { StaggerContainer } from '@/components/ui/FadeIn';

const projectsDB = {
  "portal-paciente": {
    title: "Portal do Paciente",
    client: "Clínica de Especialidades",
    tags: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"],
    overview: "Um ambiente seguro e integrado ao ERP da clínica, permitindo aos pacientes agendar, remarcar e visualizar resultados de exames com autonomia.",
    metrics: [
      { label: "Redução em chamadas", value: "35%", icon: ArrowLeft },
      { label: "Aumento em consultas efetivadas", value: "22%", icon: TrendingUp },
      { label: "Tempo médio de agendamento", value: "< 2 min", icon: Clock },
      { label: "Satisfação dos pacientes", value: "98%", icon: Users },
    ],
    technicalHighlights: [
      "Autenticação JWT com Refresh Tokens rotativos",
      "Integração bidirecional com ERP via fila SQS (AWS)",
      "Renderização híbrida (SSG + SSR) para máxima velocidade",
      "Webhooks para notificações em tempo real",
    ]
  },
  "dashboard-gestao": {
    title: "Painel Gerencial para Sócios-Médicos",
    client: "Rede de Clínicas Capixaba",
    tags: ["React", "Recharts", "Zustand", "API REST"],
    overview: "Dashboard interativo consolidando faturamento por convênio e métricas de no-show em tempo real. Substituiu múltiplas planilhas de Excel.",
    metrics: [
      { label: "Tempo de fechamento mensal", value: "-12 dias", icon: Clock },
      { label: "Precisão do faturamento", value: "100%", icon: CheckCircle2 },
      { label: "Aumento na recuperação de glosas", value: "18%", icon: TrendingUp },
      { label: "Adoção pelos sócios", value: "100%", icon: Users },
    ],
    technicalHighlights: [
      "Processamento de grandes volumes de dados via Web Workers",
      "Cache agressivo com SWR para navegação instantânea",
      "Gráficos interativos renderizados em Canvas (Performance)",
      "Exportação assíncrona de relatórios em PDF/Excel",
    ]
  },
  "agendamento-whatsapp": {
    title: "Autoatendimento Sincronizado",
    client: "Consultório Dr. Marcelo",
    tags: ["TypeScript", "WhatsApp Business API", "Prisma"],
    overview: "Totem físico sincronizado com agendamento web e notificações ativas de WhatsApp para acabar com as filas na recepção.",
    metrics: [
      { label: "Fila de espera na recepção", value: "-50%", icon: ArrowLeft },
      { label: "Redução do no-show", value: "25%", icon: TrendingUp },
      { label: "Agendamentos automáticos", value: "850/mês", icon: Clock },
      { label: "Economia com papel e totens legados", value: "R$ 2.5k", icon: CheckCircle2 },
    ],
    technicalHighlights: [
      "Integração nativa com a API Oficial do WhatsApp",
      "Máquina de estados finitos (XState) para fluxos de conversa",
      "Banco de dados Serverless (PlanetScale)",
      "Design responsivo otimizado para tablets e totens touchscreen",
    ]
  }
};

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projectsDB[params.slug as keyof typeof projectsDB];

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
          <FadeIn>
            <div className="bg-surface-2 p-8 rounded-2xl h-full border border-border">
              <h3 className="text-xl font-semibold text-text mb-4">O Desafio</h3>
              <p className="text-text-muted leading-relaxed">
                {project.overview}
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="bg-surface-2 p-8 rounded-2xl h-full border border-border">
              <h3 className="text-xl font-semibold text-text mb-4">Métricas de Impacto</h3>
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
