import React from 'react';
import Link from 'next/link';

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
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-primary">Portfólio</h2>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Cases de Sucesso na Saúde
          </p>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            Veja como soluções digitais focadas em usabilidade transformam a operação de clínicas e a percepção de valor dos pacientes.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="flex max-w-xl flex-col items-start justify-between group">
              <div className="relative w-full">
                <div className="aspect-[16/9] w-full rounded-2xl bg-surface-2 object-cover sm:aspect-[2/1] lg:aspect-[3/2] flex items-center justify-center border border-border transition-colors group-hover:border-primary/30">
                  <span className="text-text-faint font-medium">Preview do Projeto</span>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-border/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <span className="text-text-muted">
                    {project.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 font-display text-xl font-semibold leading-6 text-text group-hover:text-primary transition-colors">
                    <Link href={`/projetos/${project.id}`}>
                      <span className="absolute inset-0" />
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-text-muted">
                    {project.description}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-muted ring-1 ring-inset ring-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
           <Link
            href="#contato"
            className="rounded-full bg-surface-2 px-6 py-2.5 text-sm font-semibold text-text shadow-sm hover:bg-surface-offset ring-1 ring-inset ring-border transition-all"
          >
            Quero um projeto similar para minha clínica
          </Link>
        </div>
      </div>
    </section>
  );
}
