import React from 'react';
import FadeIn from '@/components/ui/FadeIn';
import LocalPresenceMap from '@/components/ui/LocalPresenceMap';
import { Handshake } from 'lucide-react';

export default function About() {
  return (
    <section id="sobre" className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <FadeIn delay={0.1}>
                <h2 className="text-base font-semibold leading-7 text-primary flex items-center gap-2">
                  <Handshake className="w-4 h-4" /> Sócio-técnico, não apenas fornecedor
                </h2>
                <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl text-balance">
                  Desenvolvedor focado em resultados reais para a saúde
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-6 text-base leading-7 text-text-muted">
                  Sou Pedro Augusto, dev front-end dedicado exclusivamente a digitalizar o setor de saúde na Grande Vitória.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="mt-4 text-base leading-7 text-text-muted">
                  Ao observar o caos administrativo em recepções de clínicas, percebi que a tecnologia genérica falha com os médicos. Minha missão é traduzir código complexo em eficiência operacional: reduzindo faltas, protegendo dados (LGPD) e criando a experiência fluida que pacientes de alto ticket exigem. Atendimento presencial e consultivo para clínicas de Vitória, Vila Velha e região.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="mt-8">
                  <a
                    href="#contato"
                    className="group flex items-center gap-2 text-sm font-semibold leading-6 text-text hover:text-primary transition-colors"
                  >
                    Marcar uma conversa sobre sua operação 
                    <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
          <FadeIn delay={0.3} direction="left" className="flex items-center justify-center lg:justify-end h-full">
            <div className="w-full max-w-md aspect-square lg:aspect-auto lg:h-[400px]">
              <LocalPresenceMap />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
