import type { TransactionProps } from "../../types";
import { formatCurrency } from "../../utils";
import {
  getTransactionStyles,
  transactionDescriptionStyles,
  transactionAmountStyles,
} from "./Transaction.styles";

export const Transaction = ({
  transaction,
  backgroundColor,
}: TransactionProps) => {
  const styles = getTransactionStyles(backgroundColor);
  return (
    <div style={styles}>
      <span style={transactionDescriptionStyles}>
        {transaction.description}
      </span>
      <span style={transactionAmountStyles}>
        {formatCurrency(transaction.amount)}
      </span>
    </div>
  );
};
