"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Spotlight from "@/components/ui/Spotlight";
import FadeIn from "@/components/ui/FadeIn";
import { StaggerContainer } from "@/components/ui/FadeIn";
import MagneticButton from "@/components/ui/MagneticButton";
import DigitalClock from "@/components/ui/DigitalClock";
import TrustMetrics from "@/components/ui/TrustMetrics";

export default function Hero() {
  const { scrollY } = useScroll();

  // Parallax layers — subtle values to avoid motion sickness
  const badgeY = useTransform(scrollY, [0, 500], [0, -60]);
  const ctaY = useTransform(scrollY, [0, 500], [0, 30]);
  const bgY = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative bg-bg pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
      {/* Parallax background layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <Spotlight className="absolute inset-0 z-0" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <StaggerContainer className="mx-auto max-w-3xl text-center" staggerDelay={0.12}>
          <FadeIn>
            <motion.div
              style={{ y: badgeY }}
              className="mb-8 flex justify-center"
              data-testid="hero-badge"
            >
              <span className="rounded-full bg-primary-highlight px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20 shadow-sm shadow-primary/10">
                Desenvolvedor Front-end Especialista em Saúde
              </span>
            </motion.div>
          </FadeIn>

          <FadeIn>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-6xl text-balance">
              Sua agenda cheia. Seu administrativo no piloto automático.
            </h1>
          </FadeIn>

          <FadeIn>
            <p className="mt-6 text-base leading-7 text-text-muted text-balance">
              Reduza o no-show e pare de perder pacientes por gargalos no
              WhatsApp. Desenvolvo portais de paciente e sistemas de agendamento
              focados em clínicas privadas na Grande Vitória – ES.
            </p>
          </FadeIn>

          <FadeIn>
            <motion.div
              style={{ y: ctaY }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <MagneticButton
                href="#contato"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-md shadow-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 ring-1 ring-primary-active/50 hover:ring-primary-highlight"
              >
                <span>Quero uma análise gratuita</span>
                <DigitalClock />
              </MagneticButton>
              <a
                href="#projetos"
                className="text-sm font-semibold leading-6 text-text hover:text-primary transition-colors duration-300 group flex items-center gap-2"
              >
                Ver Casos de Sucesso{" "}
                <span
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  →
                </span>
              </a>
            </motion.div>
          </FadeIn>
        </StaggerContainer>

        {/* Métricas de conversão para o público-alvo */}
        <TrustMetrics />
      </div>
    </section>
  );
}
