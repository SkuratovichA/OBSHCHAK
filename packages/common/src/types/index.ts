export * from './chatbot'
export * from './transactions'
export * from './old'


export type Function<Props = void, Result = void> = (props: Props) => Result

export type Defined<T> = Required<{
  [P in keyof T]-?: Exclude<T[P], undefined>
}>
export type Undefined<T> = Partial<Record<keyof T, undefined>>

// either all are defined or all are undefined
export type Optional<T> = T extends object ? Undefined<T> | {
  [P in keyof T]: T[P]
} : Partial<T>


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

export type Maybe<T> = T | undefined | null
