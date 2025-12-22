import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AmountFilter } from "./AmountFilter";

describe("AmountFilter Component", () => {
  it("should render label and input", () => {
    render(<AmountFilter value="" onChange={vi.fn()} />);

    expect(screen.getByLabelText(/amount filter/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter minimum amount/i)
    ).toBeInTheDocument();
  });

  it("should display current value", () => {
    render(<AmountFilter value="100.50" onChange={vi.fn()} />);

    const input = screen.getByRole("amount-filter") as HTMLInputElement;
    expect(input.value).toBe("100.50");
  });

  it("should call onChange when user types", async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();

    render(<AmountFilter value="" onChange={mockOnChange} />);

    const input = screen.getByRole("amount-filter");
    await user.type(input, "50");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should accept decimal values", async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();

    render(<AmountFilter value="" onChange={mockOnChange} />);

    const input = screen.getByRole("amount-filter");
    await user.type(input, "123.45");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should have correct input type", () => {
    render(<AmountFilter value="" onChange={vi.fn()} />);

    const input = screen.getByRole("amount-filter");
    expect(input).toHaveAttribute("type", "text");
  });

  it("should have min attribute", () => {
    render(<AmountFilter value="" onChange={vi.fn()} />);

    const input = screen.getByRole("amount-filter");
    expect(input).toHaveAttribute("min", "0");
  });

  it("should have step attribute for decimals", () => {
    render(<AmountFilter value="" onChange={vi.fn()} />);

    const input = screen.getByRole("amount-filter");
    expect(input).toHaveAttribute("step", "0.01");
  });

  it("should clear value", async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();

    render(<AmountFilter value="50" onChange={mockOnChange} />);

    const input = screen.getByRole("amount-filter");
    await user.clear(input);

    expect(mockOnChange).toHaveBeenCalled();
  });
});
