import { describe, it, expect } from 'vitest';
import {
  bookingReducer,
  initialBookingState,
  STEPS,
  canAdvance,
  type BookingState,
} from '@/templates/clinic/booking/reducer';

describe('bookingReducer', () => {
  it('começa no passo specialty com estado vazio', () => {
    expect(initialBookingState.step).toBe('specialty');
    expect(initialBookingState.data.consent).toBe(false);
  });

  it('SELECT_SPECIALTY guarda a especialidade e limpa o médico', () => {
    const s = bookingReducer(
      { ...initialBookingState, data: { ...initialBookingState.data, doctorId: 'x' } },
      { type: 'SELECT_SPECIALTY', specialtyId: 'cardiologia' },
    );
    expect(s.data.specialtyId).toBe('cardiologia');
    expect(s.data.doctorId).toBeUndefined();
  });

  it('NEXT avança specialty → doctor quando pode avançar', () => {
    const s = bookingReducer(
      { ...initialBookingState, data: { ...initialBookingState.data, specialtyId: 'cardiologia' } },
      { type: 'NEXT' },
    );
    expect(s.step).toBe('doctor');
  });

  it('NEXT não avança se o passo atual não está completo', () => {
    const s = bookingReducer(initialBookingState, { type: 'NEXT' });
    expect(s.step).toBe('specialty');
  });

  it('BACK volta um passo sem perder dados', () => {
    const mid: BookingState = {
      step: 'details',
      data: { ...initialBookingState.data, specialtyId: 'c', doctorId: 'd', requestedAt: 'x' },
    };
    const s = bookingReducer(mid, { type: 'BACK' });
    expect(s.step).toBe('datetime');
    expect(s.data.specialtyId).toBe('c');
  });

  it('SET_CONSENT alterna o aceite', () => {
    const s = bookingReducer(initialBookingState, { type: 'SET_CONSENT', value: true });
    expect(s.data.consent).toBe(true);
  });

  it('RESET volta ao estado inicial', () => {
    const dirty: BookingState = { step: 'confirm', data: { ...initialBookingState.data, consent: true } };
    expect(bookingReducer(dirty, { type: 'RESET' })).toEqual(initialBookingState);
  });
});

describe('canAdvance — gating por passo', () => {
  it('specialty exige uma especialidade', () => {
    expect(canAdvance('specialty', initialBookingState.data)).toBe(false);
    expect(canAdvance('specialty', { ...initialBookingState.data, specialtyId: 'c' })).toBe(true);
  });

  it('details exige nome, telefone E consentimento (LGPD gate)', () => {
    const base = { ...initialBookingState.data, patientName: 'Maria Silva', patientPhone: '27999990000' };
    expect(canAdvance('details', { ...base, consent: false })).toBe(false);
    expect(canAdvance('details', { ...base, consent: true })).toBe(true);
  });

  it('details rejeita telefone com poucos dígitos', () => {
    expect(
      canAdvance('details', { ...initialBookingState.data, patientName: 'Maria Silva', patientPhone: '123', consent: true }),
    ).toBe(false);
  });
});

describe('STEPS', () => {
  it('tem a ordem canônica do funil', () => {
    expect(STEPS).toEqual(['specialty', 'doctor', 'datetime', 'details', 'confirm']);
  });
});
