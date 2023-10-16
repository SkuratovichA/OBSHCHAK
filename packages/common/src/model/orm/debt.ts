import { User } from './user'

export enum DebtStatusType {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}
export interface Debt {
  debtId: string
  name: string // Auto-generated or custom
  description: string
  totalAmount: number
  creatorUserId: User['userId'] // Refer to User
  status: DebtStatusType
  createdTimestamp: string
  resolvedTimestamp: string | null
}