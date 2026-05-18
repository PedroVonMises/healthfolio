"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function LocalPresenceMap() {
  return (
    <div className="relative w-full h-full min-h-[200px] rounded-2xl bg-surface-2 overflow-hidden border border-border p-6 flex flex-col justify-end">
      {/* Decorative Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Stylized Real Map (OSM) */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none overflow-hidden" style={{ filter: 'grayscale(1) contrast(1.2)' }}>
        <iframe 
          className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2"
          frameBorder="0" 
          title="Mapa de cobertura da Grande Vitória"
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src="https://www.openstreetmap.org/export/embed.html?bbox=-40.33,-20.34,-40.26,-20.28&amp;layer=mapnik" 
        />
      </div>

      {/* Pulsing Location Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-12 h-12 bg-primary/20 rounded-full"
            animate={{ scale: [1, 2], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-6 h-6 bg-primary/40 rounded-full"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
          <div className="relative z-10 w-8 h-8 bg-surface rounded-full flex items-center justify-center shadow-md ring-1 ring-border">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
        </div>
        
        <div className="mt-2 bg-bg/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 dark:border-white/10 shadow-lg">
          <p className="text-xs font-semibold text-text whitespace-nowrap">Grande Vitória, ES</p>
        </div>
      </div>

      <div className="relative z-10 mt-auto bg-bg/60 backdrop-blur-xl p-5 -mx-6 -mb-6 rounded-b-2xl border-t border-white/20 dark:border-white/10 shadow-[-0_10px_40px_-15px_rgba(0,0,0,0.1)]">
        <h3 className="text-sm font-semibold text-text">Atendimento Presencial</h3>
        <p className="text-xs text-text-muted mt-1">Consultoria técnica direta na sua clínica para entender a operação de perto.</p>
      </div>
    </div>
  );
}
