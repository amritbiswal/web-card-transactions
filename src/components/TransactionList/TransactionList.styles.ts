import type { CSSProperties } from "react";
import { COLORS } from "../../constants";

export const transactionListContainerStyles: CSSProperties = {
  minHeight: "200px",
  maxHeight: "600px",
  overflowY: "auto",
  overflowX: "hidden",
  paddingRight: "8px",
};

export const emptyStateStyles: CSSProperties = {
  textAlign: "center",
  padding: "40px",
  color: COLORS.WHITE,
};

export const loadingStateStyles: CSSProperties = {
  textAlign: "center",
  padding: "40px",
  color: COLORS.WHITE,
};
