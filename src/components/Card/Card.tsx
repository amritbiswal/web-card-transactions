import type { CardProps } from "../../types";
import {
  getCardStyles,
  cardDescriptionStyles,
  cardNumberStyles,
} from "./Card.styles";

export const Card = ({ card, isSelected, onSelect }: CardProps) => {
  const handleClick = () => {
    onSelect(card);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(card);
    }
  };
  const styles = getCardStyles(card.backgroundColor, isSelected);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={styles}
      aria-pressed={isSelected}
      aria-label={`Select card ${card.description} ${card.cardId}`}
    >
      <h3 style={cardDescriptionStyles}>{card.description}</h3>
      <p style={cardNumberStyles}>{card.cardId}</p>
    </div>
  );
}
