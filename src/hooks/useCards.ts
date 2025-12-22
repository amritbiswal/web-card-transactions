import type { Card } from "../types";
import { apiClient } from "../services/api";
import { useState, useEffect } from "react";

interface UseCardsReturnType {
  cards: Card[];
  loading: boolean;
  error: string | null;
}

// Hook implementation goes here

export const useCards = (): UseCardsReturnType => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getCards();
        setCards(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching cards:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while loading cards";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);
  return { cards, loading, error };
};
