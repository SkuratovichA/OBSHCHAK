import type { Debt, IdMap, ObshchakUser, Paginatable } from 'app-common'
import { isDebt } from 'app-common'
import { isArray } from 'lodash'

export type DebtsSearchParams = Paginatable<{
  usernames: ObshchakUser['username'][]
  groups: string[]
}>

export const isDebtsSearchParams = (obj: object): obj is DebtsSearchParams =>
  obj && 'usernames' in obj && isArray(obj.usernames) && 'groups' in obj && isArray(obj.groups)

export type DebtsResponse = IdMap<Debt>

export const isDebtsResponse = (obj: object): obj is DebtsResponse =>
  Object.entries(obj).every(([id, obj]) => id === obj.id && isDebt(obj))
