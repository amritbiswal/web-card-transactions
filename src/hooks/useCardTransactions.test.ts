import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useCardTransactions } from "./useCardTransactions";
import * as hooks from "./index";
import type { Card, Transaction } from "../types";

// Mock the hooks
vi.mock("./index", () => ({
  useCards: vi.fn(),
  useTransactions: vi.fn(),
}));

describe("useCardTransactions Hook", () => {
  const mockCards: Card[] = [
    {
      id: "card-1",
      description: "Private Card",
      cardId: "**** 1234",
      backgroundColor: "#E5E7EB",
    },
    {
      id: "card-2",
      description: "Business Card",
      cardId: "**** 5678",
      backgroundColor: "#FEE2E2",
    },
  ];

  const mockTransactions: Transaction[] = [
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
    {
      id: "tx-3",
      amount: 75.0,
      description: "Gas Station",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (hooks.useCards as any).mockReturnValue({
      cards: mockCards,
      loading: false,
      error: null,
    });
    (hooks.useTransactions as any).mockReturnValue({
      transactions: mockTransactions,
      loading: false,
      error: null,
    });
  });

  it("should initialize with first card selected", async () => {
    const { result } = renderHook(() => useCardTransactions());

    await waitFor(() => {
      expect(result.current.selectedCard).toEqual(mockCards[0]);
    });

    expect(result.current.cards).toEqual(mockCards);
    expect(result.current.transactions).toEqual(mockTransactions);
    expect(result.current.filterAmount).toBe("");
    expect(result.current.loading).toBe(false);
  });

  it("should handle card selection", async () => {
    const { result } = renderHook(() => useCardTransactions());

    await waitFor(() => {
      expect(result.current.selectedCard).toBeTruthy();
    });

    act(() => {
      result.current.handleCardSelect(mockCards[1]);
    });

    expect(result.current.selectedCard).toEqual(mockCards[1]);
  });

  it("should reset filter when selecting different card", async () => {
    const { result } = renderHook(() => useCardTransactions());

    await waitFor(() => {
      expect(result.current.selectedCard).toBeTruthy();
    });

    // Set filter
    act(() => {
      result.current.handleFilterChange("50");
    });

    expect(result.current.filterAmount).toBe("50");

    // Select different card
    act(() => {
      result.current.handleCardSelect(mockCards[1]);
    });

    expect(result.current.filterAmount).toBe("");
    expect(result.current.filterError).toBe("");
  });

  it("should filter transactions by amount", async () => {
    const { result } = renderHook(() => useCardTransactions());

    await waitFor(() => {
      expect(result.current.transactions).toEqual(mockTransactions);
    });

    // Set filter to 75
    act(() => {
      result.current.handleFilterChange("75");
    });

    expect(result.current.filterAmount).toBe("75");
    expect(result.current.transactions).toHaveLength(2);
    expect(result.current.transactions[0].amount).toBe(100.5);
    expect(result.current.transactions[1].amount).toBe(75.0);
  });

  it("should return all transactions when filter is empty", async () => {
    const { result } = renderHook(() => useCardTransactions());

    await waitFor(() => {
      expect(result.current.transactions).toEqual(mockTransactions);
    });

    act(() => {
      result.current.handleFilterChange("");
    });

    expect(result.current.filterAmount).toBe("");
    expect(result.current.transactions).toEqual(mockTransactions);
    expect(result.current.filterError).toBe("");
  });

  it("should validate filter input for decimal places", () => {
    const { result } = renderHook(() => useCardTransactions());

    // Valid: 2 decimal places
    act(() => {
      result.current.handleFilterChange("50.99");
    });
    expect(result.current.filterError).toBe("");

    // Invalid: 3 decimal places
    act(() => {
      result.current.handleFilterChange("50.999");
    });
    expect(result.current.filterError).toContain("valid amount");
  });

  it("should validate filter input for negative numbers", () => {
    const { result } = renderHook(() => useCardTransactions());

    act(() => {
      result.current.handleFilterChange("-50");
    });

    expect(result.current.filterError).toContain(
      "Please enter a valid amount (up to 2 decimal places)"
    );
  });

  it("should validate filter input for invalid characters", () => {
    const { result } = renderHook(() => useCardTransactions());

    act(() => {
      result.current.handleFilterChange("abc");
    });

    expect(result.current.filterError).toContain("valid amount");
  });

  it("should handle loading state from useCards", () => {
    (hooks.useCards as any).mockReturnValue({
      cards: [],
      loading: true,
      error: null,
    });

    const { result } = renderHook(() => useCardTransactions());

    expect(result.current.loading).toBe(true);
  });

  it("should handle loading state from useTransactions", () => {
    (hooks.useTransactions as any).mockReturnValue({
      transactions: [],
      loading: true,
      error: null,
    });

    const { result } = renderHook(() => useCardTransactions());

    expect(result.current.loading).toBe(true);
  });

  it("should handle error from useCards", () => {
    const errorMessage = "Failed to load cards";
    (hooks.useCards as any).mockReturnValue({
      cards: [],
      loading: false,
      error: errorMessage,
    });

    const { result } = renderHook(() => useCardTransactions());

    expect(result.current.error).toBe(errorMessage);
  });

  it("should handle error from useTransactions", () => {
    const errorMessage = "Failed to load transactions";
    (hooks.useTransactions as any).mockReturnValue({
      transactions: [],
      loading: false,
      error: errorMessage,
    });

    const { result } = renderHook(() => useCardTransactions());

    expect(result.current.error).toBe(errorMessage);
  });

  it("should not set initial card when cards array is empty", () => {
    (hooks.useCards as any).mockReturnValue({
      cards: [],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useCardTransactions());

    expect(result.current.selectedCard).toBeNull();
  });
});
