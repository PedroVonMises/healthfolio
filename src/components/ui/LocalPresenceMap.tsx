"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface LocalPresenceMapProps {
  /** Latitude of the clinic. When omitted, falls back to the Grande Vitória bbox. */
  lat?: number;
  /** Longitude of the clinic. When omitted, falls back to the Grande Vitória bbox. */
  lng?: number;
  /** Pin label. Defaults to "Grande Vitória, ES". */
  label?: string;
}

/** Default OSM embed (Grande Vitória) — preserves the original hardcoded behavior. */
const DEFAULT_EMBED_SRC =
  'https://www.openstreetmap.org/export/embed.html?bbox=-40.33,-20.34,-40.26,-20.28&amp;layer=mapnik';
const DEFAULT_LABEL = 'Grande Vitória, ES';

/**
 * Build an OpenStreetMap embed URL with a small bbox centered on a point.
 * Pure + exported for unit testing. Falls back to the Grande Vitória embed when
 * lat/lng are not provided (backward compatible).
 */
export function computeOsmEmbedSrc(lat?: number, lng?: number, delta = 0.03): string {
  if (typeof lat !== 'number' || typeof lng !== 'number' || Number.isNaN(lat) || Number.isNaN(lng)) {
    return DEFAULT_EMBED_SRC;
  }
  const minLng = (lng - delta).toFixed(4);
  const minLat = (lat - delta).toFixed(4);
  const maxLng = (lng + delta).toFixed(4);
  const maxLat = (lat + delta).toFixed(4);
  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng},${minLat},${maxLng},${maxLat}&amp;layer=mapnik&amp;marker=${lat},${lng}`;
}

export default function LocalPresenceMap({ lat, lng, label }: LocalPresenceMapProps = {}) {
  const src = computeOsmEmbedSrc(lat, lng);
  const pinLabel = label ?? DEFAULT_LABEL;

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
          title={`Mapa de ${pinLabel}`}
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={src}
        />
      </div>

      {/* Pulsing Location Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-12 h-12 bg-primary/20 rounded-full"
            animate={{ scale: [1, 2], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
          />
          <motion.div
            className="absolute w-6 h-6 bg-primary/40 rounded-full"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            style={{ willChange: "transform, opacity" }}
          />
          <div className="relative z-10 w-8 h-8 bg-surface rounded-full flex items-center justify-center shadow-md ring-1 ring-border">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="mt-2 bg-bg/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 dark:border-white/10 shadow-lg">
          <p className="text-xs font-semibold text-text whitespace-nowrap">{pinLabel}</p>
        </div>
      </div>

      <div className="relative z-10 mt-auto bg-bg/60 backdrop-blur-xl p-5 -mx-6 -mb-6 rounded-b-2xl border-t border-white/20 dark:border-white/10 shadow-[-0_10px_40px_-15px_rgba(0,0,0,0.1)]">
        <h3 className="text-sm font-semibold text-text">Atendimento Presencial</h3>
        <p className="text-xs text-text-muted mt-1">Consultoria técnica direta na sua clínica para entender a operação de perto.</p>
      </div>
    </div>
  );
}
