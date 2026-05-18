import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import Spotlight from '@/components/ui/Spotlight';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';

const projects = [
  {
    id: 'portal-paciente',
    title: 'Portal do Paciente - Clínica Vix',
    category: 'Desenvolvimento Full-stack',
    description: 'Um ambiente seguro (PWA) integrado ao ERP da clínica, permitindo o agendamento de consultas, visualização de laudos em PDF e acesso ao histórico médico. Reduziu chamadas telefônicas em 35% no primeiro mês.',
    tags: ['Next.js', 'Tailwind', 'Integração ERP', 'Autenticação'],
  },
  {
    id: 'dashboard-gestao',
    title: 'Dashboard de Gestão Clínica',
    category: 'UX/UI & Front-end',
    description: 'Painel gerencial para sócios-médicos com métricas em tempo real sobre faturamento por convênio, taxa de ocupação da agenda e índice de no-show. Substituiu 4 planilhas manuais complexas.',
    tags: ['React', 'Gráficos', 'API REST', 'Design System'],
  },
  {
    id: 'agendamento-whatsapp',
    title: 'Totem de Autoatendimento & Agendamento',
    category: 'Solução Integrada',
    description: 'Fluxo contínuo de recepção: totem local sincronizado com um sistema de agendamento web responsivo e notificações via WhatsApp, otimizando o tempo de espera.',
    tags: ['TypeScript', 'Integração WhatsApp', 'UX Focus'],
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="bg-bg py-24 sm:py-32 border-t border-divider">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-base font-semibold leading-7 text-primary">Portfólio</h2>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Cases de Sucesso na Saúde
            </p>
            <p className="mt-6 text-lg leading-8 text-text-muted">
              Veja como soluções digitais focadas em usabilidade transformam a operação de clínicas e a percepção de valor dos pacientes.
            </p>
          </div>
        </FadeIn>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={0.2 + index * 0.1}>
              <Spotlight className="h-full rounded-2xl ring-1 ring-inset ring-border/50 bg-bg hover:ring-primary/30 transition-all duration-300 hover:shadow-lg group">
                <article className="flex max-w-xl flex-col items-start justify-between p-6 sm:p-8 h-full relative z-10">
                  <div className="relative w-full overflow-hidden rounded-xl mb-6">
                    <div className="aspect-[16/9] w-full bg-surface-2 object-cover sm:aspect-[2/1] lg:aspect-[3/2] flex items-center justify-center border border-border transition-all duration-500 group-hover:scale-105 group-hover:border-primary/30">
                      <ImageIcon className="h-8 w-8 text-text-faint transition-colors duration-500 group-hover:text-primary/50" />
                    </div>
                  </div>
                  <div className="max-w-xl flex flex-col flex-1 w-full">
                    <div className="flex items-center gap-x-4 text-xs">
                      <span className="text-primary font-medium">
                        {project.category}
                      </span>
                    </div>
                    <div className="group/title relative flex-1">
                      <h3 className="mt-3 font-display text-xl font-semibold leading-6 text-text group-hover/title:text-primary transition-colors flex items-center gap-2">
                        <Link href={`/projetos/${project.id}`}>
                          <span className="absolute inset-0" />
                          {project.title}
                        </Link>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-0" />
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-text-muted">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-muted ring-1 ring-inset ring-border transition-colors group-hover:bg-primary-highlight/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Spotlight>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn delay={0.5}>
          <div className="mt-16 flex justify-center">
             <Link
              href="#contato"
              className="group flex items-center gap-2 rounded-full bg-surface-2 px-6 py-2.5 text-sm font-semibold text-text shadow-sm hover:bg-surface-offset ring-1 ring-inset ring-border transition-all hover:ring-primary/50"
            >
              Quero um projeto similar para minha clínica
              <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
