import type { Card, Transaction } from "../../types";
import { MOCK_CARDS, MOCK_TRANSACTIONS } from "../../constants";

const SIMULATED_DELAY = 300; // milliseconds

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const apiClient = {
  async getCards(): Promise<Card[]> {
    await delay(SIMULATED_DELAY);
    return MOCK_CARDS;
  },

  async getTransactions(cardId: string): Promise<Transaction[]> {
    await delay(SIMULATED_DELAY);
    const transaction = MOCK_TRANSACTIONS[cardId] || [];
    return transaction.map((transaction) => ({ ...transaction, cardId }));
  },
};
