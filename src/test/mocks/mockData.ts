import type { Card, Transaction } from '../../types';
import { COLORS } from '../../constants';

export const mockCards: Card[] = [
  {
    id: 'test-card-1',
    description: 'Test Private Card',
    cardId: '**** **** **** 1111',
    backgroundColor: COLORS.PRIVATE_CARD,
  },
  {
    id: 'test-card-2',
    description: 'Test Business Card',
    cardId: '**** **** **** 2222',
    backgroundColor: COLORS.BUSINESS_CARD,
  },
];

export const mockTransactions: Record<string, Transaction[]> = {
  'test-card-1': [
    {
      id: 'tx-1',
      amount: 100.50,
      description: 'Grocery Store',
    },
    {
      id: 'tx-2',
      amount: 50.25,
      description: 'Coffee Shop',
    },
    {
      id: 'tx-3',
      amount: 75.00,
      description: 'Gas Station',
    },
  ],
  'test-card-2': [
    {
      id: 'tx-4',
      amount: 200.00,
      description: 'Office Supplies',
    },
    {
      id: 'tx-5',
      amount: 150.75,
      description: 'Software License',
    },
  ],
};

export const createMockTransaction = (overrides?: Partial<Transaction>): Transaction => ({
  id: 'mock-tx-1',
  amount: 99.99,
  description: 'Mock Transaction',
  ...overrides,
});

export const createMockCard = (overrides?: Partial<Card>): Card => ({
  id: 'mock-card-1',
  description: 'Mock Card',
  cardId: '**** **** **** 9999',
  backgroundColor: COLORS.PRIVATE_CARD,
  ...overrides,
});