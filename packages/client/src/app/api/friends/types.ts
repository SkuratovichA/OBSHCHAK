import type { FriendsMap, ObshchakUser, Paginatable } from 'app-common';
import { isObshchakUser } from 'app-common'

export const usersToFriendsMap = (users: ObshchakUser[]): FriendsMap =>
  users.reduce<FriendsMap>((acc, user) => ({ ...acc, [user.id]: user }), {})

export type FriendsRequestBody = Paginatable<{
  id: ObshchakUser['id']
}>
export const isFriendsRequestBody = (obj: object): obj is FriendsRequestBody =>
  obj && 'id' in obj && typeof obj.id === 'string'

export type FriendsResponse = FriendsMap

export const isFriendsResponse = (obj: object): obj is FriendsResponse => Object.entries(obj).every(([id, user]) => id === user.id && isObshchakUser(user))
