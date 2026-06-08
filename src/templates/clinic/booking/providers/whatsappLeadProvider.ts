import type { BookingProvider, BookingResult } from '../../types';
import { submitBookingAction, type BookingContext } from '@/app/actions/booking';

/**
 * Production default. Delegates to the `submitBookingAction` server action,
 * which validates, persists the lead in Supabase, and returns a prefilled
 * `wa.me` URL (with WhatsApp-only fallback if persistence fails).
 *
 * The provider is constructed per render with the clinic's {@link BookingContext}
 * (resolved from config) so PII handling stays on the server.
 */
export function createWhatsappLeadProvider(getContext: () => BookingContext): BookingProvider {
  return {
    id: 'whatsappLead',
    async submitBooking(payload): Promise<BookingResult> {
      return submitBookingAction(payload, getContext());
    },
  };
}

/**
 * Static reference used for provider *selection* (the funnel resolves the
 * real, context-bound instance via {@link createWhatsappLeadProvider}). Calling
 * `submitBooking` here would need a context, so it is not invoked directly.
 */
export const whatsappLeadProvider: BookingProvider = {
  id: 'whatsappLead',
  async submitBooking(): Promise<BookingResult> {
    return {
      ok: false,
      message: 'Provider não inicializado com o contexto da clínica.',
    };
  },
};
