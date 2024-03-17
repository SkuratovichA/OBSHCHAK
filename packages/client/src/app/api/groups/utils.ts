import type { Debt, IdMap, Paginatable } from 'app-common';
import { isGroup } from 'app-common'


export type GroupsResponse<T extends object = object> = IdMap<Debt & T>

export type GroupsRequestBody = Paginatable<{
  id: Debt['id']
}>

export const isGroupsRequestBody = (obj: object): obj is GroupsRequestBody =>
  obj && 'id' in obj && typeof obj.id === 'string'

export const isGroupsResponse = (obj: object): obj is GroupsResponse =>
  Object.entries(obj).every(([id, group]) => id === group.id && isGroup(group))
