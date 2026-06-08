import { describe, it, expect, vi, beforeEach } from 'vitest';

// The provider delegates to the server action; mock it so we exercise the
// provider's own logic (context guard + delegation) without a network/Supabase.
vi.mock('@/app/actions/booking', () => ({
  submitBookingAction: vi.fn(async () => ({
    ok: true,
    whatsappUrl: 'https://wa.me/5527999999999?text=ok',
    message: 'Solicitação registrada.',
  })),
}));

import {
  whatsappLeadProvider,
  selectProvider,
  mockProvider,
} from '@/templates/clinic/booking/providers';
import { submitBookingAction } from '@/app/actions/booking';

const payload = {
  specialtyId: 'cardio',
  doctorId: 'dr-a',
  date: '2026-06-10',
  time: '09:00',
  patientName: 'Fulano de Tal',
  patientPhone: '27999999999',
  consent: true,
} as const;

const context = {
  clinicName: 'Clínica Vita Saúde',
  clinicWhatsapp: '5527999999999',
  specialtyName: 'Cardiologia',
  doctorName: 'Dra. Ana Ribeiro',
} as const;

describe('whatsappLeadProvider', () => {
  beforeEach(() => vi.clearAllMocks());

  it('delegates to submitBookingAction when context is present', async () => {
    const result = await whatsappLeadProvider.submitBooking(payload as never, context as never);
    expect(submitBookingAction).toHaveBeenCalledWith(payload, context);
    expect(result.ok).toBe(true);
    expect(result.whatsappUrl).toContain('wa.me');
  });

  it('returns an error and never calls the action when context is missing', async () => {
    const result = await whatsappLeadProvider.submitBooking(payload as never, undefined);
    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/clínica/i);
    expect(submitBookingAction).not.toHaveBeenCalled();
  });

  it('exposes the stable provider id', () => {
    expect(whatsappLeadProvider.id).toBe('whatsappLead');
  });
});

describe('selectProvider', () => {
  it('maps known ids to their implementations', () => {
    expect(selectProvider('whatsappLead')).toBe(whatsappLeadProvider);
    expect(selectProvider('mock')).toBe(mockProvider);
  });

  it('degrades an unknown id to the mock provider (exhaustiveness guard)', () => {
    expect(selectProvider('unknown' as never)).toBe(mockProvider);
  });
});
