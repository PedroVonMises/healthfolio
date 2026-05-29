"use client";

import React from "react";
import { StaggerContainer } from "./FadeIn";
import FadeIn from "./FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const metrics = [
  { label: "Aumento na Conversão", value: 30, prefix: "+", suffix: "%" },
  { label: "Redução de No-show", value: 25, prefix: "-", suffix: "%" },
  { label: "Adequação LGPD", value: 100, prefix: "", suffix: "%" },
  { label: "Satisfação do Paciente", value: 98, prefix: "", suffix: "%" },
];

export default function TrustMetrics() {
  return (
    <StaggerContainer
      className="mt-16 sm:mt-24 w-full flex flex-wrap justify-center gap-8 sm:gap-16 opacity-80"
      staggerDelay={0.12}
    >
      {metrics.map((metric) => (
        <FadeIn key={metric.label}>
          <div className="flex flex-col items-center group cursor-default relative px-6 py-4 rounded-2xl overflow-visible transition-all duration-300">
            {/* Glow effect background */}
            <div className="absolute inset-0 bg-radial from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none -z-10 blur-xl scale-125" />
            
            <span className="text-6xl sm:text-8xl font-display font-bold text-primary group-hover:scale-105 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none">
              <AnimatedCounter
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
            </span>
            <span className="mt-2 text-xs sm:text-sm font-semibold text-text-muted uppercase tracking-wider group-hover:text-text transition-colors duration-300 text-center">
              {metric.label}
            </span>
          </div>
        </FadeIn>
      ))}
    </StaggerContainer>
  );
}
