import { useState, useCallback, useMemo, useEffect } from "react";
import type { Card } from "../../types";
import { useCards, useTransactions } from "../../hooks";
import { parseAmount } from "../../utils";

/**
 * Custom hook to manage card transactions feature logic
 */
export const useCardTransactions = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [filterAmount, setFilterAmount] = useState<string>("");
  const [filterError, setFilterError] = useState<string>("");

  const { cards, loading: cardsLoading, error: cardsError } = useCards();
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useTransactions(selectedCard?.id || null);

  // Set initial selected card when cards are loaded
  useEffect(() => {
    if (cards.length > 0 && !selectedCard) {
      setSelectedCard(cards[0]);
    }
  }, [cards, selectedCard]);

  // Filter transactions based on amount
  const filteredTransactions = useMemo(() => {
    if (!filterAmount) return transactions;

    const minAmount = parseAmount(filterAmount);
    if (minAmount === null) return transactions;

    return transactions.filter(
      (transaction) => transaction.amount >= minAmount
    );
  }, [transactions, filterAmount]);

  // Handle card selection and reset filter
  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
    setFilterAmount(""); // Reset filter when changing cards
    setFilterError("");
  };

  // Handle filter amount change
  const handleFilterChange = useCallback((value: string) => {
    if (value === "") {
      setFilterError("");
      setFilterAmount(value);
      return;
    }

    const numberPattern = /^\d*\.?\d{0,2}$/;
    if (!numberPattern.test(value)) {
      setFilterError("Please enter a valid amount (up to 2 decimal places)");
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      setFilterError("Amount must be a positive number");
      return;
    }
    setFilterError("");
    setFilterAmount(value);
  }, []);

  return {
    cards,
    selectedCard,
    transactions: filteredTransactions,
    filterAmount,
    filterError,
    loading: cardsLoading || transactionsLoading,
    error: cardsError || transactionsError,
    handleCardSelect,
    handleFilterChange,
  };
};
