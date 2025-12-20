import type { CSSProperties } from "react";

export const containerStyles: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px 20px",
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
  boxSizing: "border-box",
};

export const contentWrapperStyles: CSSProperties = {
  width: "100%",
  maxWidth: "800px",
};

export const errorStyles: CSSProperties = {
  padding: "40px 20px",
  textAlign: "center",
  color: "#EF4444",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
};

export const loadingStyles: CSSProperties = {
  padding: "40px 20px",
  textAlign: "center",
  color: "#6B7280",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
};

// Responsive breakpoints as constants
export const BREAKPOINTS = {
  mobile: "320px",
  tablet: "768px",
  desktop: "1024px",
} as const;
