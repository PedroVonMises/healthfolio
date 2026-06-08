'use server';

import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { BookingPayloadSchema } from '@/templates/clinic/schema';
import { buildBookingSummary, buildWhatsappUrl } from '@/templates/clinic/booking/waUrl';
import { insertBookingLead } from '@/templates/clinic/booking/supabaseLeads';
import type { BookingResult } from '@/templates/clinic/types';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit: Ratelimit | null = null;
if (redisUrl && redisToken) {
  ratelimit = new Ratelimit({
    redis: new Redis({ url: redisUrl, token: redisToken }),
    limiter: Ratelimit.slidingWindow(5, '1 h'),
  });
}

/**
 * Context the funnel resolves from the clinic config and passes alongside the
 * payload so the server action can build a human-readable WhatsApp message
 * without re-loading the config.
 */
export interface BookingContext {
  clinicName: string;
  /** Destination WhatsApp number (E.164 digits). */
  whatsapp: string;
  specialtyName: string;
  doctorName: string;
}

/**
 * Production booking flow: validate → persist lead in Supabase → return a
 * prefilled `wa.me` URL.
 *
 * Fallback contract (never lose the lead): if the Supabase insert fails (or
 * env is absent), STILL return the WhatsApp URL so the patient can reach the
 * clinic. LGPD: PII is never logged.
 */
export async function submitBookingAction(
  payload: unknown,
  context: BookingContext,
): Promise<BookingResult> {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? 'anonymous';

    if (ratelimit) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return { ok: false, message: 'Muitas solicitações. Tente novamente mais tarde.' };
      }
    }

    const parsed = BookingPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0]?.message ?? 'Dados inválidos.';
      return { ok: false, message: first };
    }
    const data = parsed.data;

    // Persist the lead; degrade gracefully on any failure.
    const lead = await insertBookingLead(data);

    // Always build the WhatsApp handoff URL — the lead is never dropped.
    const summary = buildBookingSummary(data, {
      clinicName: context.clinicName,
      specialtyName: context.specialtyName,
      doctorName: context.doctorName,
    });
    const whatsappUrl = buildWhatsappUrl(context.whatsapp, summary);

    const message = lead.persisted
      ? 'Solicitação registrada! Abrindo o WhatsApp para confirmar com a clínica.'
      : 'Solicitação pronta! Abra o WhatsApp para enviar à clínica e confirmar.';

    return { ok: true, whatsappUrl, message };
  } catch {
    // Last-resort fallback: still hand off to WhatsApp if we have a number.
    if (context?.whatsapp) {
      return {
        ok: true,
        whatsappUrl: buildWhatsappUrl(context.whatsapp, `Olá, ${context.clinicName}! Gostaria de agendar uma consulta.`),
        message: 'Não foi possível registrar agora, mas você pode falar com a clínica pelo WhatsApp.',
      };
    }
    return { ok: false, message: 'Erro interno. Tente novamente.' };
  }
}
