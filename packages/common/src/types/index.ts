export * from './chatbot'
export * from './debt'
export * from './group'
export * from './obshchak-user'
export * from './old'
export * from './utils'

import type { AsArray, Maybe, Optional } from './utils'

export type Paginatable<T extends object = object> = Optional<{
  page: number
  limit: number
}> &
  T

export const isPaginatable = (obj: object): obj is Paginatable =>
  !obj ||
  (typeof obj === 'object' &&
    (('page' in obj && 'limit' in obj) || (!('page' in obj) && !('limit' in obj))))

export type Loadable<T = object> =
  | ({
      isLoading: true
    } & {
      [P in keyof T]?: T[P]
    })
  | ({
      isLoading?: undefined | false
    } & T)
  | ({
      isLoading?: boolean
    } & T)

// 'true' | 'false' because "received false for non-boolean attribute"
export type Pendable<T = object> = {
  pending?: 'true' | 'false'
} & T

export type WithSize<SIZE_TYPE = object, T = object> = T & { size?: SIZE_TYPE }
export type WithDimensions<T = object, S extends undefined | number = undefined> = T &
  (
    | {
        width: number
        height: number
      }
    | {
        width: S
        height: S
      }
  )

export const isSomeEmpty = (s: object) => !Object.keys(s).length

export const isAnyEmpty = (s: unknown) => !s || isSomeEmpty(s)

export const entries = <T extends object>(obj: Maybe<T>): AsArray<T> =>
  obj ? (Object.entries(obj) as AsArray<T>) : []

export const isWithId = (obj: object): obj is { id: string | number } => obj && 'id' in obj

export type WithId<T extends object = object> = T & { id: string | number }

export type IdMap<T extends WithId = WithId> = Record<T['id'], T>

export const arrayToIdMap = <T extends WithId>(data: T[]): IdMap<T> =>
  data.reduce((acc, item) => ({ ...acc, [item.id]: item }), {} as IdMap<T>)
