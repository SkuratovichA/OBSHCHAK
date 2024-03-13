import type { IdMap, ObshchakUser, Paginatable } from 'app-common'
import { isObshchakUser } from 'app-common'

export type FriendsResponse<T extends object = object> = IdMap<ObshchakUser & T>

export const usersToFriendsMap = (users: ObshchakUser[]): FriendsResponse =>
  users.reduce<FriendsResponse>((acc, user) => ({ ...acc, [user.id]: user }), {})

export type FriendsRequestBody = Paginatable<{
  id: ObshchakUser['id']
}>
export const isFriendsRequestBody = (obj: object): obj is FriendsRequestBody =>
  obj && 'id' in obj && typeof obj.id === 'string'


export const isFriendsResponse = (obj: object): obj is FriendsResponse => Object.entries(obj).every(([id, user]) => id === user.id && isObshchakUser(user))
