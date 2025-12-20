export interface Transaction {
  id: string;
  description: string;
  amount: number;
}

export interface TransactionProps {
  transaction: Transaction;
  backgroundColor: string;
}

export interface TransactionFilters {
  minAmount?: number;
}