export * from './chatbot'
export * from './transactions'
export * from './old'


export type Function<Props = void, Result = void> = (props: Props) => Result
export type Undefine<T> = Partial<Record<keyof T, undefined>>

export type Loadable<T = {}> = ({
  isLoading: true
} & {
  [P in keyof T]?: T[P]
}) | ({
  isLoading?: undefined | false
} & T) | ({
  isLoading?: boolean
} & T)

export type WithSize<SIZE_TYPE = {}, T = {}> = T & { size?: SIZE_TYPE }

export type WithDimensions<T = {}, S extends undefined | number = undefined> = T & ({
  width: number
  height: number
} | {
  width: S
  height: S
})
