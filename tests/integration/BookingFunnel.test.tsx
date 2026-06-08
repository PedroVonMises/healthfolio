import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingFunnel } from '@/templates/clinic/booking/BookingFunnel';
import { demoClinic } from '@/config/clinics/demo.config';
import type { BookingProvider } from '@/templates/clinic/types';

function makeProvider(overrides?: Partial<BookingProvider>): BookingProvider {
  return {
    id: 'test',
    submitBooking: vi.fn(async () => ({
      ok: true,
      whatsappUrl: 'https://wa.me/5527999990000?text=oi',
      message: 'ok',
    })),
    ...overrides,
  };
}

async function advanceToDetails() {
  // specialty
  fireEvent.click(screen.getByLabelText(/Cardiologia/));
  fireEvent.click(screen.getByRole('button', { name: /Continuar/ }));
  // doctor
  fireEvent.click(await screen.findByLabelText(/Dra\. Ana Ribeiro/));
  fireEvent.click(screen.getByRole('button', { name: /Continuar/ }));
  // datetime
  const dt = await screen.findByLabelText(/data e o horário/i);
  fireEvent.change(dt, { target: { value: '2026-07-01T14:00' } });
  fireEvent.click(screen.getByRole('button', { name: /Continuar/ }));
}

describe('BookingFunnel', () => {
  it('renderiza o primeiro passo (especialidade)', () => {
    render(<BookingFunnel config={demoClinic} provider={makeProvider()} />);
    expect(screen.getByTestId('step-title')).toHaveTextContent('Especialidade');
    expect(screen.getByLabelText(/Cardiologia/)).toBeInTheDocument();
  });

  it('não avança enquanto nenhuma especialidade está selecionada', () => {
    render(<BookingFunnel config={demoClinic} provider={makeProvider()} />);
    expect(screen.getByRole('button', { name: /Continuar/ })).toBeDisabled();
  });

  it('filtra médicos pela especialidade escolhida', async () => {
    render(<BookingFunnel config={demoClinic} provider={makeProvider()} />);
    fireEvent.click(screen.getByLabelText(/Cardiologia/));
    fireEvent.click(screen.getByRole('button', { name: /Continuar/ }));
    expect(await screen.findByLabelText(/Dra\. Ana Ribeiro/)).toBeInTheDocument();
    // dermatologist must not appear under cardiologia
    expect(screen.queryByLabelText(/Dr\. Bruno Costa/)).not.toBeInTheDocument();
  });

  it('mantém o submit DESABILITADO até o consentimento LGPD ser marcado', async () => {
    render(<BookingFunnel config={demoClinic} provider={makeProvider()} />);
    await advanceToDetails();
    fireEvent.change(screen.getByLabelText(/Nome completo/), { target: { value: 'Maria Silva' } });
    fireEvent.change(screen.getByLabelText(/Telefone/), { target: { value: '27999990000' } });
    // consent not checked yet → cannot advance to confirm
    expect(screen.getByRole('button', { name: /Continuar/ })).toBeDisabled();
    // check consent → can advance
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('button', { name: /Continuar/ })).toBeEnabled();
  });

  it('envia e mostra confirmação + link do WhatsApp no caminho feliz', async () => {
    const onOpenWhatsapp = vi.fn();
    const provider = makeProvider();
    render(<BookingFunnel config={demoClinic} provider={provider} onOpenWhatsapp={onOpenWhatsapp} />);
    await advanceToDetails();
    fireEvent.change(screen.getByLabelText(/Nome completo/), { target: { value: 'Maria Silva' } });
    fireEvent.change(screen.getByLabelText(/Telefone/), { target: { value: '27999990000' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /Continuar/ })); // → confirm
    fireEvent.click(await screen.findByTestId('booking-submit'));

    await waitFor(() => expect(provider.submitBooking).toHaveBeenCalledTimes(1));
    expect(onOpenWhatsapp).toHaveBeenCalledWith('https://wa.me/5527999990000?text=oi');
    expect(await screen.findByText(/Abrir conversa no WhatsApp/)).toBeInTheDocument();
  });

  it('caminho de fallback: provider falha → ainda surge o link do WhatsApp', async () => {
    const provider = makeProvider({
      submitBooking: vi.fn(async () => ({
        ok: true,
        whatsappUrl: 'https://wa.me/5527999990000?text=fallback',
        message: 'Solicitação pronta! Abra o WhatsApp.',
      })),
    });
    render(<BookingFunnel config={demoClinic} provider={provider} onOpenWhatsapp={() => {}} />);
    await advanceToDetails();
    fireEvent.change(screen.getByLabelText(/Nome completo/), { target: { value: 'Maria Silva' } });
    fireEvent.change(screen.getByLabelText(/Telefone/), { target: { value: '27999990000' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /Continuar/ }));
    fireEvent.click(await screen.findByTestId('booking-submit'));

    const link = await screen.findByRole('link', { name: /Abrir conversa no WhatsApp/ });
    expect(link).toHaveAttribute('href', 'https://wa.me/5527999990000?text=fallback');
  });
});
