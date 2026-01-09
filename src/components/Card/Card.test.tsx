import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "./Card";
import { createMockCard } from "../../test/mocks/mockData";

describe("Card Component", () => {
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  describe("Rendering", () => {
    it("should render card with correct name and cardId", () => {
      const mockCard = createMockCard({
        description: "Personal Card",
        cardId: "**** **** **** 1234",
      });
      render(
        <Card card={mockCard} isSelected={false} onSelect={mockOnSelect} />
      );

      expect(screen.getByText("Personal Card")).toBeInTheDocument();
      expect(screen.getByText("**** **** **** 1234")).toBeInTheDocument();
    });

    it("should render as a button with proper role", () => {
      const mockCard = createMockCard();
      render(
        <Card card={mockCard} isSelected={false} onSelect={mockOnSelect} />
      );

      const cardElement = screen.getByRole("button");
      expect(cardElement).toBeInTheDocument();
    });

    it("should have accessible label", () => {
      const mockCard = createMockCard({ description: "Test Card" });

      render(
        <Card card={mockCard} isSelected={false} onSelect={mockOnSelect} />
      );

      expect(screen.getByLabelText(/test card/i)).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("should call onSelect when clicked", async () => {
      const user = userEvent.setup();
      const mockCard = createMockCard();
      render(
        <Card card={mockCard} isSelected={false} onSelect={mockOnSelect} />
      );
      const cardElement = screen.getByRole("button");

      await user.click(cardElement);
      expect(mockOnSelect).toHaveBeenCalledWith(mockCard);
    });

    it("should call onSelect when Enter key is pressed", async () => {
      const user = userEvent.setup();
      const mockCard = createMockCard();
      render(
        <Card card={mockCard} isSelected={false} onSelect={mockOnSelect} />
      );
      const cardElement = screen.getByRole("button");
      cardElement.focus();

      await user.keyboard("{Enter}");
      expect(mockOnSelect).toHaveBeenCalledWith(mockCard);
    });

    it("should call onSelect when Space key is pressed", async () => {
      const user = userEvent.setup();
      const mockCard = createMockCard();
      render(
        <Card card={mockCard} isSelected={false} onSelect={mockOnSelect} />
      );
      const cardElement = screen.getByRole("button");
      cardElement.focus();
      await user.keyboard(" ");

      expect(mockOnSelect).toHaveBeenCalledWith(mockCard);
    });
  });

  describe("States", () => {
    it("should have aria-pressed true when selected", () => {
      const mockCard = createMockCard();
      render(
        <Card card={mockCard} isSelected={true} onSelect={mockOnSelect} />
      );
      const cardElement = screen.getByRole("button");
      expect(cardElement).toHaveAttribute("aria-pressed", "true");
    });

    it("should have aria-pressed false when not selected", () => {
      const mockCard = createMockCard();
      render(
        <Card card={mockCard} isSelected={false} onSelect={mockOnSelect} />
      );
      const cardElement = screen.getByRole("button");
      expect(cardElement).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("styling", () => {
    it("should apply correct styles based on backgroundColor and isSelected", () => {
      const mockCard = createMockCard({ backgroundColor: "#FF0000" });
      render(
        <Card card={mockCard} isSelected={true} onSelect={mockOnSelect} />
      );
      const cardElement = screen.getByRole("button");
      expect(cardElement).toHaveStyle(`background-color: #FF0000`);
    });
  });
});
