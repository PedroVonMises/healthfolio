"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import { StaggerContainer } from "@/components/ui/FadeIn";
import Spotlight from "@/components/ui/Spotlight";
import dynamic from "next/dynamic";
const BeforeAfterSlider = dynamic(() => import("@/components/ui/BeforeAfterSlider"), { ssr: false });
import { ArrowRight, Image as ImageIcon, FolderCheck } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/projects";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const categories = [
  "Todos",
  "Redução de Gargalos",
  "Visibilidade Financeira",
  "Experiência Premium",
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

import { useQueryState } from 'nuqs';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useQueryState('categoria', { defaultValue: 'Todos' });

  const filtered =
    activeFilter === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projetos" className="bg-bg py-24 sm:py-32 border-t border-divider">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StaggerContainer staggerDelay={0.1}>
          <FadeIn>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-base font-semibold leading-7 text-primary flex items-center gap-2">
                <FolderCheck className="w-4 h-4" /> Estudos de Caso
              </h2>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
                Resultados reais para clínicas capixabas
              </p>
              <p className="mt-6 text-base leading-7 text-text-muted">
                Veja como investir na experiência digital certa transforma custos
                operacionais em lucro previsível e pacientes esporádicos em
                clientes fiéis.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mx-auto mt-12 max-w-5xl mb-16">
              <BeforeAfterSlider
                beforeLabel="Recepção"
                afterLabel="Autoatendimento"
                beforeImage="/ANTES.png"
                afterImage="/DEPOIS.png"
              />
            </div>
          </FadeIn>
        </StaggerContainer>

        {/* Filter Tabs */}
        <FadeIn>
          <div className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  activeFilter === cat
                    ? "text-text-inverse"
                    : "text-text-muted hover:text-text bg-surface-2 hover:bg-surface-offset ring-1 ring-border"
                }`}
              >
                {/* Animated pill background */}
                {activeFilter === cat && (
                  <motion.span
                    layoutId="categoria-ativa"
                    className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Animated Grid */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="h-full"
              >
                <Spotlight className="h-full rounded-2xl border border-divider/60 bg-surface/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 group flex flex-col">
                  <article className="flex max-w-xl flex-col items-start justify-between p-6 sm:p-8 h-full relative z-10 flex-1 w-full">
                    <div className="relative w-full overflow-hidden rounded-xl mb-6 border border-divider bg-surface-2 group-hover:border-primary/30 transition-colors duration-500 shadow-sm shrink-0">
                      {/* Faux Window Frame (MacBook style) */}
                      <div className="w-full h-8 bg-surface-2/80 backdrop-blur-sm border-b border-border flex items-center px-4 gap-1.5 z-20 relative select-none">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-xs" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-xs" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 shadow-xs" />
                      </div>
                      <div className="aspect-[16/9] w-full bg-surface-2 overflow-hidden sm:aspect-[2/1] lg:aspect-[3/2] flex items-center justify-center relative">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-text-faint transition-colors duration-500 group-hover:text-primary/50" />
                        )}
                      </div>
                    </div>

                    <div className="max-w-xl flex flex-col flex-1 w-full">
                      <div className="flex items-center gap-x-4 text-[10px] font-bold uppercase tracking-wider text-primary">
                        {project.category}
                      </div>

                      <div className="group/title relative flex-1 mt-3">
                        <h3 className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-text group-hover/title:text-primary transition-colors duration-300 flex items-center gap-2 leading-7 lg:leading-8">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          <Link href={`/projetos/${project.id}` as unknown as any}>
                            <span className="absolute inset-0" />
                            {project.title}
                          </Link>
                          <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover/title:opacity-100 group-hover/title:translate-x-1 group-hover/title:text-primary shrink-0" />
                        </h3>

                        {/* Dynamic Structured B2B Data */}
                        <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed">
                          <div>
                            <span className="font-bold text-[11px] uppercase tracking-wider text-text/80 block mb-0.5">Desafio</span>
                            <p className="text-text-muted">{project.desafio}</p>
                          </div>
                          <div>
                            <span className="font-bold text-[11px] uppercase tracking-wider text-text/80 block mb-0.5">Solução</span>
                            <p className="text-text-muted">{project.solucao}</p>
                          </div>
                          <div className="p-4 rounded-xl bg-surface-2/60 border border-divider shadow-xs group-hover:border-primary/20 transition-colors duration-500">
                            <span className="font-bold text-[11px] uppercase tracking-wider text-primary block mb-0.5">Resultado</span>
                            <p className="text-text font-semibold">{project.resultado}</p>
                          </div>
                          {project.relevancia && (
                            <p className="mt-1 text-[13px] leading-snug text-text-muted italic border-l-2 border-primary/40 pl-3">
                              {project.relevancia}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-surface-2 px-3 py-0.5 text-xs font-semibold text-text-muted border border-divider transition-all duration-300 group-hover:bg-primary-highlight/30 group-hover:text-primary group-hover:border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Spotlight>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <FadeIn>
          <div className="mt-16 flex justify-center">
            <Link
              href="#contato"
              className="group flex items-center gap-2 rounded-full bg-surface-2 px-6 py-2.5 text-sm font-semibold text-text shadow-sm hover:bg-surface-offset ring-1 ring-inset ring-border transition-all hover:ring-primary/50"
            >
              Ver como isso funciona na minha especialidade
              <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
