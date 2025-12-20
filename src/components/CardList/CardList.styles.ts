import type { CSSProperties } from "react";

export const cardListContainerStyles: CSSProperties = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px",
  flexWrap: "wrap",
  justifyContent: "center",
};

// Add media query support
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
