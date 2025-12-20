export interface Card {
  id: string;
  cardId: string;
  backgroundColor: string;
  description: string;
}

export interface CardProps {
  card: Card;
  isSelected: boolean;
  onSelect: (card: Card) => void;
}
