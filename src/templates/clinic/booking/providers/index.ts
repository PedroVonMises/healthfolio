import type { BookingProvider } from '../../types';
import { mockProvider } from './mockProvider';
import { whatsappLeadProvider } from './whatsappLeadProvider';

export type ProviderId = 'whatsappLead' | 'mock';

/**
 * Map a config `booking.provider` id to a provider implementation.
 *
 * NOTE: `whatsappLead` returned here is the static selection reference. The
 * funnel binds the real, context-aware instance via
 * {@link import('./whatsappLeadProvider').createWhatsappLeadProvider}.
 */
export function selectProvider(id: ProviderId): BookingProvider {
  switch (id) {
    case 'mock':
      return mockProvider;
    case 'whatsappLead':
      return whatsappLeadProvider;
    default:
      // Exhaustiveness guard — unknown provider degrades to mock (no network).
      return mockProvider;
  }
}

export { mockProvider } from './mockProvider';
export { whatsappLeadProvider, createWhatsappLeadProvider } from './whatsappLeadProvider';

/* ------------------------------------------------------------------ */
/* Extension point (YAGNI — offer-#1 upsell, NOT implemented here)     */
/* ------------------------------------------------------------------ */

// TODO: per-client adapter — implement BookingProvider for real-time scheduling.
// e.g. googleCalendarProvider, iClinicProvider, feegowProvider. These would
// implement `getAvailability()` against the clinic's EMR/calendar and turn the
// date/time *request* into a confirmed slot. Intentionally a stub: see
// docs spec §3 "Stubbed, NOT built".
