import React from 'react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <span className="rounded-full bg-primary-highlight px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20">
              Especialista em Saúde Digital na Grande Vitória
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-6xl text-balance">
            Aumente a conversão de pacientes e reduza o no-show.
          </h1>
          <p className="mt-6 text-lg leading-8 text-text-muted text-balance">
            Desenvolvo portais de agendamento modernos e dashboards clínicos sob medida para clínicas privadas.
            Entregue uma experiência digital de ponta que seus pacientes esperam e sua clínica merece.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#contato"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-text-inverse shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
            >
              Agendar Avaliação Gratuita
            </a>
            <a
              href="#projetos"
              className="text-sm font-semibold leading-6 text-text hover:text-primary transition-colors duration-200"
            >
              Ver Casos de Sucesso <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
