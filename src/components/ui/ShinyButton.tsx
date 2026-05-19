"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ShinyButton({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-text-inverse rounded-full overflow-hidden shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-primary" />
      
      {/* Conic Gradient Border Glow */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute inset-[-100%] z-0 w-[300%] h-[300%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_50%,rgba(255,255,255,0.5)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_50%,rgba(255,255,255,0.3)_100%)] opacity-40"
      />
      
      {/* Inner background to mask the conic gradient into a thin border */}
      <span className="absolute inset-[1px] w-[calc(100%-2px)] h-[calc(100%-2px)] bg-primary rounded-full transition-colors group-hover:bg-primary-hover" />
      
      {/* Sweeping Shine */}
      <motion.div
        animate={{ x: ["-100%", "300%"] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 2 }}
        className="absolute inset-0 z-10 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
      />
      
      <span className="relative z-20 flex items-center gap-2 drop-shadow-sm tracking-wide">
        {children}
      </span>
    </motion.a>
  );
}
