'use client'

import React, { useEffect, useMemo, useState } from 'react'


import { FiltersProvider, useFilters } from '@OBSHCHAK-UI/app/_client-hooks'
import { FilterBar, FullHeightNonScrollableContainer, TransactionsList } from '@OBSHCHAK-UI/app/_components'
import type { Transaction } from 'app-common'
import { TransactionStatusType } from 'app-common'

interface TransactionsListProps {
  transactions: Transaction[]
}

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

const filterTransactions = (
  transactions: Transaction[],
  filters: TransactionFilters,
): Transaction[] =>
  transactions.filter((transaction) => {
    const matchesStatus =
      !filters.status ||
      transaction.status === TransactionStatusType[filters.status as keyof typeof TransactionStatusType]

    const matchesSearch =
      !filters.search ||
      Object.values(transaction).join('').toLowerCase().includes(filters.search.toLowerCase())

    return matchesStatus && matchesSearch
  })

const TransactionsPage: React.FC<TransactionsListProps> = ({ transactions }) => {
  const { filters, updateFilters } = useFilters<TransactionFilters>()
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions)

  useEffect(() => {
    const filtered = filterTransactions(transactions, filters)
    setFilteredTransactions(filtered)
  }, [filters, transactions])

  const handleFilterChange = (filterName: FilterType, value: keyof Transaction) => {
    updateFilters({ [filtersToKeyMap[filterName]]: value })
  }

  const handleSearchChange = (value: string) => {
    updateFilters({ search: value })
  }

  // TODO: come up with some grouping solution
  const filterOptions = useMemo(
    () => [
      {
        name: FilterType['Filter by'],
        values: { None: '', Paid: 'Paid', Active: 'Active', Pending: 'Pending' },
        selectedValue: filters.status || '', // Use the status filter value here
      },
    ],
    [filters.status],
  )

  return (
    <FullHeightNonScrollableContainer>
      <FilterBar
        filterOptions={filterOptions}
        // TODO: maybe go with hooks to make it more type-safe. tbd in the future versions if there are any
        onFilterChange={(filterName, value) =>
          handleFilterChange(filterName as FilterType, value as keyof Transaction)
        }
        searchValue={filters.search || ''}
        onSearchChange={handleSearchChange}
      />

      <TransactionsList transactions={filteredTransactions} />
    </FullHeightNonScrollableContainer>
  )
}

export const BaseTransactionsPage: React.FC<TransactionsListProps> = ({ transactions }) =>
  <FiltersProvider>
    <TransactionsPage transactions={transactions} />
  </FiltersProvider>
