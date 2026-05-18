import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Contact from '@/components/sections/Contact';

describe('Contact section', () => {
  it('renders all form fields and submit button', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Seu nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail profissional/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Clínica \/ Especialidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/O que está travando sua clínica\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Quero uma análise gratuita/i })).toBeInTheDocument();
  });

  it('handles successful form submission', async () => {
    const mockFetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/Seu nome/i), { target: { value: 'Dr. John Doe' } });
    fireEvent.change(screen.getByLabelText(/E-mail profissional/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/O que está travando sua clínica\?/i), { target: { value: 'Minha recepção está confusa.' } });

    fireEvent.click(screen.getByRole('button', { name: /Quero uma análise gratuita/i }));

    await waitFor(() => {
      expect(screen.getByText(/Mensagem enviada!/i)).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));

    // Test reset
    fireEvent.click(screen.getByRole('button', { name: /Enviar nova mensagem/i }));
    expect(screen.getByLabelText(/Seu nome/i)).toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  it('handles submission error gracefully', async () => {
    const mockFetch = vi.fn().mockImplementation(() =>
      Promise.reject(new Error('Network error'))
    );
    vi.stubGlobal('fetch', mockFetch);

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/Seu nome/i), { target: { value: 'Dr. John Doe' } });
    fireEvent.change(screen.getByLabelText(/E-mail profissional/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/O que está travando sua clínica\?/i), { target: { value: 'Minha recepção está confusa.' } });

    fireEvent.click(screen.getByRole('button', { name: /Quero uma análise gratuita/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Ocorreu um erro ao enviar sua mensagem/i)).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
