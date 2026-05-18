"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? 'border-b border-border bg-bg/80 backdrop-blur-md shadow-sm' : 'bg-transparent border-transparent'
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-300 ${
        isScrolled ? 'h-16' : 'h-20'
      }`}>
        <div className="flex flex-1 items-center gap-x-6">
          <Link href="/" className="-m-1.5 p-1.5 text-lg font-display font-bold text-text group">
            Pedro Augusto<span className="text-primary group-hover:animate-pulse">.</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-x-8">
          <Link href="#especializacao" className="text-sm font-semibold leading-6 text-text-muted hover:text-primary transition-colors">
            Especialização
          </Link>
          <Link href="#projetos" className="text-sm font-semibold leading-6 text-text-muted hover:text-primary transition-colors">
            Cases de Sucesso
          </Link>
          <Link href="#sobre" className="text-sm font-semibold leading-6 text-text-muted hover:text-primary transition-colors">
            Sobre Mim
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <ThemeToggle />
          <a
            href="#contato"
            className={`hidden sm:inline-flex text-sm font-semibold leading-6 transition-all duration-300 ${
              isScrolled 
                ? 'rounded-full bg-primary px-5 py-2 text-text-inverse hover:bg-primary-hover hover:-translate-y-0.5 shadow-md shadow-primary/20' 
                : 'text-text hover:text-primary'
            }`}
          >
            Fale Comigo {isScrolled ? '' : <span aria-hidden="true" className="ml-1">&rarr;</span>}
          </a>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-text hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
            aria-label="Abrir menu principal"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-surface px-6 py-6 sm:ring-1 sm:ring-border md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5 text-lg font-display font-bold text-text">
                  Pedro Augusto<span className="text-primary">.</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-text-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                  aria-label="Fechar menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flow-root">
                <div className="divide-y divide-divider">
                  <div className="space-y-2 py-6">
                    <Link
                      href="#especializacao"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-4 text-base font-semibold leading-7 text-text hover:bg-surface-offset hover:text-primary transition-colors"
                    >
                      Especialização
                    </Link>
                    <Link
                      href="#projetos"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-4 text-base font-semibold leading-7 text-text hover:bg-surface-offset hover:text-primary transition-colors"
                    >
                      Cases de Sucesso
                    </Link>
                    <Link
                      href="#sobre"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-4 text-base font-semibold leading-7 text-text hover:bg-surface-offset hover:text-primary transition-colors"
                    >
                      Sobre Mim
                    </Link>
                  </div>
                  <div className="py-6">
                    <a
                      href="#contato"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-primary-highlight transition-colors"
                    >
                      Agendar Avaliação
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
