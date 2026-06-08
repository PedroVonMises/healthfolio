/* ------------------------------------------------------------------ */
/* Pure, unit-testable funnel state machine                            */
/* ------------------------------------------------------------------ */

export const STEPS = ['specialty', 'doctor', 'datetime', 'details', 'confirm'] as const;
export type Step = (typeof STEPS)[number];

/** Partial booking form data accumulated across steps. */
export interface BookingFormData {
  specialtyId?: string;
  doctorId?: string;
  requestedAt?: string;
  patientName?: string;
  patientPhone?: string;
  consent: boolean;
}

export interface BookingState {
  step: Step;
  data: BookingFormData;
}

export type BookingAction =
  | { type: 'SELECT_SPECIALTY'; specialtyId: string }
  | { type: 'SELECT_DOCTOR'; doctorId: string }
  | { type: 'SET_DATETIME'; requestedAt: string }
  | { type: 'SET_PATIENT'; patientName?: string; patientPhone?: string }
  | { type: 'SET_CONSENT'; value: boolean }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'GOTO'; step: Step }
  | { type: 'RESET' };

export const initialBookingState: BookingState = {
  step: 'specialty',
  data: { consent: false },
};

const phoneDigits = (p?: string) => (p ?? '').replace(/\D/g, '');

/** Whether the funnel may leave `step` given the current data. */
export function canAdvance(step: Step, data: BookingFormData): boolean {
  switch (step) {
    case 'specialty':
      return Boolean(data.specialtyId);
    case 'doctor':
      return Boolean(data.doctorId);
    case 'datetime':
      return Boolean(data.requestedAt);
    case 'details':
      return (
        (data.patientName?.trim().length ?? 0) >= 2 &&
        phoneDigits(data.patientPhone).length >= 10 &&
        data.consent === true
      );
    case 'confirm':
      return true;
    default:
      return false;
  }
}

function stepIndex(step: Step): number {
  return STEPS.indexOf(step);
}

export function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SELECT_SPECIALTY':
      // Changing specialty invalidates any previously chosen doctor.
      return { ...state, data: { ...state.data, specialtyId: action.specialtyId, doctorId: undefined } };
    case 'SELECT_DOCTOR':
      return { ...state, data: { ...state.data, doctorId: action.doctorId } };
    case 'SET_DATETIME':
      return { ...state, data: { ...state.data, requestedAt: action.requestedAt } };
    case 'SET_PATIENT':
      return {
        ...state,
        data: {
          ...state.data,
          ...(action.patientName !== undefined ? { patientName: action.patientName } : {}),
          ...(action.patientPhone !== undefined ? { patientPhone: action.patientPhone } : {}),
        },
      };
    case 'SET_CONSENT':
      return { ...state, data: { ...state.data, consent: action.value } };
    case 'NEXT': {
      if (!canAdvance(state.step, state.data)) return state;
      const next = STEPS[Math.min(stepIndex(state.step) + 1, STEPS.length - 1)];
      return { ...state, step: next };
    }
    case 'BACK': {
      const prev = STEPS[Math.max(stepIndex(state.step) - 1, 0)];
      return { ...state, step: prev };
    }
    case 'GOTO':
      return { ...state, step: action.step };
    case 'RESET':
      return initialBookingState;
    default:
      return state;
  }
}
