"use client";

import React from 'react';
import FadeIn from './FadeIn';

const metrics = [
  { label: 'Aumento na Conversão', value: '+30%' },
  { label: 'Redução de No-show', value: '-25%' },
  { label: 'Adequação LGPD', value: '100%' },
  { label: 'Satisfação do Paciente', value: '98%' }
];

export default function TrustMetrics() {
  return (
    <div className="mt-16 sm:mt-24 w-full flex flex-wrap justify-center gap-8 sm:gap-16 opacity-80">
      {metrics.map((metric, index) => (
        <FadeIn key={metric.label} delay={0.5 + index * 0.1}>
          <div className="flex flex-col items-center group cursor-default">
            <span className="text-3xl sm:text-4xl font-display font-bold text-primary group-hover:scale-110 transition-transform duration-300">
              {metric.value}
            </span>
            <span className="mt-1 text-xs sm:text-sm font-medium text-text-muted uppercase tracking-wider">
              {metric.label}
            </span>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
