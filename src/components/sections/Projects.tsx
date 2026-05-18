import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import Spotlight from '@/components/ui/Spotlight';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { ArrowRight, Image as ImageIcon, FolderCheck } from 'lucide-react';

const projects = [
  {
    id: 'portal-paciente',
    title: 'Portal do Paciente - Clínica de Especialidades',
    category: 'Redução de Gargalos',
    description: 'Situação: Clínica perdia 15% dos agendamentos por demora no WhatsApp. Solução: Ambiente seguro integrado ao ERP. Resultado: Redução de 35% nas chamadas telefônicas e aumento de 22% em consultas efetivadas no primeiro mês.',
    tags: ['Next.js', 'Tailwind', 'Integração ERP'],
  },
  {
    id: 'dashboard-gestao',
    title: 'Painel Gerencial para Sócios-Médicos',
    category: 'Visibilidade Financeira',
    description: 'Situação: Gestão às cegas com fechamento mensal demorado. Solução: Dashboard consolidando faturamento por convênio e métricas de no-show. Resultado: Substituiu 4 planilhas complexas e acelerou a tomada de decisão financeira.',
    tags: ['React', 'Data Viz', 'API REST'],
  },
  {
    id: 'agendamento-whatsapp',
    title: 'Autoatendimento Sincronizado',
    category: 'Experiência Premium',
    description: 'Situação: Sala de espera lotada e pacientes insatisfeitos. Solução: Totem sincronizado com agendamento web e notificações ativas de WhatsApp. Resultado: Tempo de espera na recepção caiu pela metade.',
    tags: ['TypeScript', 'Integração WhatsApp'],
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="bg-bg py-24 sm:py-32 border-t border-divider">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-base font-semibold leading-7 text-primary flex items-center gap-2">
              <FolderCheck className="w-4 h-4" /> Estudos de Caso
            </h2>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Resultados reais para clínicas capixabas
            </p>
            <p className="mt-6 text-base leading-7 text-text-muted">
              Veja como investir na experiência digital certa transforma custos operacionais em lucro previsível e pacientes esporádicos em clientes fiéis.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mx-auto mt-12 max-w-5xl mb-16">
            <BeforeAfterSlider 
              beforeLabel="Recepção (Caos & Papel)"
              afterLabel="Autoatendimento & Dashboard"
              beforeImage="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1000&auto=format&fit=crop"
              afterImage="/dashboard.png"
            />
          </div>
        </FadeIn>
        
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={0.2 + index * 0.1}>
              <Spotlight className="h-full rounded-2xl ring-1 ring-inset ring-border/50 bg-bg hover:ring-primary/30 transition-all duration-300 hover:shadow-lg group">
                <article className="flex max-w-xl flex-col items-start justify-between p-6 sm:p-8 h-full relative z-10">
                  <div className="relative w-full overflow-hidden rounded-xl mb-6 ring-1 ring-border bg-surface-2 group-hover:ring-primary/30 transition-colors duration-500">
                    {/* Faux Window Frame (MacBook style) */}
                    <div className="w-full h-8 bg-surface border-b border-border flex items-center px-4 gap-1.5 z-20 relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                    </div>
                    <div className="aspect-[16/9] w-full bg-surface-2 object-cover sm:aspect-[2/1] lg:aspect-[3/2] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
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
                        <Link href={`/projetos/${project.id}` as any}>
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
              Ver como isso funciona na minha especialidade
              <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
