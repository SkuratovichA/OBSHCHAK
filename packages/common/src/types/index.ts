export * from './chatbot'
export * from './transactions'
export * from './old'
export * from './utils'

import type { AsArray, Optional } from './utils'

export type Paginatable<T> = Optional<{
  page: number
  limit: number
}> & T

export type Loadable<T = object> = ({
  isLoading: true
} & {
  [P in keyof T]?: T[P]
}) | ({
  isLoading?: undefined | false
} & T) | ({
  isLoading?: boolean
} & T)

// 'true' | 'false' because "received false for non-boolean attribute"
export type Pendable<T = object> = {
  pending?: 'true' | 'false'
} & T

export type WithSize<SIZE_TYPE = object, T = object> = T & { size?: SIZE_TYPE }
export type WithDimensions<T = object, S extends undefined | number = undefined> = T & ({
  width: number
  height: number
} | {
  width: S
  height: S
})


export const isEmpty = (s: object) => !Object.keys(s).length

export const mapObject = <T extends object, >(obj: T) => (Object.entries(obj) as AsArray<T>)
