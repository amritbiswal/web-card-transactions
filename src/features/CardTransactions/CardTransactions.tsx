import { CardList } from "../../components/CardList";
import { AmountFilter } from "../../components/AmountFilter";
import { TransactionList } from "../../components/TransactionList";
import { useCardTransactions } from "./useCardTransactions";
import {
  containerStyles,
  contentWrapperStyles,
  errorStyles,
  loadingStyles,
} from "./CardTransactions.styles";
import { COLORS } from "../../constants";

/**
 * Main feature component for Card and Transactions overview
 */
export const CardTransactions = () => {
  const {
    cards,
    selectedCard,
    transactions,
    filterAmount,
    filterError,
    loading,
    error,
    handleCardSelect,
    handleFilterChange,
  } = useCardTransactions();

  if (error) {
    return <div style={errorStyles}>Error: {error.message}</div>;
  }

  if (loading && cards.length === 0) {
    return <div style={loadingStyles}>Loading cards...</div>;
  }

  return (
    <div style={containerStyles}>
      <div style={contentWrapperStyles}>
        <CardList
          cards={cards}
          selectedCardId={selectedCard?.id || null}
          onSelectCard={handleCardSelect}
        />

        <AmountFilter
          value={filterAmount}
          onChange={handleFilterChange}
          error={filterError}
        />

        <TransactionList
          transactions={transactions}
          backgroundColor={selectedCard?.backgroundColor || COLORS.PRIVATE_CARD}
          emptyMessage={
            filterAmount
              ? "No transactions match the filter criteria"
              : "No transactions found for this card"
          }
        />
      </div>
    </div>
  );
};
