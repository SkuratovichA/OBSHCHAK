import type { ObshchakUser } from '../transactions'

export type FriendsMap<T = object> = Record<ObshchakUser['id'], ObshchakUser & T>
