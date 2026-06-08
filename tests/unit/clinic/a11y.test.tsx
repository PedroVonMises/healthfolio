import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect, it, describe } from 'vitest';
import React from 'react';
import { BookingFunnel } from '@/templates/clinic/booking/BookingFunnel';
import { demoClinic } from '@/config/clinics/demo.config';
import { mockProvider } from '@/templates/clinic/booking/providers/mockProvider';

expect.extend(toHaveNoViolations);

describe('Acessibilidade (WCAG AA) — clinic template', () => {
  it('BookingFunnel não tem violações no primeiro passo', async () => {
    const { container } = render(<BookingFunnel config={demoClinic} provider={mockProvider} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // NOTE: full-page ClinicSite axe is covered by the Playwright E2E instead —
  // jsdom + axe-core cannot analyze the OpenStreetMap <iframe> in LocalPresenceMap
  // ("Respondable target must be a frame in the current window").
});
