import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MagneticButton from '@/components/ui/MagneticButton';

// Mock window.matchMedia
vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})));

describe('MagneticButton', () => {
  it('renders as an anchor with correct href and children', () => {
    const href = '#contato';
    render(<MagneticButton href={href}>Fale Conosco</MagneticButton>);
    const link = screen.getByRole('link', { name: /Fale Conosco/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', href);
  });

  it('triggers mouse move and mouse leave event handlers without crashing', () => {
    const href = '#contato';
    const { container } = render(<MagneticButton href={href}>Fale Conosco</MagneticButton>);
    const outerDiv = container.firstChild as HTMLDivElement;

    // Simulate mousemove
    fireEvent.mouseMove(outerDiv, { clientX: 100, clientY: 100 });
    
    // Simulate mouseleave
    fireEvent.mouseLeave(outerDiv);
    
    expect(outerDiv).toBeInTheDocument();
  });
});
