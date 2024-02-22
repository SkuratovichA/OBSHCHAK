import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { isFunction, isNil } from 'lodash'

import type { Loadable, Maybe, Transaction } from 'app-common'
import { FilterContextTypeBase } from '@OBSHCHAK-UI/app/_client-hooks/use-filters'


interface TransactionsContext {
  transactions: Maybe<Transaction[]>
}

const TransactionsContext = createContext<Maybe<TransactionsContext>>(undefined)

export type FilterTransactionsFn<T extends FilterContextTypeBase> = (transactions: Maybe<Transaction[]>, filters: Partial<T>) => Maybe<Transaction[]>

type TransactionProviderProps = React.PropsWithChildren<{
  transactions: Maybe<Transaction[]>
}>

export const TransactionsProvider: React.FC<TransactionProviderProps> = ({ children, transactions, }) => {
  return (
    <TransactionsContext.Provider
      value={{
        transactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

const useFilters = <T extends FilterContextTypeBase>() => {
  const [filters, setFilters] = useState<Partial<T>>({})
  const updateFilters = useCallback((update: Partial<T> | ((oldFilters: Partial<T>) => Partial<T>)) => {
    setFilters((oldFilters) => isFunction(update) ? update(oldFilters) : { ...oldFilters, ...update })
  }, [])

  return { filters, updateFilters }
}


type UseTransactionsFnProps<T extends FilterContextTypeBase> = {
  filteringFunction: FilterTransactionsFn<T>
}

type UseTransactionsFnResult<T extends FilterContextTypeBase> = Loadable<
  ReturnType<typeof useFilters<T>> & {
  filteredTransactions: Transaction[]
}>

export const useTransactions = <T extends FilterContextTypeBase, >({ filteringFunction }: UseTransactionsFnProps<T>): UseTransactionsFnResult<T> => {
  const transactionsContext = useContext(TransactionsContext)
  if (isNil(transactionsContext)) {
    throw new Error('useTransactions must be used within WebsocketProvider')
  }

  const { filters, updateFilters } = useFilters<T>()
  const transactions = transactionsContext.transactions

  const [filteredTransactions, setFilteredTransactions] = useState<Maybe<Transaction[]>>(transactions)

  useEffect(() => {
    const filtered = filteringFunction(transactions, filters)
    setFilteredTransactions(filtered)
  }, [filteringFunction, filters, transactions])


  if (isNil(filteredTransactions)) {
    return { isLoading: true }
  }

  console.log(
    'initial transactions: ', transactions, '\n',
    'filters: ', filters, '\n',
    'filteredTransactions: ', filteredTransactions,
  )

  return {
    filteredTransactions,
    updateFilters,
    filters,
  }
}
