export * from './old'
export * from './api-routes'
export * from './chatbot'

export type Function<Props = void, Result = void> = (props: Props) => Result
