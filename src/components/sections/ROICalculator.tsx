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
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
              O custo invisível da agenda ociosa
            </p>
            <p className="mt-6 text-base leading-7 text-text-muted">
              Veja em tempo real o impacto financeiro que um sistema de agendamento inteligente e envio automatizado de lembretes via WhatsApp pode trazer para a sua clínica.
            </p>
          </div>
        </FadeIn>

        {/* Symmetrical Twin-Pane Layout */}
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Symmetrical Pane 1: Controls (Parametros.config) */}
          <FadeIn delay={0.2} className="h-full">
            <div className="relative rounded-3xl bg-surface/30 backdrop-blur-sm border border-divider shadow-lg overflow-hidden flex flex-col h-full group">
              {/* macOS Window Frame */}
              <div className="w-full h-8 bg-surface-2/80 backdrop-blur-sm border-b border-border flex items-center px-4 gap-1.5 z-20 relative select-none">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-xs" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-xs" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 shadow-xs" />
                <span className="ml-4 text-[10px] text-text-faint font-mono tracking-widest uppercase">Parametros.config</span>
              </div>

              {/* Body */}
              <div className="pt-14 pb-8 px-6 sm:px-8 flex-1 flex flex-col justify-between gap-6 bg-bg/50">
                <div className="space-y-6">
                  {/* Slider 1 */}
                  <div className="bg-surface-2/40 border border-divider p-5 rounded-2xl hover:bg-surface-2/60 transition-colors duration-300">
                    <label htmlFor="consultas-slider" className="flex justify-between text-sm font-semibold text-text mb-3">
                      <span>Consultas por Mês</span>
                      <span className="text-primary font-mono font-bold text-base">{consultas} consultas</span>
                    </label>
                    <input
                      id="consultas-slider"
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={consultas}
                      onChange={(e) => setConsultas(Number(e.target.value))}
                      aria-label="Consultas por Mês"
                      className="w-full h-1.5 bg-surface-offset rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-text-faint font-semibold mt-2 select-none">
                      <span>100</span>
                      <span>1.000</span>
                      <span>2.000</span>
                    </div>
                  </div>

                  {/* Slider 2 */}
                  <div className="bg-surface-2/40 border border-divider p-5 rounded-2xl hover:bg-surface-2/60 transition-colors duration-300">
                    <label htmlFor="ticket-slider" className="flex justify-between text-sm font-semibold text-text mb-3">
                      <span>Ticket Médio (R$)</span>
                      <span className="text-primary font-mono font-bold text-base">R$ {ticket}</span>
                    </label>
                    <input
                      id="ticket-slider"
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={ticket}
                      onChange={(e) => setTicket(Number(e.target.value))}
                      aria-label="Ticket Médio"
                      className="w-full h-1.5 bg-surface-offset rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-text-faint font-semibold mt-2 select-none">
                      <span>100</span>
                      <span>500</span>
                      <span>1.000</span>
                    </div>
                  </div>
                </div>
                
                {/* Alert info box */}
                <div className="p-4 bg-surface-2/50 rounded-2xl flex items-start gap-3 border border-divider shrink-0">
                  <AlertCircle className="w-5 h-5 text-text-muted shrink-0 mt-0.5" />
                  <p className="text-xs text-text-muted leading-relaxed">
                    Cálculo baseado em uma taxa média de 20% de No-Show (pacientes que faltam sem avisar), comum em clínicas especializadas na Grande Vitória.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Symmetrical Pane 2: Outputs (Dashboard.exe) */}
          <FadeIn delay={0.3} className="h-full">
            <div className="relative rounded-3xl bg-surface/30 backdrop-blur-sm border border-divider shadow-lg overflow-hidden flex flex-col h-full group">
              {/* macOS Window Frame */}
              <div className="w-full h-8 bg-surface-2/80 backdrop-blur-sm border-b border-divider flex items-center px-4 gap-1.5 z-20 relative select-none">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-xs" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-xs" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 shadow-xs" />
                <span className="ml-4 text-[10px] text-text-faint font-mono tracking-widest uppercase">Dashboard.exe</span>
              </div>

              {/* Body */}
              <div className="pt-14 pb-8 px-6 sm:px-8 flex-1 flex flex-col justify-between gap-6 bg-bg/50">
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-faint mb-2">Faturamento Perdido Atual (Mês)</p>
                    <p className="text-4xl font-display font-bold text-primary tracking-tight">
                      <AnimatedNumber value={perdaAtual} />
                    </p>
                    <p className="text-xs text-text-muted mt-1.5 leading-relaxed">
                      Prejuízo mensal decorrente do absenteísmo não gerenciado de pacientes.
                    </p>
                  </div>

                  <div className="relative pt-8 border-t border-divider">
                    {/* Badge */}
                    <div className="absolute -top-3.5 left-0 bg-primary-highlight text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-primary/20 flex items-center gap-1 select-none">
                      <TrendingUp className="w-3 h-3" /> Cenário Digital
                    </div>
                    
                    <p className="text-xs font-bold uppercase tracking-wider text-text-faint mb-2 mt-2">Receita Recuperada Estimada</p>
                    <p className="text-5xl font-display font-extrabold text-emerald-500 dark:text-emerald-400 tracking-tight drop-shadow-sm">
                      + <AnimatedNumber value={recuperacao} />
                    </p>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed">
                      Valor recuperado mensalmente através do reengajamento inteligente de faltas e lembretes automáticos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
