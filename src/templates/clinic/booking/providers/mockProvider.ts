import type { BookingProvider, BookingResult } from '../../types';

/**
 * Demo provider — no network, no storage. Used by the portfolio `demo`
 * config so the live demo never writes real data.
 */
export const mockProvider: BookingProvider = {
  id: 'mock',
  async submitBooking(): Promise<BookingResult> {
    return { ok: true, message: '(demo) Solicitação recebida — em produção, a clínica recebe o lead.' };
  },
};
