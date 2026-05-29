import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WhatsappButton from '@/components/ui/WhatsappButton';

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

describe('WhatsappButton', () => {
  it('renders the Whatsapp floating button with correct text and href link', () => {
    render(<WhatsappButton />);
    
    // Check that the text is present
    const buttonText = screen.getByText('Prefere me chamar pelo Whats?');
    expect(buttonText).toBeInTheDocument();
    
    // Check that it's a link pointing to the whatsapp api
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://wa.me/5527992018590');
  });
});
