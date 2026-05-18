"use client";

import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform, useInView } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react';

function AnimatedNumber({ value }: { value: number }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (latest) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(latest)
  );

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 1.2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [value, motionValue, isInView]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export default function ROICalculator() {
  const [consultas, setConsultas] = useState(500);
  const [ticket, setTicket] = useState(300);

  // Business logic based on LOCALDATA.md (clinics losing money to no-show)
  const faturamentoPotencial = consultas * ticket;
  const taxaNoShowAtual = 0.20; // 20% average no show
  const perdaAtual = faturamentoPotencial * taxaNoShowAtual;
  
  // A modern portal reduces no-show by ~70% through automated WhatsApp + easy rescheduling
  const recuperacao = perdaAtual * 0.70; 

  return (
    <section id="calculadora" className="bg-bg py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" /> Simulação de Retorno
            </h2>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
              O custo invisível da agenda ociosa
            </p>
            <p className="mt-6 text-base leading-7 text-text-muted">
              Veja em tempo real o impacto financeiro que um sistema de agendamento inteligente e envio automatizado de lembretes via WhatsApp pode trazer para a sua clínica.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Interactive Controls */}
          <FadeIn delay={0.2}>
            <div className="bg-surface p-8 rounded-3xl shadow-sm ring-1 ring-border">
              <div className="mb-8">
                <label className="flex justify-between text-sm font-semibold text-text mb-4">
                  <span>Consultas por Mês</span>
                  <span className="text-primary">{consultas} consultas</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={consultas}
                  onChange={(e) => setConsultas(Number(e.target.value))}
                  className="w-full h-2 bg-surface-offset rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm font-semibold text-text mb-4">
                  <span>Ticket Médio (R$)</span>
                  <span className="text-primary">R$ {ticket}</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={ticket}
                  onChange={(e) => setTicket(Number(e.target.value))}
                  className="w-full h-2 bg-surface-offset rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              
              <div className="mt-8 p-4 bg-surface-2 rounded-xl flex items-start gap-3 border border-border">
                <AlertCircle className="w-5 h-5 text-text-muted shrink-0 mt-0.5" />
                <p className="text-xs text-text-muted leading-relaxed">
                  Cálculo baseado em uma taxa média de 20% de No-Show (pacientes que faltam sem avisar), comum em clínicas especializadas na Grande Vitória.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Dynamic Dashboard Visualization */}
          <FadeIn delay={0.3}>
            <div className="relative rounded-3xl bg-surface-offset p-1 overflow-hidden ring-1 ring-border shadow-lg">
              {/* macOS Window Frame */}
              <div className="w-full h-8 bg-surface border-b border-border flex items-center px-4 gap-1.5 absolute top-0 left-0 right-0 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                <span className="ml-4 text-[10px] text-text-faint font-mono tracking-widest uppercase">Dashboard.exe</span>
              </div>

              <div className="pt-12 pb-8 px-8 bg-bg rounded-[1.4rem] h-full flex flex-col justify-center">
                <div className="mb-8">
                  <p className="text-sm font-medium text-text-muted mb-1">Faturamento Perdido Atual (Mês)</p>
                  <p className="text-3xl font-display font-bold text-red-500/90">
                    <AnimatedNumber value={perdaAtual} />
                  </p>
                </div>

                <div className="relative pt-8 border-t border-divider">
                  <div className="absolute -top-3 left-0 bg-primary-highlight text-primary text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Cenário Digital
                  </div>
                  <p className="text-sm font-medium text-text-muted mb-1 mt-2">Receita Recuperada Estimada</p>
                  <p className="text-5xl font-display font-extrabold text-green-500 drop-shadow-sm">
                    + <AnimatedNumber value={recuperacao} />
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    Acrescida ao seu faturamento todo mês.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
