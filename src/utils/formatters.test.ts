import { describe, it, expect } from "vitest";
import { formatCurrency } from "./formatters";

describe("Formatters Utils", () => {
  describe("formatCurrency", () => {
    it("should format positive numbers with 2 decimals", () => {
      expect(formatCurrency(100)).toBe("100.00€");
      expect(formatCurrency(123.45)).toBe("123.45€");
      expect(formatCurrency(0.1)).toBe("0.10€");
    });

    it("should round to 2 decimal places", () => {
      expect(formatCurrency(123.456)).toBe("123.46€");
      expect(formatCurrency(123.454)).toBe("123.45€");
    });

    it("should format negative numbers", () => {
      expect(formatCurrency(-50.5)).toBe("-50.50€");
      expect(formatCurrency(-0.01)).toBe("-0.01€");
    });

    it("should handle zero", () => {
      expect(formatCurrency(0)).toBe("0.00€");
    });

    it("should handle very large numbers", () => {
      expect(formatCurrency(999999.99)).toBe("999999.99€");
    });

    it("should handle very small numbers", () => {
      expect(formatCurrency(0.001)).toBe("0.00€");
      expect(formatCurrency(0.005)).toBe("0.01€");
    });
  });
});
