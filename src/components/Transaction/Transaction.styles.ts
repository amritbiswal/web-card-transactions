import type { CSSProperties } from "react";

export const getTransactionStyles = (
  backgroundColor: string
): CSSProperties => ({
  backgroundColor,
  borderRadius: "8px",
  padding: "20px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  transition: "transform 0.2s ease",
});

export const transactionDescriptionStyles: CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  flex: 1,
};

export const transactionAmountStyles: CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  whiteSpace: "nowrap",
  marginLeft: "16px",
};
