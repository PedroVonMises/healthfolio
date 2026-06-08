import type { BookingPayload } from '../types';

/**
 * Minimal, dependency-free Supabase REST insert for booking leads.
 *
 * We hit the PostgREST endpoint (`/rest/v1/<table>`) directly with `fetch`
 * instead of pulling in `@supabase/supabase-js` — zero new dependencies, fully
 * mockable in tests, and the template still runs with no backend configured.
 *
 * LGPD: the row is the minimum needed to honor a booking request + the
 * explicit consent record. No PII is ever logged.
 */
export interface LeadInsertResult {
  /** `true` if the row was persisted; `false` means we degraded (env absent or insert failed). */
  persisted: boolean;
  /** `true` only when Supabase env vars were present (i.e. an insert was attempted). */
  attempted: boolean;
}

const TABLE = 'booking_leads';

export async function insertBookingLead(payload: BookingPayload): Promise<LeadInsertResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // Degrade to WhatsApp-only — the template runs with zero backend config.
    console.warn('[booking] Supabase env ausente — degradando para WhatsApp-only.');
    return { persisted: false, attempted: false };
  }

  const now = new Date().toISOString();
  const row = {
    clinic_slug: payload.clinicSlug,
    specialty: payload.specialtyId,
    doctor: payload.doctorId,
    requested_at: payload.requestedAt,
    patient_name: payload.patientName,
    patient_phone: payload.patientPhone,
    consent: true,
    consent_at: now,
    created_at: now,
  };

  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${TABLE}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      // Never lose the lead: log status only (no PII) and let the caller fall back to WhatsApp.
      console.error(`[booking] Falha ao inserir lead no Supabase (status ${res.status}).`);
      return { persisted: false, attempted: true };
    }
    return { persisted: true, attempted: true };
  } catch (err) {
    console.error('[booking] Erro de rede ao inserir lead no Supabase.', err instanceof Error ? err.message : '');
    return { persisted: false, attempted: true };
  }
}
