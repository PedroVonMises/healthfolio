'use client';

import React, { useMemo, useReducer, useState } from 'react';
import { ChevronLeft, ChevronRight, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  bookingReducer,
  initialBookingState,
  canAdvance,
  STEPS,
  type Step,
} from './reducer';
import { BookingPayloadSchema } from '../schema';
import type { BookingProvider, BookingResult, ClinicConfig } from '../types';

interface BookingFunnelProps {
  config: ClinicConfig;
  provider: BookingProvider;
  /** Override for tests — defaults to `window.open`. */
  onOpenWhatsapp?: (url: string) => void;
}

const STEP_LABELS: Record<Step, string> = {
  specialty: 'Especialidade',
  doctor: 'Médico(a)',
  datetime: 'Data e horário',
  details: 'Seus dados',
  confirm: 'Confirmação',
};

const onlyDigits = (s: string) => s.replace(/\D/g, '');

export function BookingFunnel({ config, provider, onOpenWhatsapp }: BookingFunnelProps) {
  const [state, dispatch] = useReducer(bookingReducer, initialBookingState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { step, data } = state;
  const stepIndex = STEPS.indexOf(step);

  const doctorsForSpecialty = useMemo(
    () => config.doctors.filter((d) => d.specialtyId === data.specialtyId),
    [config.doctors, data.specialtyId],
  );

  const selectedSpecialty = config.specialties.find((s) => s.id === data.specialtyId);
  const selectedDoctor = config.doctors.find((d) => d.id === data.doctorId);

  const advanceEnabled = canAdvance(step, data);

  async function handleSubmit() {
    setError(null);
    const payload = {
      clinicSlug: config.slug,
      specialtyId: data.specialtyId,
      doctorId: data.doctorId,
      requestedAt: data.requestedAt,
      patientName: data.patientName,
      patientPhone: data.patientPhone ? onlyDigits(data.patientPhone) : undefined,
      consent: data.consent,
    };
    const parsed = BookingPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Verifique os dados informados.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await provider.submitBooking(parsed.data);
      setResult(res);
      if (res.ok && res.whatsappUrl) {
        (onOpenWhatsapp ?? ((url: string) => window.open(url, '_blank', 'noopener,noreferrer')))(
          res.whatsappUrl,
        );
      }
    } catch {
      setError('Não foi possível enviar agora. Tente novamente em instantes.');
    } finally {
      setSubmitting(false);
    }
  }

  /* ------------------------ confirmation screen ------------------------ */
  if (result?.ok) {
    return (
      <div
        className="rounded-xl border border-border bg-surface p-6 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="font-display text-xl font-bold text-text">Solicitação enviada</h3>
        <p className="mt-2 text-sm text-text-muted">{result.message}</p>
        {result.whatsappUrl && (
          <a
            href={result.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-5 text-base font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Abrir conversa no WhatsApp
          </a>
        )}
        <button
          type="button"
          onClick={() => {
            dispatch({ type: 'RESET' });
            setResult(null);
          }}
          className="mt-4 block w-full text-sm font-medium text-text-muted underline-offset-2 hover:underline"
        >
          Fazer outra solicitação
        </button>
      </div>
    );
  }

  return (
    <section aria-label="Agendamento de consulta" className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      {/* Progress */}
      <ol className="mb-6 flex items-center gap-1.5" aria-label="Etapas do agendamento">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= stepIndex ? 'bg-primary' : 'bg-surface-2'
            }`}
            aria-current={s === step ? 'step' : undefined}
          >
            <span className="sr-only">
              {STEP_LABELS[s]} {i < stepIndex ? '(concluída)' : s === step ? '(atual)' : ''}
            </span>
          </li>
        ))}
      </ol>

      <h3 className="font-display text-lg font-bold text-text" data-testid="step-title">
        {STEP_LABELS[step]}
      </h3>

      <div className="mt-4 min-h-[200px]">
        {/* Step: specialty */}
        {step === 'specialty' && (
          <fieldset>
            <legend className="mb-3 text-sm text-text-muted">Escolha a especialidade desejada.</legend>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {config.specialties.map((s) => (
                <label
                  key={s.id}
                  className={`flex cursor-pointer flex-col rounded-lg border p-3 transition-colors ${
                    data.specialtyId === s.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-surface-2'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="specialty"
                      value={s.id}
                      checked={data.specialtyId === s.id}
                      onChange={() => dispatch({ type: 'SELECT_SPECIALTY', specialtyId: s.id })}
                      className="accent-[var(--color-primary)]"
                    />
                    <span className="font-medium text-text">{s.name}</span>
                  </span>
                  {s.description && <span className="mt-1 text-xs text-text-muted">{s.description}</span>}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* Step: doctor */}
        {step === 'doctor' && (
          <fieldset>
            <legend className="mb-3 text-sm text-text-muted">
              Profissionais de {selectedSpecialty?.name ?? 'sua especialidade'}.
            </legend>
            <div className="grid grid-cols-1 gap-2">
              {doctorsForSpecialty.map((d) => (
                <label
                  key={d.id}
                  className={`flex cursor-pointer flex-col rounded-lg border p-3 transition-colors ${
                    data.doctorId === d.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-surface-2'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="doctor"
                      value={d.id}
                      checked={data.doctorId === d.id}
                      onChange={() => dispatch({ type: 'SELECT_DOCTOR', doctorId: d.id })}
                      className="accent-[var(--color-primary)]"
                    />
                    <span className="font-medium text-text">{d.name}</span>
                    <span className="text-xs text-text-faint">{d.crm}</span>
                  </span>
                  {d.bio && <span className="mt-1 text-xs text-text-muted">{d.bio}</span>}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* Step: datetime */}
        {step === 'datetime' && (
          <div>
            <label htmlFor="requestedAt" className="mb-2 block text-sm text-text-muted">
              Informe a data e o horário desejados. A clínica confirmará a disponibilidade pelo WhatsApp.
            </label>
            <input
              id="requestedAt"
              type="datetime-local"
              value={data.requestedAt ?? ''}
              onChange={(e) => dispatch({ type: 'SET_DATETIME', requestedAt: e.target.value })}
              className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            />
          </div>
        )}

        {/* Step: details */}
        {step === 'details' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="patientName" className="mb-1.5 block text-sm font-medium text-text">
                Nome completo
              </label>
              <input
                id="patientName"
                type="text"
                autoComplete="name"
                value={data.patientName ?? ''}
                onChange={(e) => dispatch({ type: 'SET_PATIENT', patientName: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              />
            </div>
            <div>
              <label htmlFor="patientPhone" className="mb-1.5 block text-sm font-medium text-text">
                Telefone (com DDD)
              </label>
              <input
                id="patientPhone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="27999990000"
                value={data.patientPhone ?? ''}
                onChange={(e) => dispatch({ type: 'SET_PATIENT', patientPhone: e.target.value })}
                className="w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
              />
            </div>
            <label className="flex items-start gap-2.5 text-sm text-text-muted">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => dispatch({ type: 'SET_CONSENT', value: e.target.checked })}
                className="mt-0.5 accent-[var(--color-primary)]"
                aria-describedby="consent-text"
              />
              <span id="consent-text">
                {config.compliance.lgpdConsentText}{' '}
                <a
                  href={config.compliance.privacyPolicyHref}
                  className="text-primary underline-offset-2 hover:underline"
                >
                  Política de Privacidade
                </a>
                .
              </span>
            </label>
          </div>
        )}

        {/* Step: confirm */}
        {step === 'confirm' && (
          <dl className="space-y-2 text-sm" data-testid="confirm-summary">
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Especialidade</dt>
              <dd className="font-medium text-text">{selectedSpecialty?.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Médico(a)</dt>
              <dd className="font-medium text-text">{selectedDoctor?.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Data/horário</dt>
              <dd className="font-medium text-text">{data.requestedAt}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-muted">Paciente</dt>
              <dd className="font-medium text-text">{data.patientName}</dd>
            </div>
          </dl>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-primary">
          {error}
        </p>
      )}

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => dispatch({ type: 'BACK' })}
          disabled={stepIndex === 0}
          className="inline-flex h-11 items-center gap-1 rounded-full px-4 text-sm font-medium text-text-muted transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Voltar
        </button>

        {step !== 'confirm' ? (
          <Button
            type="button"
            onClick={() => dispatch({ type: 'NEXT' })}
            disabled={!advanceEnabled}
            aria-disabled={!advanceEnabled}
          >
            Continuar
            <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!data.consent || submitting}
            aria-disabled={!data.consent || submitting}
            data-testid="booking-submit"
          >
            {submitting ? 'Enviando…' : config.content.hero.ctaLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
