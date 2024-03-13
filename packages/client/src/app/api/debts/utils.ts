import type { Debt, IdMap, ObshchakUser, Paginatable } from 'app-common'
import { isWithId } from 'app-common'
import { isArray } from 'lodash'

export type DebtsSearchParams = Paginatable<{
  usernames: ObshchakUser['username'][]
  groups: string[]
}>

export const isDebtsSearchParams = (obj: object): obj is DebtsSearchParams =>
  obj && 'usernames' in obj && isArray(obj.usernames) && 'groups' in obj && isArray(obj.groups)

export type DebtsResponse = IdMap<Debt>

// TODO: move to common. It looks like shit btw
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
  isArray(obj.to)
// 'status' in obj && typeof obj.status === 'string' &&
// 'createdDate' in obj && obj.createdDate instanceof Date &&
// 'resolvedDate' in obj && (obj.resolvedDate === null || obj.resolvedDate instanceof Date)
// 'description' in obj && typeof obj.description === 'string' &&

export const isDebtsResponse = (obj: object): obj is DebtsResponse =>
  Object.entries(obj).every(([id, obj]) => id === obj.id && isDebt(obj))
