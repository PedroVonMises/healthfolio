import React from 'react';

export default function About() {
  return (
    <section id="sobre" className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">Sobre Mim</h2>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl text-balance">
                Especialista em unir código e experiência do paciente
              </p>
              <p className="mt-6 text-lg leading-8 text-text-muted">
                Com o aumento de clínicas na Grande Vitória, a diferença entre uma clínica padrão e uma clínica de excelência está na jornada digital.
              </p>
              <p className="mt-4 text-lg leading-8 text-text-muted">
                Sou Pedro Augusto, desenvolvedor Front-end focado exclusivamente no setor de saúde privada. Entendo que para o sócio-médico, tecnologia precisa resolver três problemas fundamentais: reduzir o no-show, fidelizar pacientes de alto ticket e simplificar o dia a dia da recepção.
              </p>
              <div className="mt-8">
                <a
                  href="#contato"
                  className="text-sm font-semibold leading-6 text-text hover:text-primary transition-colors"
                >
                  Vamos conversar sobre sua clínica <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-surface-2 overflow-hidden shadow-lg border border-border">
              {/* Placeholder para foto real de Pedro Augusto */}
              <div className="absolute inset-0 flex items-center justify-center text-text-faint font-medium">
                [Sua Foto Profissional Aqui]
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
