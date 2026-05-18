import React from 'react';

const services = [
  {
    id: 1,
    title: 'Portais de Agendamento Online',
    description:
      'Elimine gargalos na recepção. Desenvolvo sistemas de agendamento 24/7 com integração ao WhatsApp e calendário do paciente, reduzindo fricção e aumentando a conversão.',
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Portais de Paciente Exclusivos',
    description:
      'Diferencie sua clínica com um ambiente seguro para acesso a laudos, histórico de consultas e orientações pós-operatórias. PWA responsivo com design premium.',
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Dashboards Clínicos e Financeiros',
    description:
      'Painéis gerenciais customizados que integram com seu ERP legado. Tenha clareza sobre taxas de no-show, faturamento de planos e ocupação de agenda em tempo real.',
    icon: (
      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="especializacao" className="bg-surface py-24 sm:py-32 border-y border-divider">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.id} className="flex flex-col rounded-xl bg-bg p-8 shadow-sm ring-1 ring-border transition-all hover:shadow-md">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-text font-display">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-highlight">
                    {service.icon}
                  </div>
                  {service.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-text-muted">
                  <p className="flex-auto">{service.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
