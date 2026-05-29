"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Spotlight from "@/components/ui/Spotlight";
import FadeIn from "@/components/ui/FadeIn";
import { StaggerContainer } from "@/components/ui/FadeIn";
import MagneticButton from "@/components/ui/MagneticButton";
import Image from "next/image";

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

  const y = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative bg-bg pt-20 pb-16 sm:pt-24 sm:pb-24 lg:pt-24 lg:pb-32 min-h-[100svh] overflow-hidden flex items-center"
    >
      {/* Parallax background layer */}
      <div className="absolute inset-0 z-0">
        <Spotlight className="absolute inset-0 z-0" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — Copy */}
          <motion.div style={{ y, opacity }}>
            <StaggerContainer className="max-w-xl" staggerDelay={0.12}>
              <FadeIn>
                <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl text-balance leading-[1.1]">
                  Sua agenda cheia. Seu administrativo no piloto automático.
                </h1>
              </FadeIn>

              <FadeIn>
                <p className="mt-6 text-base leading-7 text-text-muted max-w-[50ch]">
                  Portais de paciente e agendamento inteligente para clínicas
                  privadas na Grande Vitória que eliminam no-shows e liberam
                  sua equipe.
                </p>
              </FadeIn>

              <FadeIn>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <MagneticButton
                    href="#contato"
                    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-md shadow-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 ring-1 ring-primary-active/50 hover:ring-primary-highlight"
                  >
                    Quero uma análise gratuita
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
                </div>
              </FadeIn>
            </StaggerContainer>
          </motion.div>

          {/* Right column — Dashboard visual */}
          <FadeIn direction="left" delay={0.3}>
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative"
            >
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-border bg-surface">
                <Image
                  src="/hero-dashboard.png"
                  alt="Painel gerencial de clínica com métricas de agendamento, faturamento e taxa de no-show em tempo real"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
