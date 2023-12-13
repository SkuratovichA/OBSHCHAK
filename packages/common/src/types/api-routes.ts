export enum TransactionStatusType {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  RESOLVED = 'RESOLVED',
}

export type Participant = Array<{ userId: string; amount: number }>

export enum TransactionDirectionType {
  PAID = 'PAID',
  RECEIVED = 'RECEIVED',
}

export type CreateTransactionData = {
  name: string;
  currency: string;
  participants: Participant[];
  direction: TransactionDirectionType;
  transactionDate: Date;
  description?: string;
  groups?: string[];
  categories?: string[];
  status: TransactionStatusType
};
