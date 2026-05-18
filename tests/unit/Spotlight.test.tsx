import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spotlight from '@/components/ui/Spotlight';

describe('Spotlight', () => {
  it('renders children and applies custom className', () => {
    const { container } = render(
      <Spotlight className="custom-spotlight">
        <div data-testid="inner">Content</div>
      </Spotlight>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-spotlight');
    expect(screen.getByTestId('inner')).toBeInTheDocument();
  });

  it('handles mouse events without crashing', () => {
    const { container } = render(
      <Spotlight>
        <div>Content</div>
      </Spotlight>
    );
    const wrapper = container.firstChild as HTMLElement;

    // Trigger hover events
    fireEvent.mouseEnter(wrapper);
    fireEvent.mouseMove(wrapper, { clientX: 10, clientY: 10 });
    fireEvent.mouseLeave(wrapper);

    expect(wrapper).toBeInTheDocument();
  });
});
