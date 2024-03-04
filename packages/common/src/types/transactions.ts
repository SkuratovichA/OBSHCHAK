export interface ObshchakUser {
  id: string
  name: string
  username: string
  email: string
  profileImage: string // so far URL, maybe should go with Bulbs
  mobileNumber: string
}

export const isObshchakUser = (user: object): user is ObshchakUser =>
  user &&
  'id' in user && typeof user.id === 'string' &&
  'name' in user && typeof user.name === 'string' &&
  'username' in user && typeof user.username === 'string' &&
  'email' in user && typeof user.email === 'string' &&
  'profileImage' in user && typeof user.profileImage === 'string' &&
  'mobileNumber' in user && typeof user.mobileNumber === 'string'

export enum TransactionStatusType {
  Paid = 'Paid',
  Pending = 'Pending',
  Active = 'Active',
}

export type TransactionParticipant = { username: string; amount: number }

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  CZK = 'CZK'
}

export interface Transaction {
  id: string
  description?: string
  amount: number

  name: string
  currency: CurrencyType
  from: ObshchakUser['username']
  to: TransactionParticipant[],
  status: TransactionStatusType
  transactionDate: Date

  createdDate: Date
  resolvedDate: Date | null


  categories?: string[]
  groups?: string[]
}
