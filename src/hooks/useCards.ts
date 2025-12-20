import type { Card } from "../types";
import { apiClient } from "../services/api";
import { useState, useEffect } from "react";

interface UseCardsReturnType {
  cards: Card[];
  loading: boolean;
  error: Error | null;
}

// Hook implementation goes here

export const useCards = (): UseCardsReturnType => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getCards();
        setCards(data);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("Failed to fetch cards")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);
  return { cards, loading, error };
};
