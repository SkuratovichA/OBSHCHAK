export type Function<Props = void, Result = void> = (props: Props) => Result
export type AsyncFunction<Props = void, Result = void> = (props: Props) => Promise<Result>

export type Defined<T> = Required<{
  [P in keyof T]-?: Exclude<T[P], undefined>
}>
export type Undefined<T> = Partial<Record<keyof T, undefined>>

// either all are defined or all are undefined
export type Optional<T> = T extends object
  ?
      | Undefined<T>
      | {
          [P in keyof T]: T[P]
        }
  : Partial<T>

export type Maybe<T> = T | undefined | null
export type AsArray<T extends object> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
