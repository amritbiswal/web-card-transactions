import { useState, useCallback, useMemo } from 'react';
import type { Card } from '../../types';
import { useCards, useTransactions } from '../../hooks';
import { parseAmount } from '../../utils';

/**
 * Custom hook to manage card transactions feature logic
 */
export const useCardTransactions = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [filterAmount, setFilterAmount] = useState<string>('');

  const { cards, loading: cardsLoading, error: cardsError } = useCards();
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useTransactions(selectedCard?.id || null);

  // Set initial selected card when cards are loaded
  useMemo(() => {
    if (cards.length > 0 && !selectedCard) {
      setSelectedCard(cards[0]);
    }
  }, [cards, selectedCard]);

  // Filter transactions based on amount
  const filteredTransactions = useMemo(() => {
    if (!filterAmount) return transactions;

    const minAmount = parseAmount(filterAmount);
    if (minAmount === null) return transactions;

    return transactions.filter((transaction) => transaction.amount >= minAmount);
  }, [transactions, filterAmount]);

  // Handle card selection and reset filter
  const handleCardSelect = useCallback((card: Card) => {
    setSelectedCard(card);
    setFilterAmount(''); // Reset filter when changing cards
  }, []);

  // Handle filter amount change
  const handleFilterChange = useCallback((value: string) => {
    setFilterAmount(value);
  }, []);

  return {
    cards,
    selectedCard,
    transactions: filteredTransactions,
    filterAmount,
    loading: cardsLoading || transactionsLoading,
    error: cardsError || transactionsError,
    handleCardSelect,
    handleFilterChange,
  };
};