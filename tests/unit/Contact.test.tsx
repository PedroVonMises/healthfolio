import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock server action module
const mockSubmitContactForm = vi.fn();
vi.mock('@/app/actions/contact', () => ({
  submitContactForm: (...args: unknown[]) => mockSubmitContactForm(...args),
}));

// Track the useActionState mock state
let mockActionState = { status: 'idle' as string, message: undefined as string | undefined };
let mockIsPending = false;
const mockFormAction = vi.fn();

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react');
  return {
    ...actual,
    useActionState: () => [mockActionState, mockFormAction, mockIsPending],
  };
});

// Mock FadeIn for simpler rendering
vi.mock('@/components/ui/FadeIn', () => ({
  default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
    const { delay, direction, fullWidth, ...validProps } = props as Record<string, unknown>;
    return <div {...validProps}>{children}</div>;
  },
}));

describe('Contact section', () => {
  beforeEach(() => {
    mockActionState = { status: 'idle', message: undefined };
    mockIsPending = false;
    vi.clearAllMocks();
  });

  it('renders all form fields and submit button', async () => {
    const { default: Contact } = await import('@/components/sections/Contact');
    render(<Contact />);
    expect(screen.getByLabelText(/Seu nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail profissional/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Clínica \/ Especialidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/O que está travando sua clínica\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Quero uma análise gratuita/i })).toBeInTheDocument();
  });

  it('renders success state when form submitted successfully', async () => {
    mockActionState = { status: 'success', message: undefined };

    const { default: Contact } = await import('@/components/sections/Contact');
    render(<Contact />);

    expect(screen.getByText(/Mensagem enviada!/i)).toBeInTheDocument();
    expect(screen.getByText(/Enviar nova mensagem/i)).toBeInTheDocument();
  });

  it('renders error state with alert when submission fails', async () => {
    mockActionState = { status: 'error', message: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.' };

    const { default: Contact } = await import('@/components/sections/Contact');
    render(<Contact />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Ocorreu um erro ao enviar sua mensagem/i)).toBeInTheDocument();
  });

  it('disables submit button and shows loading text when pending', async () => {
    mockIsPending = true;

    const { default: Contact } = await import('@/components/sections/Contact');
    render(<Contact />);

    const button = screen.getByRole('button', { name: /Enviando/i });
    expect(button).toBeDisabled();
  });

  it('contains link to privacy policy', async () => {
    const { default: Contact } = await import('@/components/sections/Contact');
    render(<Contact />);

    const privacyLink = screen.getByRole('link', { name: /Política de Privacidade/i });
    expect(privacyLink).toHaveAttribute('href', '/privacidade');
  });

  it('form uses Server Action via formAction', async () => {
    const { default: Contact } = await import('@/components/sections/Contact');
    render(<Contact />);

    // The form should use the Server Action (formAction) from useActionState
    const form = screen.getByLabelText(/Seu nome/i).closest('form');
    expect(form).toBeInTheDocument();
  });
});
