import type { CSSProperties } from 'react';
import type { ClinicTheme } from './types';

/** Darken a hex color by `amount` (0–1) for hover/active states. */
function darken(hex: string, amount: number): string {
  const full = hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;
  const n = parseInt(full.slice(1), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.round(((n >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.round((n & 0xff) * (1 - amount)));
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Map a clinic config `theme` block to design-system CSS variables, applied at
 * the template root via inline `style` so a clinic rebrands without touching
 * component code. Variables match `src/app/globals.css` tokens.
 */
export function themeToCssVars(theme: ClinicTheme): CSSProperties {
  const vars: Record<string, string> = {
    '--color-primary': theme.primary,
    '--color-primary-hover': darken(theme.primary, 0.12),
    '--color-primary-active': darken(theme.primary, 0.24),
    '--color-accent': theme.accent,
  };
  if (theme.font) {
    vars['--font-display'] = `${theme.font}, var(--font-display)`;
  }
  // CSSProperties doesn't type custom properties; cast is the standard escape hatch.
  return vars as CSSProperties;
}
