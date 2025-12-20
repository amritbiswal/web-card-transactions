import type { Card as CardType } from "../../types";
import { Card } from "../Card";
import { cardListContainerStyles } from "./CardList.styles";

interface CardListProps {
  // Define the props for CardList here
  cards: CardType[];
  selectedCardId: string | null;
  onSelectCard: (card: CardType) => void;
}

export const CardList = ({
  cards,
  selectedCardId,
  onSelectCard,
}: CardListProps) => {
  return (
    <div style={cardListContainerStyles}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isSelected={card.id === selectedCardId}
          onSelect={() => onSelectCard(card)}
        />
      ))}
    </div>
  );
}
