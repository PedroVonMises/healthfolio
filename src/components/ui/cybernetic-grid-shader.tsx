"use client";

import React from 'react';

interface CyberneticGridShaderProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CSS-only animated grid background.
 * Replaces the previous Three.js WebGL implementation to save ~200KB+ in bundle size.
 * Respects prefers-reduced-motion via CSS media query.
 */
const CyberneticGridShader: React.FC<CyberneticGridShaderProps> = ({
  className = "shader-container",
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Base grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color, oklch(0.3 0.01 0 / 0.15)) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color, oklch(0.3 0.01 0 / 0.15)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)',
        }}
      />

      {/* Animated pulse overlay — subtle energy moving across the grid */}
      <div
        className="absolute inset-0 animate-grid-pulse"
        style={{
          background: `
            radial-gradient(
              ellipse 400px 400px at var(--pulse-x, 30%) var(--pulse-y, 40%),
              var(--color-primary, #C8102E) 0%,
              transparent 70%
            )
          `,
          opacity: 0.06,
          mixBlendMode: 'screen',
        }}
      />

      {/* Secondary slower pulse */}
      <div
        className="absolute inset-0 animate-grid-pulse-slow"
        style={{
          background: `
            radial-gradient(
              ellipse 300px 300px at var(--pulse2-x, 70%) var(--pulse2-y, 60%),
              var(--color-primary, #C8102E) 0%,
              transparent 60%
            )
          `,
          opacity: 0.04,
          mixBlendMode: 'screen',
        }}
      />

      <style jsx>{`
        @keyframes grid-pulse {
          0% { --pulse-x: 20%; --pulse-y: 30%; }
          25% { --pulse-x: 60%; --pulse-y: 20%; }
          50% { --pulse-x: 80%; --pulse-y: 60%; }
          75% { --pulse-x: 40%; --pulse-y: 70%; }
          100% { --pulse-x: 20%; --pulse-y: 30%; }
        }
        @keyframes grid-pulse-slow {
          0% { --pulse2-x: 80%; --pulse2-y: 70%; }
          33% { --pulse2-x: 30%; --pulse2-y: 40%; }
          66% { --pulse2-x: 60%; --pulse2-y: 20%; }
          100% { --pulse2-x: 80%; --pulse2-y: 70%; }
        }
        .animate-grid-pulse {
          animation: grid-pulse 12s ease-in-out infinite;
        }
        .animate-grid-pulse-slow {
          animation: grid-pulse-slow 18s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-grid-pulse,
          .animate-grid-pulse-slow {
            animation: none;
          }
        }

        :root[data-theme="dark"] .shader-container,
        :root:not([data-theme="light"]) .shader-container {
          --grid-color: oklch(0.7 0.01 0 / 0.08);
        }
      `}</style>
    </div>
  );
};

export default CyberneticGridShader;
