"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Spotlight from "@/components/ui/Spotlight";
import FadeIn from "@/components/ui/FadeIn";
import { StaggerContainer } from "@/components/ui/FadeIn";
import MagneticButton from "@/components/ui/MagneticButton";
import DigitalClock from "@/components/ui/DigitalClock";
import TrustMetrics from "@/components/ui/TrustMetrics";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.95]);

  const badgeY = useTransform(smoothProgress, [0, 1], ["0px", "-50px"]);
  const ctaY = useTransform(smoothProgress, [0, 1], ["0px", "30px"]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative bg-bg pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32 min-h-[100svh] overflow-hidden"
    >
      {/* Parallax background layer */}
      <div className="absolute inset-0 z-0">
        <Spotlight className="absolute inset-0 z-0" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10"
      >
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
            <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl text-balance">
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
      </motion.div>
    </section>
  );
}
