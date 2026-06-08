import type { BookingProvider, BookingResult } from '../../types';
import { submitBookingAction } from '@/app/actions/booking';

/**
 * Production default. Delegates to the `submitBookingAction` server action,
 * which validates, persists the lead in Supabase, and returns a prefilled
 * `wa.me` URL (with WhatsApp-only fallback if persistence fails).
 *
 * The booking context (clinic NAP + the patient's CURRENT specialty/doctor
 * selection) is resolved by the funnel per submit and forwarded here — never
 * frozen at mount — so the WhatsApp message names exactly what was chosen.
 */
export const whatsappLeadProvider: BookingProvider = {
  id: 'whatsappLead',
  async submitBooking(payload, context): Promise<BookingResult> {
    if (!context) {
      return { ok: false, message: 'Contexto da clínica ausente.' };
    }
    return submitBookingAction(payload, context);
  },
};
