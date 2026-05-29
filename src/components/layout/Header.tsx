"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ShinyButton from '@/components/ui/ShinyButton';
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const navItems = [
    { label: 'Especialização', href: '#especializacao' },
    { label: 'Cases de Sucesso', href: '#projetos' },
    { label: 'Sobre Mim', href: '#sobre' },
  ] as const;

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 w-full pointer-events-none"
    >
      {/* Scroll Progress Bar - Locked to viewport top */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[3px] bg-primary origin-left z-[60] pointer-events-auto"
        style={{ scaleX }}
      />
      
      {/* Container - Transitions to floating pill when scrolled */}
      <div className={`mx-auto flex items-center justify-between transition-all duration-500 pointer-events-auto ${
        isScrolled 
          ? 'max-w-5xl w-[calc(100%-2rem)] h-14 mt-4 px-6 rounded-full border border-divider bg-bg/85 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-white/5' 
          : 'max-w-7xl w-full h-20 px-6 lg:px-8 border-b border-border'
      }`}>
        <div className="flex flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5 text-2xl lg:text-3xl font-display font-bold text-text group transition-all duration-300 shrink-0">
            Pedro Augusto<span className="text-primary group-hover:animate-pulse">.</span>
          </Link>
          
          {/* Equidistant container for B2B Live indicator */}
          <div className={`hidden lg:flex flex-1 ${isScrolled ? 'justify-center' : 'justify-start pl-6'}`}>
            <div className="flex items-center gap-2 px-2.5 py-0.5 bg-surface-2/60 rounded-full border border-divider/60 backdrop-blur-sm select-none shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted transition-all duration-300">
                {isScrolled ? 'Disponível' : 'Disponível para projetos'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Desktop Navigation with sliding background pill */}
        <nav className="hidden md:flex items-center gap-x-1 relative">
          {navItems.map((item, index) => (
            <Link 
              key={item.href} 
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-2 text-base font-semibold leading-6 text-text-muted hover:text-text transition-colors duration-300 rounded-full focus-visible:outline-none"
            >
              {hoveredIndex === index && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-surface-2 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <ThemeToggle />
          <ShinyButton
            href="#contato"
            className="hidden sm:inline-flex"
          >
            Fale Comigo <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </ShinyButton>
          
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
            {/* Full screen backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden pointer-events-auto"
            />
            {/* Top-down menu sheet */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 top-0 z-50 w-full bg-surface border-b border-divider px-6 py-6 md:hidden overflow-y-auto pointer-events-auto shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5 text-2xl font-display font-bold text-text">
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
                <nav className="flex flex-col gap-y-1 py-4">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-3 text-lg font-semibold text-text hover:bg-surface-offset hover:text-primary transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: navItems.length * 0.05 + 0.15 }}
                    className="pt-6 mt-4 border-t border-divider flex flex-col gap-y-4"
                  >
                    <div className="flex items-center gap-2 px-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Disponível para novos projetos</span>
                    </div>
                    <a
                      href="#contato"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full justify-center items-center px-6 py-3 rounded-full text-base font-bold text-text-inverse bg-primary hover:bg-primary-hover transition-colors shadow-md"
                    >
                      Agendar Avaliação
                    </a>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
