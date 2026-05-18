import React from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { CalendarClock, ShieldCheck, Activity } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Portais de Agendamento Online',
    description:
      'Elimine gargalos na recepção. Desenvolvo sistemas de agendamento 24/7 com integração ao WhatsApp e calendário do paciente, reduzindo fricção e aumentando a conversão.',
    icon: <CalendarClock className="h-6 w-6 text-primary" strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: 'Portais de Paciente Exclusivos',
    description:
      'Diferencie sua clínica com um ambiente seguro para acesso a laudos, histórico de consultas e orientações pós-operatórias. PWA responsivo com design premium.',
    icon: <ShieldCheck className="h-6 w-6 text-primary" strokeWidth={1.5} />,
  },
  {
    id: 3,
    title: 'Dashboards Clínicos e Financeiros',
    description:
      'Painéis gerenciais customizados que integram com seu ERP legado. Tenha clareza sobre taxas de no-show, faturamento de planos e ocupação de agenda em tempo real.',
    icon: <Activity className="h-6 w-6 text-primary" strokeWidth={1.5} />,
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
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service, index) => (
              <FadeIn key={service.id} delay={0.2 + index * 0.1}>
                <div className="flex flex-col rounded-2xl bg-bg p-8 shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:ring-primary/30 h-full">
                  <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-text font-display">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-highlight shadow-sm">
                      {service.icon}
                    </div>
                    {service.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-text-muted">
                    <p className="flex-auto">{service.description}</p>
                  </dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
