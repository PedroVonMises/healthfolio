import { ArrowLeft, CheckCircle2, TrendingUp, Clock, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface ProjectMetric {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface Project {
  /** URL-safe identifier, used as the [slug] route segment */
  id: string;
  /** Short display title used on the projects grid */
  title: string;
  category: string;
  desafio: string;
  solucao: string;
  resultado: string;
  relevancia: string;
  tags: string[];
  image: string;
  /** Full case-study data (detail page) */
  caseStudy: {
    /** Long-form title used on the detail page */
    title: string;
    client: string;
    tags: string[];
    challenge: string;
    approach: string;
    result: string;
    metrics: ProjectMetric[];
    technicalHighlights: string[];
  };
  /** Optional date for sitemap lastModified; ISO date string "YYYY-MM-DD" */
  updatedAt?: string;
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: "portal-paciente",
    title: "Portal do Paciente - Clínica de Especialidades",
    category: "Redução de Gargalos",
    desafio:
      "Clínica perdia 15% dos agendamentos devido à lentidão no atendimento via WhatsApp.",
    solucao:
      "Ambiente seguro integrado diretamente ao ERP para agendamento automático de exames.",
    resultado:
      "Redução de 35% nas chamadas telefônicas e aumento de 22% em consultas efetivadas no 1º mês.",
    relevancia:
      "Se sua recepção está saturada, esse modelo pode reduzir chamadas em 30–45%.",
    tags: ["Next.js", "Tailwind CSS", "Integração ERP"],
    image: "/portaldopaciente.png",
    caseStudy: {
      title: "Portal do Paciente Segregado",
      client: "Rede de Clínicas de Imagem",
      tags: ["HIPAA/LGPD", "Next.js", "Integração ERP"],
      challenge:
        "Agendamentos manuais via WhatsApp consumiam 80% do tempo da recepção, com taxa de no-show de 20% e riscos de conformidade no envio de resultados de exames.",
      approach:
        "Arquitetura com criptografia em repouso (AES-256) e autenticação biométrica via web. Implementação de fila SQS para sincronização bidirecional com o legado.",
      result:
        "Autonomia completa do paciente na remarcação de exames e acesso aos laudos. Adoção de 65% na base em 3 meses.",
      metrics: [
        { label: "Redução em chamadas", value: "35%", icon: ArrowLeft },
        {
          label: "Aumento em consultas efetivadas",
          value: "22%",
          icon: TrendingUp,
        },
        {
          label: "Tempo médio de agendamento",
          value: "< 2 min",
          icon: Clock,
        },
        { label: "Satisfação dos pacientes", value: "98%", icon: Users },
      ],
      technicalHighlights: [
        "Autenticação JWT com Refresh Tokens rotativos (Compliance LGPD)",
        "Criptografia de ponta a ponta na visualização de laudos",
        "Integração bidirecional com ERP via fila SQS (AWS)",
        "Renderização híbrida (SSG + SSR) para máxima velocidade",
      ],
    },
  },
  {
    id: "dashboard-gestao",
    title: "Painel Gerencial para Sócios-Médicos",
    category: "Visibilidade Financeira",
    desafio:
      "Gestão às cegas com fechamento financeiro mensal demorado e relatórios manuais de no-show.",
    solucao:
      "Dashboard em tempo real consolidando faturamento por convênio e absenteísmo médico.",
    resultado:
      "Substituição completa de 4 planilhas complexas, agilizando fechamentos e tomadas de decisão.",
    relevancia:
      "Se você ainda fecha o mês em planilhas, esse painel pode eliminar esse trabalho em 1–2 semanas.",
    tags: ["React", "Data Viz", "API REST"],
    image: "/painel.png",
    caseStudy: {
      title: "Painel Gerencial para Sócios-Médicos",
      client: "Rede de Clínicas Capixaba",
      tags: ["React", "RBAC", "Data Viz"],
      challenge:
        "Falta de visibilidade financeira. Gestores usavam múltiplas planilhas e o fechamento demorava 15 dias, gerando perdas severas com glosas de convênios.",
      approach:
        "Dashboard com Role-Based Access Control (RBAC). Processamento de 100k+ linhas de CSV de convênios diretamente no navegador usando Web Workers.",
      result:
        "Clareza absoluta sobre rentabilidade por convênio e métricas de no-show. Fechamento reduzido para 3 dias.",
      metrics: [
        {
          label: "Tempo de fechamento mensal",
          value: "-12 dias",
          icon: Clock,
        },
        {
          label: "Precisão do faturamento",
          value: "100%",
          icon: CheckCircle2,
        },
        {
          label: "Aumento na recuperação de glosas",
          value: "18%",
          icon: TrendingUp,
        },
        { label: "Adoção pelos sócios", value: "100%", icon: Users },
      ],
      technicalHighlights: [
        "Processamento de grandes volumes de dados via Web Workers",
        "Cache agressivo com SWR para navegação instantânea",
        "Controle de acesso granular (RBAC) isolando visão de sócios e faturamento",
        "Gráficos interativos renderizados em Canvas (Performance)",
      ],
    },
  },
  {
    id: "agendamento-whatsapp",
    title: "Autoatendimento Sincronizado",
    category: "Experiência Premium",
    desafio:
      "Sala de espera lotada de forma recorrente e insatisfação no processo de recepção física.",
    solucao:
      "Totem eletrônico sincronizado com agendamento web e alertas instantâneos via WhatsApp.",
    resultado:
      "Redução de 50% no tempo médio de espera do paciente na recepção da clínica.",
    relevancia:
      "Se sua sala de espera acumula filas, esse fluxo pode reduzir o tempo médio em até 50%.",
    tags: ["TypeScript", "Integração WhatsApp"],
    image: "/auto.png",
    caseStudy: {
      title: "Autoatendimento Sincronizado",
      client: "Consultório Dr. Marcelo",
      tags: ["HL7/FHIR", "WhatsApp API", "Prisma"],
      challenge:
        "Recepção sobrecarregada, filas físicas e pacientes abandonando o consultório devido à espera prolongada apenas para confirmar chegada.",
      approach:
        "Totem integrado via API HL7 ao sistema central. Notificações ativas via WhatsApp API usando Máquina de Estados (XState) para triagem prévia.",
      result:
        "Fim das filas físicas. Totem e IA resolvem 85% do fluxo de recepção sem intervenção humana.",
      metrics: [
        {
          label: "Fila de espera na recepção",
          value: "-50%",
          icon: ArrowLeft,
        },
        { label: "Redução do no-show", value: "25%", icon: TrendingUp },
        {
          label: "Agendamentos automáticos",
          value: "850/mês",
          icon: Clock,
        },
        {
          label: "Economia com papel/totens legados",
          value: "R$ 2.5k",
          icon: CheckCircle2,
        },
      ],
      technicalHighlights: [
        "Interoperabilidade (padrões HL7/FHIR) para sincronismo de pacientes",
        "Máquina de estados finitos (XState) para fluxos de conversa",
        "Banco de dados Serverless com criptografia at rest",
        "Design responsivo otimizado para tablets e totens touchscreen",
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug);
}
