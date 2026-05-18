"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

const testimonials = [
  {
    id: 1,
    quote: "A integração do agendamento com nosso WhatsApp reduziu em 40% o tempo que a recepção passava no telefone. A agenda agora vive cheia e sem buracos.",
    author: "Dr. Marcelo S.",
    role: "Sócio-Diretor, Clínica de Ortopedia (Vitória)",
    avatar: "M",
  },
  {
    id: 2,
    quote: "Estávamos usando 4 planilhas diferentes para fechar o mês. O dashboard criado pelo Pedro nos deu clareza absoluta sobre qual convênio realmente dá lucro.",
    author: "Dra. Juliana T.",
    role: "Gestora Clínica, Dermatologia (Vila Velha)",
    avatar: "J",
  },
  {
    id: 3,
    quote: "A preocupação com a LGPD foi o diferencial. Todo o portal do paciente foi construído com criptografia desde o primeiro dia. Posso dormir tranquilo.",
    author: "Ricardo M.",
    role: "Administrador Hospitalar",
    avatar: "R",
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="py-24 sm:py-32 bg-surface border-y border-divider overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary flex items-center justify-center gap-2">
              <Award className="w-4 h-4" /> Confiança Regional
            </h2>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl text-balance">
              O que dizem os gestores capixabas
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-4xl relative">
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-8 text-primary/10">
            <Quote className="w-32 h-32 rotate-180" />
          </div>

          <div className="relative h-[350px] sm:h-[250px] w-full perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-12"
              >
                <p className="text-lg sm:text-xl leading-relaxed text-text text-balance italic">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </p>
                
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-offset flex items-center justify-center shadow-inner ring-1 ring-border">
                    <span className="font-sans font-semibold text-text-muted text-base">
                      {testimonials[currentIndex].avatar}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-text">{testimonials[currentIndex].author}</div>
                    <div className="text-sm text-text-muted">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 relative z-10">
            <button 
              onClick={prev}
              className="p-2 rounded-full bg-surface-2 text-text hover:bg-surface-offset hover:text-primary transition-colors ring-1 ring-border"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-primary scale-125' : 'bg-border hover:bg-text-faint'
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="p-2 rounded-full bg-surface-2 text-text hover:bg-surface-offset hover:text-primary transition-colors ring-1 ring-border"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
