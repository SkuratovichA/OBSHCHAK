'use client'

import React, { useMemo } from 'react'
import type {
  FilterContextTypeBase, FilterFn} from '@OBSHCHAK-UI/app/_client-hooks';
import { useLoading,
} from '@OBSHCHAK-UI/app/_client-hooks'
import {
  useFiltering,
} from '@OBSHCHAK-UI/app/_client-hooks'
import { FilterBar, FullHeightNonScrollableContainer, TransactionsList } from '@OBSHCHAK-UI/app/_components'
import type { Defined, Maybe, Transaction, Undefined } from 'app-common'
import { entries } from 'app-common'
import { TransactionStatusType } from 'app-common'
import type { TransactionsResponse } from '@OBSHCHAK-UI/app/api/transactions/route'

interface TransactionFilters extends FilterContextTypeBase {
  search: string
  status: keyof typeof TransactionStatusType | ''
}

enum FilterType {
  'Filter by' = 'Filter by',
}

const filtersToKeyMap: Record<FilterType, keyof Transaction> = {
  [FilterType['Filter by']]: 'status',
}

const filterTransactions: FilterFn<Maybe<TransactionsResponse>, TransactionFilters> = (
  transactions,
  filters,
): Maybe<TransactionsResponse> =>
  entries(transactions).reduce((acc, [id, transaction]) => {
    const matchesStatus = !filters.status ||
      transaction.status === TransactionStatusType[filters.status as keyof typeof TransactionStatusType]

    const matchesSearch = !filters.search ||
      Object.values(transaction).join('').toLowerCase().includes(filters.search.toLowerCase())

    return matchesStatus && matchesSearch ? { ...acc, [id]: transaction } : acc
  }, {})

const TransactionsPageSkeleton = () => {
  return (
    <FullHeightNonScrollableContainer>
      <FilterBar filterOptions={[]} onFilterChange={() => {
      }} searchValue="" onSearchChange={() => {
      }} />
      <TransactionsList isLoading={true} />
    </FullHeightNonScrollableContainer>
  )
}

interface TransactionPageProps {
  transactions: Maybe<TransactionsResponse>
}

export const TransactionsPage: React.FC<TransactionPageProps> = ({ transactions }) => {

  const result = useFiltering({
    items: transactions,
    filteringFunction: filterTransactions,
  })

  const { isLoading } = useLoading()

  const { updateFilters, filteredItems: filteredTransactions, filters } = isLoading
    ? result
    : (result as Defined<typeof result>) // that's weird that this isn't enough to make it defined

  const handleFilterChange = (filterName: FilterType, value: keyof Transaction) => {
    updateFilters!({ [filtersToKeyMap[filterName]]: value })
  }

  const handleSearchChange = (value: string) => {
    updateFilters!({ search: value })
  }

  // TODO: come up with some grouping solution
  const filterOptions = useMemo(
    () => (filters: Partial<TransactionFilters>) => [{
      name: FilterType['Filter by'],
      values: { None: '', Paid: 'Paid', Active: 'Active', Pending: 'Pending' },
      selectedValue: filters.status ?? '', // Use the status filter value here
    }],
    [],
  )

  if (isLoading) {
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

      {/*try do it w/o !*/}
      <TransactionsList transactions={filteredTransactions!} />
    </FullHeightNonScrollableContainer>
  )
}
