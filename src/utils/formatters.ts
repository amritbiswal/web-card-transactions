
// src/utils/formatters.ts
// Formats a number as a currency string with 2 decimal places and a euro sign

export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)}€`;
};

// Formats a credit card number by inserting spaces every 4 digits
// Euro sign added before each group of 4 digits

export const formatCardNumber = (cardNumber: string): string => {
    return cardNumber.replace(/(\d{4})/g, '€1 ').trim();
}

// Parses a string to a number, returning null if parsing fails

export const parseAmount = (value: string): number | null => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
}