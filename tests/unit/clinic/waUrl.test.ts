import { describe, it, expect } from 'vitest';
import { buildWhatsappUrl, buildBookingSummary } from '@/templates/clinic/booking/waUrl';

describe('buildBookingSummary', () => {
  it('monta um resumo PT-BR legível com todos os campos', () => {
    const summary = buildBookingSummary(
      {
        clinicSlug: 'demo',
        specialtyId: 'cardiologia',
        doctorId: 'dra-ana-ribeiro',
        requestedAt: '2026-07-01T14:00',
        patientName: 'Maria Silva',
        patientPhone: '27999990000',
        consent: true,
      },
      { specialtyName: 'Cardiologia', doctorName: 'Dra. Ana Ribeiro', clinicName: 'Clínica Vita Saúde' },
    );
    expect(summary).toContain('Clínica Vita Saúde');
    expect(summary).toContain('Cardiologia');
    expect(summary).toContain('Dra. Ana Ribeiro');
    expect(summary).toContain('Maria Silva');
  });
});

describe('buildWhatsappUrl', () => {
  it('usa o número E.164 só-dígitos no host wa.me', () => {
    const url = buildWhatsappUrl('5527999990000', 'Olá');
    expect(url.startsWith('https://wa.me/5527999990000?text=')).toBe(true);
  });

  it('faz URL-encode do texto (espaços e acentos)', () => {
    const url = buildWhatsappUrl('5527999990000', 'Olá, consulta às 14h');
    expect(url).not.toContain(' ');
    expect(url).toContain('Ol%C3%A1');
    expect(decodeURIComponent(url.split('text=')[1])).toBe('Olá, consulta às 14h');
  });

  it('remove qualquer caractere não-dígito do número (sanitização E.164)', () => {
    const url = buildWhatsappUrl('+55 (27) 99999-0000', 'x');
    expect(url).toContain('wa.me/5527999990000');
  });
});
