import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock the API client
vi.mock("./services/api/apiClient", () => ({
  apiClient: {
    getCards: vi.fn().mockResolvedValue([
      {
        id: "card-1",
        description: "Test Private Card",
        cardId: "**** **** **** 1111",
        backgroundColor: "#E5E7EB",
      },
    ]),
    getTransactions: vi.fn().mockResolvedValue([
      {
        id: "tx-1",
        cardId: "card-1",
        amount: 100.5,
        description: "Test Transaction",
      },
    ]),
  },
}));

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the app without crashing", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(document.body).toBeInTheDocument();
  });

  it("should display cards after loading", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Test Private Card")).toBeInTheDocument();
    });
  });

  it("should display transactions after loading", async () => {
    render(<App />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText("Test Transaction")).toBeInTheDocument();
    });
  });
});
