import { describe, it, expect } from 'vitest';
import { computeOsmEmbedSrc } from '@/components/ui/LocalPresenceMap';

describe('computeOsmEmbedSrc', () => {
  it('usa o embed padrão da Grande Vitória quando lat/lng ausentes (back-compat)', () => {
    expect(computeOsmEmbedSrc()).toContain('bbox=-40.33,-20.34,-40.26,-20.28');
  });

  it('usa o embed padrão quando lat/lng são NaN', () => {
    expect(computeOsmEmbedSrc(NaN, NaN)).toContain('bbox=-40.33,-20.34,-40.26,-20.28');
  });

  it('computa um bbox centrado no ponto fornecido', () => {
    const src = computeOsmEmbedSrc(-20.301, -40.291, 0.03);
    // bbox = minLng,minLat,maxLng,maxLat
    expect(src).toContain('bbox=-40.3210,-20.3310,-40.2610,-20.2710');
  });

  it('inclui um marcador no ponto exato', () => {
    const src = computeOsmEmbedSrc(-20.301, -40.291);
    expect(src).toContain('marker=-20.301,-40.291');
  });
});
