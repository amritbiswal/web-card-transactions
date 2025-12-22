import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionList } from './TransactionList';
import { mockTransactions } from '../../test/mocks/mockData';

describe('TransactionList Component', () => {
  it('should render all transactions', () => {
    const transactions = mockTransactions['test-card-1'];

    render(
      <TransactionList
        transactions={transactions}
        backgroundColor="#E5E7EB"
      />
    );

    expect(screen.getByText('Grocery Store')).toBeInTheDocument();
    expect(screen.getByText('Coffee Shop')).toBeInTheDocument();
    expect(screen.getByText('Gas Station')).toBeInTheDocument();
  });

  it('should render empty state when no transactions', () => {
    render(
      <TransactionList
        transactions={[]}
        backgroundColor="#E5E7EB"
        emptyMessage="No transactions found"
      />
    );

    expect(screen.getByText('No transactions found')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    render(
      <TransactionList
        transactions={[]}
        backgroundColor="#E5E7EB"
        loading={true}
      />
    );

    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();
  });

  it('should render custom empty message', () => {
    render(
      <TransactionList
        transactions={[]}
        backgroundColor="#E5E7EB"
        emptyMessage="Custom empty message"
      />
    );

    expect(screen.getByText('Custom empty message')).toBeInTheDocument();
  });
});