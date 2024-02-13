import { Transaction } from './types'

export * from './config'
export * from './types'
export * from './websockets'
export * from './utils'
export * from './mocks'

export const getTransactionAmount = (t: Transaction) => t.to.map((to) => to.amount).reduce((a, b) => a + b, 0)
