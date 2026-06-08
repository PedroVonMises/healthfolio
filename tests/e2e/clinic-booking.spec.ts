import { test, expect, devices } from '@playwright/test';

/**
 * Demo clinic booking funnel — happy path on a mobile viewport, driven entirely
 * by the keyboard (WCAG AA). The demo config uses the mock provider, so no
 * external backend is needed and no real WhatsApp tab is opened.
 */
test.use({ ...devices['Pixel 5'] });

test('funil de agendamento — caminho feliz no mobile, navegação por teclado', async ({ page }) => {
  await page.goto('/demo/clinica');

  // H1 carries the headline; page title carries city + bairro (local SEO).
  await expect(page).toHaveTitle(/Vitória/i);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const funnel = page.getByRole('region', { name: 'Agendamento de consulta' });
  await expect(funnel).toBeVisible();

  // Step 1 — specialty (keyboard: focus the radio, select with Space).
  await funnel.getByRole('radio', { name: /Cardiologia/ }).focus();
  await page.keyboard.press('Space');
  await funnel.getByRole('button', { name: /Continuar/ }).click();

  // Step 2 — doctor.
  await expect(page.getByTestId('step-title')).toHaveText(/Médico/);
  await funnel.getByRole('radio', { name: /Dra\. Ana Ribeiro/ }).focus();
  await page.keyboard.press('Space');
  await funnel.getByRole('button', { name: /Continuar/ }).click();

  // Step 3 — datetime.
  await expect(page.getByTestId('step-title')).toHaveText(/Data e horário/);
  await page.getByLabel(/data e o horário/i).fill('2026-07-01T14:00');
  await funnel.getByRole('button', { name: /Continuar/ }).click();

  // Step 4 — details + LGPD consent gate.
  await expect(page.getByTestId('step-title')).toHaveText(/Seus dados/);
  await page.getByLabel(/Nome completo/).fill('Maria Silva');
  await page.getByLabel(/Telefone/).fill('27999990000');

  // Submit/advance must stay disabled until consent is checked.
  await expect(funnel.getByRole('button', { name: /Continuar/ })).toBeDisabled();
  await page.getByRole('checkbox').check();
  await expect(funnel.getByRole('button', { name: /Continuar/ })).toBeEnabled();
  await funnel.getByRole('button', { name: /Continuar/ }).click();

  // Step 5 — confirm + submit (mock provider).
  await expect(page.getByTestId('confirm-summary')).toBeVisible();
  await page.getByTestId('booking-submit').click();

  // Confirmation screen.
  await expect(page.getByRole('status')).toContainText(/Solicitação enviada/);
});
