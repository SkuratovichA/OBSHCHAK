
export const SERVER_URL = 'http://127.0.0.1:5000/' // very bad fuck

export enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  CZK = 'CZK',
  TON = 'TON',
}

export const currencyMapping: Record<Currencies, string> = {
  [Currencies.USD]: '$',
  [Currencies.EUR]: '€',
  [Currencies.CZK]: 'Kč',
  [Currencies.TON]: 'TON',
}

export enum TransactionStatus {
  Active = 'active',
  Closed = 'closed',
  Rejected = 'rejected'
}

export interface Transaction {
  owner: string
  target: string;
  amount: number;
  currency: string;
  message: string | null;
  status: TransactionStatus;
  timestamp: string;
}

export enum FilterTypes {
  MY_DUES = 'my dues',
  DEBTORS = 'debtors',
  PENDING = 'pending',
  PAID = 'paid',
}

export enum ActionType {
  INITIAL_DATA = 'initialData',
  UPDATE_TRANSACTION = 'updateTransaction',
  ADD_TRANSACTION = 'addTransaction'
}