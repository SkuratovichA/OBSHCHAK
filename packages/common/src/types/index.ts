export * from './chatbot'
export * from './transactions'
export * from './old'


export type Function<Props = void, Result = void> = (props: Props) => Result
export type Undefine<T> = Partial<Record<keyof T, undefined>>
