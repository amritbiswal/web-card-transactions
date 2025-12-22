import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardTransactions } from "./CardTransactions";
import { mockCards, mockTransactions } from "../../test/mocks/mockData";

// Mock the API client
vi.mock("../../services/api/apiClient", () => ({
  apiClient: {
    getCards: vi.fn(),
    getTransactions: vi.fn(),
  },
}));

import { apiClient } from "../../services/api/apiClient";

describe("CardTransactions Feature", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (apiClient.getCards as any).mockResolvedValue(mockCards);
    (apiClient.getTransactions as any).mockImplementation((cardId: string) =>
      Promise.resolve(mockTransactions[cardId] || [])
    );
  });

  describe("Initial Load", () => {
    it("should show loading state initially", () => {
      (apiClient.getCards as any).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );

      render(<CardTransactions />);

      expect(screen.getByText(/loading cards/i)).toBeInTheDocument();
    });

    it("should load and display cards", async () => {
      render(<CardTransactions />);

      await waitFor(() => {
        expect(screen.getByText("Test Private Card")).toBeInTheDocument();
        expect(screen.getByText("Test Business Card")).toBeInTheDocument();
      });
    });

    it("should select first card by default", async () => {
      render(<CardTransactions />);

      await waitFor(() => {
        const cards = screen.getAllByRole("button");
        expect(cards[0]).toHaveAttribute("aria-pressed", "true");
      });
    });

    it("should load transactions for first card", async () => {
      render(<CardTransactions />);

      await waitFor(() => {
        expect(screen.getByText("Grocery Store")).toBeInTheDocument();
        expect(screen.getByText("100.50€")).toBeInTheDocument();
      });
    });
  });

  describe("Card Selection", () => {
    it("should switch transactions when selecting different card", async () => {
      const user = userEvent.setup();

      render(<CardTransactions />);

      await waitFor(() => {
        expect(screen.getByText("Test Private Card")).toBeInTheDocument();
      });

      // Click business card
      const businessCard = screen.getByText("Test Business Card");
      await user.click(businessCard);

      // Should show business transactions
      await waitFor(() => {
        expect(screen.getByText("Office Supplies")).toBeInTheDocument();
        expect(screen.getByText("200.00€")).toBeInTheDocument();
        expect(screen.queryByText("Grocery Store")).not.toBeInTheDocument();
      });
    });
  });

  describe("Amount Filtering", () => {
    it("should filter transactions by minimum amount", async () => {
      const user = userEvent.setup();

      render(<CardTransactions />);

      await waitFor(() => {
        expect(screen.getByText("Grocery Store")).toBeInTheDocument();
      });

      // Type in filter
      const filterInput = screen.getByRole("amount-filter");
      await user.type(filterInput, "75");

      // Check filtered results
      await waitFor(() => {
        expect(screen.getByText("Grocery Store")).toBeInTheDocument(); // 100.50
        expect(screen.getByText("Gas Station")).toBeInTheDocument(); // 75.00
        expect(screen.queryByText("Coffee Shop")).not.toBeInTheDocument(); // 50.25
      });
    });

    it("should reset filter when changing cards", async () => {
      const user = userEvent.setup();

      render(<CardTransactions />);

      await waitFor(() => {
        expect(screen.getByText("Test Private Card")).toBeInTheDocument();
      });

      // Set filter
      const filterInput = screen.getByRole("amount-filter") as HTMLInputElement;
      await user.type(filterInput, "75");
      expect(filterInput.value).toBe("75");

      // Switch card
      const businessCard = screen.getByText("Test Business Card");
      await user.click(businessCard);

      // Filter should be cleared
      await waitFor(() => {
        expect(filterInput.value).toBe("");
      });
    });

    it("should show empty message when no transactions match filter", async () => {
      const user = userEvent.setup();

      render(<CardTransactions />);

      await waitFor(() => {
        expect(screen.getByText("Grocery Store")).toBeInTheDocument();
      });

      // Set very high filter
      const filterInput = screen.getByRole("amount-filter");
      await user.type(filterInput, "999");

      await waitFor(() => {
        expect(screen.getByText(/no transactions match/i)).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    it("should display error when cards fail to load", async () => {
      (apiClient.getCards as any).mockRejectedValue(new Error("Network error"));

      render(<CardTransactions />);

      await waitFor(() => {
        expect(screen.getByText(/error.*network error/i)).toBeInTheDocument();
      });
    });

    it("should display error when transactions fail to load", async () => {
      (apiClient.getTransactions as any).mockRejectedValue(
        new Error("Transaction error")
      );

      render(<CardTransactions />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });
  });
});
