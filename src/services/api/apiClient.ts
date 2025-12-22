import type { Card, Transaction } from "../../types";

const SIMULATED_DELAY = 500; // milliseconds

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const apiClient = {
  async getCards(): Promise<Card[]> {
    await delay(SIMULATED_DELAY);
    const cards = await (await import("../../data/cards.json")).default;
    return JSON.parse(JSON.stringify(cards));
  },

  async getTransactions(cardId: string): Promise<Transaction[]> {
    await delay(SIMULATED_DELAY);
    const transactions: Record<string, Transaction[]> = await (
      await import("../../data/transactions.json")
    ).default;

    if (transactions[cardId]) {
      return JSON.parse(JSON.stringify(transactions[cardId]));
    }

    throw new Error("cardId not found");
  },
};
