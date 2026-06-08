import { describe, it, expect } from 'vitest';
import {
  ClinicConfigSchema,
  BookingPayloadSchema,
  parseClinicConfig,
} from '@/templates/clinic/schema';
import { demoClinic } from '@/config/clinics/demo.config';

describe('ClinicConfigSchema', () => {
  it('aceita o config de demonstração', () => {
    const r = ClinicConfigSchema.safeParse(demoClinic);
    expect(r.success).toBe(true);
  });

  it('rejeita whatsapp que não é E.164 só-dígitos', () => {
    const bad = { ...demoClinic, contact: { ...demoClinic.contact, whatsapp: '+55 27 9999' } };
    const r = ClinicConfigSchema.safeParse(bad);
    expect(r.success).toBe(false);
  });

  it('rejeita cor de tema fora do padrão hex', () => {
    const bad = {
      ...demoClinic,
      brand: { ...demoClinic.brand, theme: { ...demoClinic.brand.theme, primary: 'azul' } },
    };
    const r = ClinicConfigSchema.safeParse(bad);
    expect(r.success).toBe(false);
  });

  it('rejeita config sem nenhuma especialidade', () => {
    const bad = { ...demoClinic, specialties: [] };
    const r = ClinicConfigSchema.safeParse(bad);
    expect(r.success).toBe(false);
  });

  it('rejeita médico que referencia uma especialidade inexistente', () => {
    const bad = {
      ...demoClinic,
      doctors: [{ ...demoClinic.doctors[0], specialtyId: 'nao-existe' }],
    };
    const r = ClinicConfigSchema.safeParse(bad);
    expect(r.success).toBe(false);
  });

  it('rejeita geo com latitude inválida', () => {
    const bad = {
      ...demoClinic,
      contact: { ...demoClinic.contact, geo: { lat: 200, lng: -40 } },
    };
    const r = ClinicConfigSchema.safeParse(bad);
    expect(r.success).toBe(false);
  });
});

describe('parseClinicConfig (fail-fast)', () => {
  it('retorna o config válido', () => {
    expect(parseClinicConfig(demoClinic).slug).toBe(demoClinic.slug);
  });

  it('lança com mensagem clara em config inválido', () => {
    expect(() => parseClinicConfig({ slug: 'x' })).toThrowError(/ClinicConfig inválido/);
  });
});

describe('BookingPayloadSchema', () => {
  const valid = {
    clinicSlug: 'demo',
    specialtyId: 'cardiologia',
    doctorId: 'dr-ana',
    requestedAt: '2026-07-01T14:00',
    patientName: 'Maria Silva',
    patientPhone: '27999990000',
    consent: true,
  };

  it('aceita um payload completo com consentimento', () => {
    expect(BookingPayloadSchema.safeParse(valid).success).toBe(true);
  });

  it('rejeita consent=false (LGPD exige aceite explícito)', () => {
    const r = BookingPayloadSchema.safeParse({ ...valid, consent: false });
    expect(r.success).toBe(false);
  });

  it('rejeita nome do paciente muito curto', () => {
    const r = BookingPayloadSchema.safeParse({ ...valid, patientName: 'A' });
    expect(r.success).toBe(false);
  });
});
