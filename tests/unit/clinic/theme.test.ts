import { describe, it, expect } from 'vitest';
import { themeToCssVars } from '@/templates/clinic/theme';

describe('themeToCssVars', () => {
  it('mapeia primary para a variável do design system', () => {
    const vars = themeToCssVars({ primary: '#0E7C7B', accent: '#F4A259' }) as Record<string, string>;
    expect(vars['--color-primary']).toBe('#0E7C7B');
  });

  it('mapeia accent para --color-accent (não pode ser descartado)', () => {
    const vars = themeToCssVars({ primary: '#0E7C7B', accent: '#F4A259' }) as Record<string, string>;
    expect(vars['--color-accent']).toBe('#F4A259');
  });

  it('deriva hover/active mais escuros que o primary', () => {
    const vars = themeToCssVars({ primary: '#808080', accent: '#000000' }) as Record<string, string>;
    expect(vars['--color-primary-hover']).not.toBe('#808080');
    // round(0x80 * (1 - 0.12)) = round(112.64) = 113 = 0x71
    expect(vars['--color-primary-hover']).toBe('#717171');
  });

  it('aplica a fonte quando informada', () => {
    const vars = themeToCssVars({ primary: '#0E7C7B', accent: '#F4A259', font: 'Inter' }) as Record<string, string>;
    expect(vars['--font-display']).toContain('Inter');
  });

  it('expande hex curto (#abc) antes de escurecer', () => {
    const vars = themeToCssVars({ primary: '#fff', accent: '#000' }) as Record<string, string>;
    expect(vars['--color-primary-hover']).toMatch(/^#[0-9a-f]{6}$/);
  });
});
