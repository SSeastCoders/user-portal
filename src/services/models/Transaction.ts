export enum TransactionType {
  TRANSACTION_DEPOSIT,
  TRANSACTION_WITHDRAW,
  TRANSACTION_TRANSFER,
  TRANSACTION_PAYMENT,
  TRANSACTION_CHECK,
  TRANSACTION_CHARGE,
  TRANSACTION_ATM,
}

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: TransactionType;
  date: string,
  succeeded: boolean;
  pending: boolean;
}
