import type { CSSProperties } from "react";
import { COLORS } from "../../constants";

export const getCardStyles = (
  backgroundColor: string,
  isSelected: boolean
): CSSProperties => ({
  backgroundColor,
  border: isSelected ? `3px solid ${COLORS.PRIMARY}` : "1px solid transparent",
  borderRadius: "12px",
  padding: "24px",
  cursor: "pointer",
  minWidth: "220px",
  width: "100%",
  maxWidth: "320px",
  transition: "all 0.2s ease",
  boxShadow: isSelected ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
  boxSizing: "border-box",
});

export const cardDescriptionStyles: CSSProperties = {
  margin: "0 0 12px 0",
  fontSize: "clamp(14px, 2vw, 16px)", // Responsive font size
  fontWeight: "600",
  color: COLORS.TEXT_PRIMARY,
};

export const cardNumberStyles: CSSProperties = {
  margin: 0,
  fontSize: "clamp(12px, 1.8vw, 14px)", // Responsive font size
  color: COLORS.TEXT_SECONDARY,
};
