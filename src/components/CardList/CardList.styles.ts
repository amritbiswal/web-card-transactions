import type { CSSProperties } from "react";

export const cardListContainerStyles: CSSProperties = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px",
  flexWrap: "wrap",
  justifyContent: "center",
};

export const noCardStyles: CSSProperties = {
  color: "#888888",
  fontSize: "16px",
  textAlign: "center",
  width: "100%",
  minHeight: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const getResponsiveCardListStyles = (): string => `
  @media (max-width: 768px) {
    .card-list-container {
      gap: 16px;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 480px) {
    .card-list-container {
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }
  }
`;
