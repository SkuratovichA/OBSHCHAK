import type { ObshchakUser } from './obshchak-user'
import { isObshchakUser } from './obshchak-user'
import type { Debt } from './debt'
import { isDebt } from './debt'
import type { WithId } from './index'
import { isWithId } from './index'

export type UserReprForGroup = 'username' | 'id' | 'profileImage'

type BaseGroup = WithId<{
  name: string
  description: string
  members: Array<Pick<ObshchakUser, UserReprForGroup>>
  debts: Debt[]
  iconUrl: string
  admin: ObshchakUser['username']
  isAdmin: boolean
}>

export type SerializedGroup = BaseGroup & {
  creationDate: string
}

export type Group = BaseGroup & {
  creationDate: Date
}

export const isBaseGroup = (obj: object): obj is Group =>
  obj &&
  isWithId(obj) &&
  'name' in obj &&
  typeof obj.name === 'string' &&
  'description' in obj &&
  typeof obj.description === 'string' &&
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

export const isSerializedGroup = (obj: object): obj is SerializedGroup =>
  isBaseGroup(obj) && 'creationDate' in obj && typeof obj.creationDate === 'string'

export const isGroup = (obj: object): obj is Group =>
  isBaseGroup(obj) && 'creationDate' in obj && obj.creationDate instanceof Date
