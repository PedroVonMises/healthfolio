import type { BookingPayload } from '../types';

interface SummaryLabels {
  clinicName: string;
  specialtyName: string;
  doctorName: string;
}

/** Pretty-print the requested datetime for a human-readable WhatsApp message. */
function formatRequestedAt(requestedAt: string): string {
  const d = new Date(requestedAt);
  if (Number.isNaN(d.getTime())) return requestedAt;
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Build the PT-BR booking-request summary sent as the prefilled WhatsApp text. */
export function buildBookingSummary(payload: BookingPayload, labels: SummaryLabels): string {
  return [
    `Olá, ${labels.clinicName}! Gostaria de solicitar um agendamento:`,
    ``,
    `• Especialidade: ${labels.specialtyName}`,
    `• Médico(a): ${labels.doctorName}`,
    `• Data/horário desejado: ${formatRequestedAt(payload.requestedAt)}`,
    `• Nome: ${payload.patientName}`,
    `• Telefone: ${payload.patientPhone}`,
    ``,
    `(Solicitação enviada pelo site — aguardo confirmação.)`,
  ].join('\n');
}

/**
 * Build a `wa.me` deep link. The phone is sanitized to E.164 digits-only and
 * the text is URL-encoded.
 */
export function buildWhatsappUrl(whatsapp: string, text: string): string {
  const digits = whatsapp.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
