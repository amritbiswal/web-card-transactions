import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCards } from "./useCards";
import { apiClient } from "../services/api/apiClient";
import type { Card } from "../types";

// Mock the API client
vi.mock("../services/api/apiClient");

describe("useCards Hook", () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should start with loading state", () => {
    (apiClient.getCards as any).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useCards());

    expect(result.current.loading).toBe(true);
    expect(result.current.cards).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("should fetch and return cards successfully", async () => {
    (apiClient.getCards as any).mockResolvedValue(mockCards);

    const { result } = renderHook(() => useCards());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.cards).toEqual([]);

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cards).toEqual(mockCards);
    expect(result.current.error).toBeNull();
    expect(apiClient.getCards).toHaveBeenCalledTimes(1);
  });

  it("should handle errors when fetching fails", async () => {
    const errorMessage = "Failed to fetch cards";
    (apiClient.getCards as any).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCards());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cards).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it("should only fetch cards once on mount", async () => {
    (apiClient.getCards as any).mockResolvedValue(mockCards);

    const { result, rerender } = renderHook(() => useCards());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Rerender the hook
    rerender();

    // Should not call API again
    expect(apiClient.getCards).toHaveBeenCalledTimes(1);
  });
});
