import type { CSSProperties } from "react";
import { COLORS } from "../../constants";

export const filterContainerStyles: CSSProperties = {
  marginBottom: "30px",
  width: "100%",
};

export const filterLabelStyles: CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontSize: "clamp(13px, 2vw, 14px)",
  fontWeight: "600",
  color: COLORS.TEXT_PRIMARY,
};

export const filterInputStyles: CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "clamp(13px, 2vw, 14px)",
  border: `1px solid ${COLORS.BORDER}`,
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

export const filterInputFocusStyles: CSSProperties = {
  borderColor: COLORS.PRIMARY,
  boxShadow: `0 0 0 2px ${COLORS.PRIMARY}33`,
};
