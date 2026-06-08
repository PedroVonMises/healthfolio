import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// next/headers is server-only; stub it for the unit env.
vi.mock('next/headers', () => ({
  headers: async () => new Map<string, string>(),
}));

import { insertBookingLead } from '@/templates/clinic/booking/supabaseLeads';
import { submitBookingAction } from '@/app/actions/booking';
import type { BookingContext } from '@/templates/clinic/types';

const ctx: BookingContext = {
  clinicName: 'Clínica Vita Saúde',
  whatsapp: '5527999990000',
  specialtyName: 'Cardiologia',
  doctorName: 'Dra. Ana Ribeiro',
};

const validPayload = {
  clinicSlug: 'demo',
  specialtyId: 'cardiologia',
  doctorId: 'dra-ana-ribeiro',
  requestedAt: '2026-07-01T14:00',
  patientName: 'Maria Silva',
  patientPhone: '27999990000',
  consent: true as const,
};

describe('insertBookingLead', () => {
  const OLD_ENV = { ...process.env };
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    process.env = { ...OLD_ENV };
  });

  it('degrada (não persiste, não tenta) quando env do Supabase está ausente', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    const r = await insertBookingLead(validPayload);
    expect(r).toEqual({ persisted: false, attempted: false });
  });

  it('persiste quando o fetch retorna ok', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://x.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'svc';
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 201 })));
    const r = await insertBookingLead(validPayload);
    expect(r).toEqual({ persisted: true, attempted: true });
  });

  it('não persiste mas marca tentativa quando o fetch falha (lead não é perdido)', async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://x.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'svc';
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 500 })));
    const r = await insertBookingLead(validPayload);
    expect(r).toEqual({ persisted: false, attempted: true });
  });
});

describe('submitBookingAction', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });

  it('rejeita payload sem consentimento', async () => {
    const r = await submitBookingAction({ ...validPayload, consent: false }, ctx);
    expect(r.ok).toBe(false);
  });

  it('retorna a URL do WhatsApp mesmo sem backend (fallback)', async () => {
    const r = await submitBookingAction(validPayload, ctx);
    expect(r.ok).toBe(true);
    expect(r.whatsappUrl).toContain('wa.me/5527999990000');
    expect(decodeURIComponent(r.whatsappUrl!)).toContain('Maria Silva');
  });
});
