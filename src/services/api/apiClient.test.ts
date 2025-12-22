import { describe, it, expect, beforeEach, vi } from "vitest";
import { apiClient } from "./apiClient";

// Mock the JSON data imports
vi.mock("../../data/cards.json", () => ({
  default: [
    {
      id: "card-1",
      description: "Private Card",
      cardId: "**** **** **** 1234",
      backgroundColor: "#E5E7EB",
    },
    {
      id: "card-2",
      description: "Business Card",
      cardId: "**** **** **** 5678",
      backgroundColor: "#BAE6FD",
    },
  ],
}));

vi.mock("../../data/transactions.json", () => ({
  default: {
    "card-1": [
      {
        id: "tx-1",
        amount: 100.5,
        description: "Grocery Store",
      },
      {
        id: "tx-2",
        amount: 50.25,
        description: "Coffee Shop",
      },
    ],
    "card-2": [
      {
        id: "tx-3",
        amount: 1200.0,
        description: "Office Supplies",
      },
      {
        id: "tx-4",
        amount: 350.75,
        description: "Software Subscription",
      },
    ],
  },
}));

describe("apiClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getCards", () => {
    it("should fetch and return cards", async () => {
      const result = await apiClient.getCards();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
    });

    it("should return cards with correct structure", async () => {
      const result = await apiClient.getCards();

      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("description");
      expect(result[0]).toHaveProperty("cardId");
      expect(result[0]).toHaveProperty("backgroundColor");
    });

    it("should return specific card data", async () => {
      const result = await apiClient.getCards();

      expect(result[0].id).toBe("card-1");
      expect(result[0].description).toBe("Private Card");
      expect(result[0].cardId).toBe("**** **** **** 1234");
      expect(result[0].backgroundColor).toBe("#E5E7EB");
    });

    it("should return all cards", async () => {
      const result = await apiClient.getCards();

      expect(result).toEqual([
        {
          id: "card-1",
          description: "Private Card",
          cardId: "**** **** **** 1234",
          backgroundColor: "#E5E7EB",
        },
        {
          id: "card-2",
          description: "Business Card",
          cardId: "**** **** **** 5678",
          backgroundColor: "#BAE6FD",
        },
      ]);
    });
  });

  describe("getTransactions", () => {
    it("should fetch and return transactions for card-1", async () => {
      const result = await apiClient.getTransactions("card-1");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
    });

    it("should fetch and return transactions for card-2", async () => {
      const result = await apiClient.getTransactions("card-2");

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
    });

    it("should return transactions with correct structure", async () => {
      const result = await apiClient.getTransactions("card-1");

      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("amount");
      expect(result[0]).toHaveProperty("description");
    });

    it("should return specific transaction data for card-1", async () => {
      const result = await apiClient.getTransactions("card-1");

      expect(result[0]).toEqual({
        id: "tx-1",
        amount: 100.5,
        description: "Grocery Store",
      });

      expect(result[1]).toEqual({
        id: "tx-2",
        amount: 50.25,
        description: "Coffee Shop",
      });
    });

    it("should return specific transaction data for card-2", async () => {
      const result = await apiClient.getTransactions("card-2");

      expect(result[0]).toEqual({
        id: "tx-3",
        amount: 1200.0,
        description: "Office Supplies",
      });

      expect(result[1]).toEqual({
        id: "tx-4",
        amount: 350.75,
        description: "Software Subscription",
      });
    });

    it("should throw error when cardId is not found", async () => {
      await expect(
        apiClient.getTransactions("invalid-card-id")
      ).rejects.toThrow("cardId not found");
    });

    it("should throw error for non-existent card", async () => {
      await expect(apiClient.getTransactions("card-999")).rejects.toThrow(
        "cardId not found"
      );
    });

    it("should handle multiple card IDs correctly", async () => {
      const result1 = await apiClient.getTransactions("card-1");
      const result2 = await apiClient.getTransactions("card-2");

      expect(result1).toHaveLength(2);
      expect(result2).toHaveLength(2);
      expect(result1[0].id).toBe("tx-1");
      expect(result2[0].id).toBe("tx-3");
    });
  });

  describe("error handling", () => {
    it("should handle missing cardId gracefully", async () => {
      await expect(apiClient.getTransactions("")).rejects.toThrow(
        "cardId not found"
      );
    });

    it("should handle undefined cardId", async () => {
      await expect(apiClient.getTransactions(undefined as any)).rejects.toThrow(
        "cardId not found"
      );
    });

    it("should handle null cardId", async () => {
      await expect(apiClient.getTransactions(null as any)).rejects.toThrow(
        "cardId not found"
      );
    });
  });

  describe("data integrity", () => {
    it("should return immutable data", async () => {
      const result1 = await apiClient.getCards();
      const result2 = await apiClient.getCards();

      // Should return fresh data each time
      expect(result1).toEqual(result2);
      expect(result1).not.toBe(result2); // Different object references
    });

    it("should return correct data types", async () => {
      const cards = await apiClient.getCards();
      const transactions = await apiClient.getTransactions("card-1");

      cards.forEach((card) => {
        expect(typeof card.id).toBe("string");
        expect(typeof card.description).toBe("string");
        expect(typeof card.cardId).toBe("string");
        expect(typeof card.backgroundColor).toBe("string");
      });

      transactions.forEach((tx) => {
        expect(typeof tx.id).toBe("string");
        expect(typeof tx.amount).toBe("number");
        expect(typeof tx.description).toBe("string");
      });
    });
  });
});
