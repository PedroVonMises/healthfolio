import { describe, it, expect } from 'vitest';
import { selectProvider } from '@/templates/clinic/booking/providers';
import { mockProvider } from '@/templates/clinic/booking/providers/mockProvider';
import { whatsappLeadProvider } from '@/templates/clinic/booking/providers/whatsappLeadProvider';

describe('selectProvider', () => {
  it('retorna o mockProvider para "mock"', () => {
    expect(selectProvider('mock')).toBe(mockProvider);
  });

  it('retorna o whatsappLeadProvider para "whatsappLead" (default de produção)', () => {
    expect(selectProvider('whatsappLead')).toBe(whatsappLeadProvider);
  });
});

describe('mockProvider', () => {
  it('não faz rede e retorna confirmação de demo', async () => {
    const r = await mockProvider.submitBooking({
      clinicSlug: 'demo',
      specialtyId: 'cardiologia',
      doctorId: 'dra-ana-ribeiro',
      requestedAt: '2026-07-01T14:00',
      patientName: 'Maria Silva',
      patientPhone: '27999990000',
      consent: true,
    });
    expect(r.ok).toBe(true);
    expect(r.message).toMatch(/demo/i);
  });
});
