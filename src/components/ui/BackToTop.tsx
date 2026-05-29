"use client";

import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest * 100);
    // Show button after scrolling down 300px
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG radius details
  const radius = 18;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Voltar para o topo"
          className="fixed bottom-24 right-7 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-bg/90 backdrop-blur-md border border-divider shadow-lg hover:shadow-xl text-text hover:text-primary transition-all focus:outline-none pointer-events-auto cursor-pointer"
        >
          {/* Circular progress SVG */}
          <svg className="absolute w-full h-full -rotate-90" width="44" height="44" viewBox="0 0 44 44">
            <circle
              className="text-divider/40"
              strokeWidth={stroke}
              stroke="currentColor"
              fill="transparent"
              r={normalizedRadius}
              cx="22"
              cy="22"
            />
            <motion.circle
              className="text-primary"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={normalizedRadius}
              cx="22"
              cy="22"
            />
          </svg>
          <ChevronUp className="w-5 h-5 z-10 relative" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
