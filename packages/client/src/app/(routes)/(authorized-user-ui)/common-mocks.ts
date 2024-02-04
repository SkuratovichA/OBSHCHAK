export interface Transaction {
  name: string
  from: string
  to: string
  amount: number
  currency: string
  status: TransactionStatus
  description?: string
  id: string
}

export enum TransactionStatus {
  Paid = 'Paid',
  Pending = 'Pending',
  Active = 'Active',
}

export const transactionsMock: Transaction[] = [
  // Example transactions - please replace with real data
  {
    name: 'Transaction 1',
    from: 'you',
    to: 'username',
    amount: 200,
    currency: 'USD',
    status: TransactionStatus.Paid,
    id: 'txn1',
  },
  {
    name: 'Transaction 2',
    from: 'username',
    to: 'you',
    amount: 200,
    currency: 'USD',
    status: TransactionStatus.Active,
    id: 'txn2',
  },
  {
    name: 'Transaction 3',
    from: 'username',
    to: 'you',
    amount: 400,
    currency: 'USD',
    status: TransactionStatus.Pending,
    id: 'txn3',
  },
  // ... more transactions
]
