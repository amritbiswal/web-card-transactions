import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Transaction } from './Transaction';
import { createMockTransaction } from '../../test/mocks/mockData';

describe('Transaction Component', () => {
  it('should render transaction description', () => {
    const transaction = createMockTransaction({
      description: 'Coffee Shop Purchase',
    });

    render(<Transaction transaction={transaction} backgroundColor="#E5E7EB" />);

    expect(screen.getByText('Coffee Shop Purchase')).toBeInTheDocument();
  });

  it('should render formatted amount', () => {
    const transaction = createMockTransaction({
      amount: 123.45,
    });

    render(<Transaction transaction={transaction} backgroundColor="#E5E7EB" />);

    expect(screen.getByText('123.45€')).toBeInTheDocument();
  });

  it('should format amount with 2 decimals', () => {
    const transaction = createMockTransaction({
      amount: 100,
    });

    render(<Transaction transaction={transaction} backgroundColor="#E5E7EB" />);

    expect(screen.getByText('100.00€')).toBeInTheDocument();
  });

  it('should apply background color', () => {
    const transaction = createMockTransaction();

    const { container } = render(
      <Transaction transaction={transaction} backgroundColor="#FF5733" />
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle({ backgroundColor: '#FF5733' });
  });

  it('should handle negative amounts', () => {
    const transaction = createMockTransaction({
      amount: -50.50,
    });

    render(<Transaction transaction={transaction} backgroundColor="#E5E7EB" />);

    expect(screen.getByText('-50.50€')).toBeInTheDocument();
  });
});