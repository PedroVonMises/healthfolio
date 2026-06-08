import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Passthrough next/link so the nav renders as plain anchors in jsdom.
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

import Header from '@/components/layout/Header';

describe('Header', () => {
  it('renders the live indicator and desktop nav in the main (non-scrolled) state', () => {
    render(<Header />);
    expect(screen.getByText('Disponível')).toBeInTheDocument();
    expect(screen.getByText('Sobre Mim')).toBeInTheDocument();
  });

  it('opens and closes the mobile menu (covers menu handlers + badge + CTA)', () => {
    render(<Header />);
    fireEvent.click(screen.getByLabelText('Abrir menu principal'));
    expect(screen.getByLabelText('Fechar menu')).toBeInTheDocument();
    expect(screen.getByText('Agendar Avaliação')).toBeInTheDocument();
    expect(screen.getByText('Disponível para novos projetos')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Fechar menu'));
  });

  it('toggles the hover pill on a nav item (covers hover handlers)', () => {
    render(<Header />);
    const link = screen.getAllByText('Especialização')[0];
    fireEvent.mouseEnter(link);
    fireEvent.mouseLeave(link);
    expect(link).toBeInTheDocument();
  });
});
