import type { ObshchakUser } from './obshchak-user'
import type { Group } from './index'
import { isWithId } from './index'
import { isArray } from 'lodash'

export enum DebtStatusType {
  Paid = 'Paid',
  Pending = 'Pending',
  Active = 'Active',
}

export type DebtParticipant = {
  username: ObshchakUser['username']
  amount: number
}

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  CZK = 'CZK',
}

export enum DebtRoleType {
  LENDER = 'LENDER',
  BORROWER = 'BORROWER',
}

export interface Debt {
  id: string
  description?: string
  amount: number

  name: string
  currency: CurrencyType
  role: DebtRoleType
  from: ObshchakUser['username']
  to: DebtParticipant[]
  status: DebtStatusType

  createdDate: Date
  resolvedDate: Date | null

  categories?: string[]
  groups?: Array<Group['id']>
}

// TODO: add validation for enums, so they are not strings, but enum values
export const isDebt = (obj: object): obj is Debt =>
  obj &&
  isWithId(obj) &&
  'name' in obj &&
  typeof obj.name === 'string' &&
  'amount' in obj &&
  typeof obj.amount === 'number' &&
  'currency' in obj &&
  typeof obj.currency === 'string' &&
  'from' in obj &&
  typeof obj.from === 'string' &&
  'to' in obj &&
  isArray(obj.to) &&
  'status' in obj &&
  typeof obj.status === 'string' &&
  'role' in obj &&
  typeof obj.role === 'string'

// 'createdDate' in obj && obj.createdDate instanceof Date &&
// 'resolvedDate' in obj && (obj.resolvedDate === null || obj.resolvedDate instanceof Date)
// 'description' in obj && typeof obj.description === 'string' &&
