import type { z } from 'zod';
import type { ClinicConfigSchema, BookingPayloadSchema } from './schema';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

/**
 * Per-clinic configuration. Validated by {@link ClinicConfigSchema} at
 * render/build time — a malformed config throws (fail fast) rather than
 * rendering a half-configured clinic.
 */
export type ClinicConfig = z.infer<typeof ClinicConfigSchema>;

export type ClinicTheme = ClinicConfig['brand']['theme'];
export type ClinicSpecialty = ClinicConfig['specialties'][number];
export type ClinicDoctor = ClinicConfig['doctors'][number];

/* ------------------------------------------------------------------ */
/* Booking                                                             */
/* ------------------------------------------------------------------ */

/** Payload submitted by the funnel to a {@link BookingProvider}. */
export type BookingPayload = z.infer<typeof BookingPayloadSchema>;

/** Result returned by every provider. */
export interface BookingResult {
  ok: boolean;
  /** Prefilled `wa.me` link the client should open in a new tab. */
  whatsappUrl?: string;
  /** PT-BR user-facing message. */
  message: string;
}

/** Optional availability slot — unused by MVP providers, reserved for EMR/calendar adapters. */
export interface Slot {
  start: string;
  end: string;
}

/**
 * Resolved, human-readable context for a single booking submission. Built by
 * the funnel from the CURRENT reducer selection (not frozen at mount), so the
 * WhatsApp handoff message names exactly what the patient chose.
 */
export interface BookingContext {
  clinicName: string;
  /** Destination WhatsApp number (E.164 digits). */
  whatsapp: string;
  specialtyName: string;
  doctorName: string;
}

/**
 * Pluggable booking backend. The funnel only knows this interface, so a
 * clinic can be re-pointed at WhatsApp, a mock, or (future) an EMR/calendar
 * adapter purely via config.
 */
export interface BookingProvider {
  id: string;
  /** Optional — reserved for real-time availability (EMR/calendar upsell). */
  getAvailability?(doctorId: string, dateRange: { from: string; to: string }): Promise<Slot[]>;
  /**
   * @param payload validated booking data (ids only, no display labels).
   * @param context current display labels + destination, resolved per submit.
   */
  submitBooking(payload: BookingPayload, context?: BookingContext): Promise<BookingResult>;
}
