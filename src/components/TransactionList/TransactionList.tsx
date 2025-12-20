import type { Transaction as TransactionType } from "../../types";
import { Transaction } from "../Transaction";
import "./TransactionList.css";
import {
  transactionListContainerStyles,
  emptyStateStyles,
  loadingStateStyles,
} from "./TransactionList.styles";

interface TransactionListProps {
  transactions: TransactionType[];
  backgroundColor: string;
  loading?: boolean;
  emptyMessage?: string;
}

/**
 * TransactionList component displays a list of transactions
 */
export const TransactionList = ({
  transactions,
  backgroundColor,
  loading = false,
  emptyMessage = "No transactions found",
}: TransactionListProps) => {
  if (loading) {
    return (
      <div style={transactionListContainerStyles}>
        <div style={loadingStateStyles}>Loading transactions...</div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div style={transactionListContainerStyles}>
        <div style={emptyStateStyles}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div
      style={transactionListContainerStyles}
      className="transaction-list-container"
      role="list"
      aria-label="Transaction list"
    >
      {transactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          backgroundColor={backgroundColor}
        />
      ))}
    </div>
  );
};
