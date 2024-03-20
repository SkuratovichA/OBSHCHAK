import type { ObshchakUser } from './obshchak-user'
import { isObshchakUser } from './obshchak-user'
import type { Debt } from './debt'
import { isDebt } from './debt'
import type { WithId } from './index'
import { isWithId } from './index'

export type UserReprForGroup = 'username' | 'id' | 'profileImage'

export type Group = WithId<{
  name: string
  description: string
  creationDate: Date
  members: Array<Pick<ObshchakUser, UserReprForGroup>>
  debts: Debt[]
  iconUrl: string
  admin: ObshchakUser['username']
  isAdmin: boolean
}>

export const isGroup = (obj: object): obj is Group =>
  obj &&
  isWithId(obj) &&
  'name' in obj &&
  typeof obj.name === 'string' &&
  'description' in obj &&
  typeof obj.description === 'string' &&
  'creationDate' in obj &&
  obj.creationDate instanceof Date &&
  'members' in obj &&
  Array.isArray(obj.members) &&
  obj.members.every(isObshchakUser) &&
  'debts' in obj &&
  Array.isArray(obj.debts) &&
  obj.debts.every(isDebt) &&
  'iconUrl' in obj &&
  typeof obj.iconUrl === 'string' &&
  'admin' in obj &&
  typeof obj.admin === 'string' &&
  'isAdmin' in obj &&
  typeof obj.isAdmin === 'boolean'
