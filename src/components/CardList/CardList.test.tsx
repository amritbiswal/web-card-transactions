import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardList } from './CardList';
import { mockCards } from '../../test/mocks/mockData';

describe('CardList Component', () => {
  const mockOnSelectCard = vi.fn();

  beforeEach(() => {
    mockOnSelectCard.mockClear();
  });

  it('should render all cards', () => {
    render(
      <CardList
        cards={mockCards}
        selectedCardId="test-card-1"
        onSelectCard={mockOnSelectCard}
      />
    );

    expect(screen.getByText('Test Private Card')).toBeInTheDocument();
    expect(screen.getByText('Test Business Card')).toBeInTheDocument();
  });

  it('should mark selected card', () => {
    render(
      <CardList
        cards={mockCards}
        selectedCardId="test-card-1"
        onSelectCard={mockOnSelectCard}
      />
    );

    const cards = screen.getAllByRole('button');
    expect(cards[0]).toHaveAttribute('aria-pressed', 'true');
    expect(cards[1]).toHaveAttribute('aria-pressed', 'false');
  });

  it('should call onCardSelect when card is clicked', async () => {
    const user = userEvent.setup();

    render(
      <CardList
        cards={mockCards}
        selectedCardId="test-card-1"
        onSelectCard={mockOnSelectCard}
      />
    );

    const secondCard = screen.getByText('Test Business Card');
    await user.click(secondCard);

    expect(mockOnSelectCard).toHaveBeenCalledWith(mockCards[1]);
  });

  it('should render empty state when no cards', () => {
    render(
      <CardList
        cards={[]}
        selectedCardId={null}
        onSelectCard={mockOnSelectCard}
      />
    );

    expect(screen.getByText(/No cards available/i)).toBeInTheDocument();
  });
});