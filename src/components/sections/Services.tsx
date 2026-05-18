import React from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { CalendarClock, ShieldCheck, Activity, Lock } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Portais de Agendamento Online',
    description: 'Elimine gargalos na recepção. Desenvolvo sistemas de agendamento 24/7 com integração ao WhatsApp e calendário do paciente, reduzindo fricção e aumentando a conversão.',
    icon: <CalendarClock className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 4,
    title: 'Adequação LGPD by Design',
    description: 'Infraestrutura blindada. Criptografia ponta-a-ponta e anonimização de dados nativa em todos os sistemas para proteger sua clínica.',
    icon: <Lock className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    className: "md:col-span-1 md:row-span-1 bg-gradient-to-br from-bg to-primary-highlight/10",
  },
  {
    id: 3,
    title: 'Dashboards Clínicos e Financeiros',
    description: 'Painéis gerenciais customizados. Tenha clareza sobre taxas de no-show, faturamento e ocupação de agenda em tempo real.',
    icon: <Activity className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 2,
    title: 'Portais de Paciente Exclusivos (PWA)',
    description: 'Diferencie sua clínica com um ambiente seguro para acesso a laudos, histórico de consultas e orientações pós-operatórias. Uma experiência premium na palma da mão.',
    icon: <ShieldCheck className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    className: "md:col-span-3 md:row-span-1",
  },
];

export default function Services() {
  return (
    <section id="especializacao" className="bg-surface py-24 sm:py-32 border-y border-divider">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Tecnologia em Saúde</h2>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl text-balance">
              Tudo o que sua clínica precisa para digitalizar a jornada do paciente
            </p>
            <p className="mt-6 text-lg leading-8 text-text-muted text-balance">
              Foco no nicho de clínicas especializadas. O mesmo nível de experiência digital
              oferecido pelos grandes hospitais da RMGV, agora acessível para o seu consultório.
            </p>
          </div>
        </FadeIn>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-6 md:grid-cols-3 md:auto-rows-[1fr] lg:max-w-none">
            {services.map((service, index) => (
              <FadeIn key={service.id} delay={0.2 + index * 0.1} className={service.className}>
                <div className={`relative flex flex-col rounded-3xl bg-bg p-8 shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:ring-primary/40 h-full overflow-hidden group ${service.className?.includes('bg-gradient') ? 'bg-gradient-to-br from-bg to-primary-highlight/10' : ''}`}>
                  {/* Glassmorphism subtle flare on hover */}
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-1000 transform transition-all pointer-events-none" />
                  
                  <dt className="relative z-10 flex flex-col items-start gap-y-4 text-lg font-semibold leading-7 text-text font-display">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-offset ring-1 ring-border shadow-sm group-hover:scale-110 group-hover:bg-primary-highlight transition-all duration-300">
                      {service.icon}
                    </div>
                    {service.title}
                  </dt>
                  <dd className="relative z-10 mt-4 flex flex-auto flex-col text-base leading-7 text-text-muted">
                    <p className="flex-auto">{service.description}</p>
                  </dd>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
