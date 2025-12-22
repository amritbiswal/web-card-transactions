import { useState, useEffect } from "react";
import type { Transaction } from "../types";
import { apiClient } from "../services/api";

interface UseTransactionsReturnType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

// Hook implementation goes here

export const useTransactions = (
  cardId: string | null
): UseTransactionsReturnType => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cardId) {
      setTransactions([]);
      return;
    }
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getTransactions(cardId);
        setTransactions(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while loading transactions";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [cardId]);
  return { transactions, loading, error };
};
