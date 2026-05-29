"use client";

import React from "react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function WhatsappButton() {
  return (
    <div 
      className="fixed bottom-6 right-6 z-40 pointer-events-none"
      data-testid="whatsapp-button-container"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        className="pointer-events-auto"
      >
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 select-none focus:outline-none"
          aria-label="WhatsApp"
        >
          {/* Label que aparece apenas sob hover */}
          <span className="opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-300 ease-out bg-surface dark:bg-surface-2 border border-border/40 px-3 py-1.5 rounded-lg text-xs font-semibold text-text shadow-md shadow-black/5 whitespace-nowrap">
            Prefere me chamar pelo Whats?
          </span>

          {/* Ícone Minimalista */}
          <div className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 flex items-center justify-center">
            <SiWhatsapp className="w-8 h-8 text-whatsapp transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[12deg] shrink-0" />
          </div>
        </a>
      </motion.div>
    </div>
  );
}

