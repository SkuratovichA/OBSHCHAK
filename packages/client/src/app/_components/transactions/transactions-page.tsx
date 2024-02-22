'use client'

import React, { useMemo } from 'react'
import {
  FilterTransactionsFn,
  TransactionsProvider,
  useTransactions,
} from '@OBSHCHAK-UI/app/_client-hooks'
import { FilterBar, FullHeightNonScrollableContainer, TransactionsList } from '@OBSHCHAK-UI/app/_components'
import type { Defined, Transaction, Undefined } from 'app-common'
import { TransactionStatusType } from 'app-common'
import { isNil } from 'lodash'

interface TransactionFilters {
  search: string
  status: keyof typeof TransactionStatusType | ''
}

enum FilterType {
  'Filter by' = 'Filter by',
}

const filtersToKeyMap: Record<FilterType, keyof Transaction> = {
  [FilterType['Filter by']]: 'status',
}

const filterTransactions: FilterTransactionsFn<TransactionFilters>  = (
  transactions,
  filters,
) =>
  transactions?.filter((transaction) => {
    const matchesStatus =
      !filters.status ||
      transaction.status === TransactionStatusType[filters.status as keyof typeof TransactionStatusType]

    const matchesSearch =
      !filters.search ||
      Object.values(transaction).join('').toLowerCase().includes(filters.search.toLowerCase())

    return matchesStatus && matchesSearch
  })

const TransactionsPageSkeleton = () => {
  return (
    <FullHeightNonScrollableContainer>
      <FilterBar filterOptions={[]} onFilterChange={() => {}} searchValue="" onSearchChange={() => {}} />
      <TransactionsList isLoading={true} />
    </FullHeightNonScrollableContainer>
  )
}


const isUndefined = (value: any): value is undefined => isNil(value)

const TransactionsPage: React.FC = () => {
  const { isLoading, ...useTransactionsRest } = useTransactions<TransactionFilters>({
     filteringFunction: filterTransactions,
  })

  const { filters, updateFilters, filteredTransactions } = isLoading
    ? useTransactionsRest as Undefined<typeof useTransactionsRest>
    : useTransactionsRest as Defined<typeof useTransactionsRest> // that's weird that this isn't enough to make it defined

  const handleFilterChange = (filterName: FilterType, value: keyof Transaction) => {
    updateFilters!!({ [filtersToKeyMap[filterName]]: value })
  }

  const handleSearchChange = (value: string) => {
    updateFilters!!({ search: value })
  }

  // TODO: come up with some grouping solution
  const filterOptions = useMemo(
    () => (filters: Partial<TransactionFilters>) => [{
        name: FilterType['Filter by'],
        values: { None: '', Paid: 'Paid', Active: 'Active', Pending: 'Pending' },
        selectedValue: filters.status || '', // Use the status filter value here
    }],
    [],
  )

  if (isLoading) {
    return <TransactionsPageSkeleton />
  }

  if (isUndefined(filters) || isUndefined(filteredTransactions)) {
    // just a dummy for the TS
    return <TransactionsPageSkeleton />
  }

  return (
    <FullHeightNonScrollableContainer>
      <FilterBar
        filterOptions={filterOptions(filters)}
        // TODO: maybe go with hooks to make it more type-safe. tbd in the future versions if there are any
        onFilterChange={(filterName, value) =>
          handleFilterChange(filterName as FilterType, value as keyof Transaction)
        }
        searchValue={filters.search || ''}
        onSearchChange={handleSearchChange}
      />

      {isLoading
        ? <TransactionsList isLoading={true} />
        : <TransactionsList transactions={filteredTransactions} />
      }
    </FullHeightNonScrollableContainer>
  )
}

type TransactionsPageProps = {
  transactions: Transaction[] | undefined
}
export const BaseTransactionsPage: React.FC<TransactionsPageProps> = ({ transactions }) => (
  <TransactionsProvider
    transactions={transactions}
  >
    <TransactionsPage />
  </TransactionsProvider>
)
