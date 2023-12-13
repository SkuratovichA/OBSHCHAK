export enum ParticipationRoleType {
  DEBTOR = 'DEBTOR',
  DEBTEE = 'DEBTEE',
}

export enum ParticipationStatusType {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum DebtGroupStatusType {
  ACTIVE = 'ACTIVE',
  PARTIALLY_RESOLVED = 'PARTIALLY_RESOLVED',
  RESOLVED = 'RESOLVED',
}

export enum DebtStatusType {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}

export enum PaymentStatusType {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum PaymentMethodType {
  DIRECT = 'DIRECT',
  CASH = 'CASH',
}

export enum Currencies {
  USD = 'USD',
  EUR = 'EUR',
  CZK = 'CZK',
}

export interface Transaction {
  debtId: string
  name: string
  description: string
  totalAmount: number
  creatorUser: User
  status: DebtStatusType
  createdTimestamp: Date
  resolvedTimestamp: Date | null
}

export interface User {
  userId: string
  // Add other user details you'd need
}

export interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
}

export interface UserProfile {
  userId: string
  name: string
  email: string
  image?: string
}
