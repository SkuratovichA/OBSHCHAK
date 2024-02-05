'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Container,
  List,
  ListItem,
} from '@mui/material'

import { FilterBar } from '../filter-bar'
import { Transaction, transactionsMock } from './common-mocks'
import { TransactionStatus } from './common-mocks'
import { TransactionItem } from '@OBSHCHAK-UI/app/(routes)/(authorized-user-ui)/transactions/transaction-item'
import { FiltersProvider, useFilters } from '@OBSHCHAK-UI/hooks/use-filters'


interface TransactionsListProps {
  transactions: Transaction[]
}

interface TransactionFilters {
  search: string
  status: 'Paid' | 'Active' | 'Pending' | ''
}

enum FilterType {
  'Filter by' = 'Filter by'
}

const filtersToKeyMap: Record<FilterType, keyof Transaction> = {
  [FilterType['Filter by']]: 'status',
}

const filterTransactions = (
  transactions: Transaction[],
  filters: TransactionFilters,
): Transaction[] => transactions.filter((transaction) => {
  const matchesStatus = (
    !filters.status ||
    transaction.status === TransactionStatus[filters.status as keyof typeof TransactionStatus]
  )

  const matchesSearch = (
    !filters.search ||
    Object.values(transaction)
      .join('')
      .toLowerCase()
      .includes(filters.search.toLowerCase())
  )

  return matchesStatus && matchesSearch
})

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
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
  const filterOptions = useMemo(() => [{
    name: FilterType['Filter by'],
    values: { None: '', Paid: 'Paid', Active: 'Active', Pending: 'Pending' },
    selectedValue: filters.status || '', // Use the status filter value here
  }], [filters.status])

  return (
    <Container>
      <FilterBar
        filterOptions={filterOptions}
        // TODO: maybe go with hooks to make it more type-safe. tbd in the future versions if there are any
        onFilterChange={(filterName, value) => handleFilterChange(filterName as FilterType, value as keyof Transaction)}

        searchValue={filters.search || ''}
        onSearchChange={handleSearchChange}
      />

      <List>
        {filteredTransactions.map((transaction) => (
          <ListItem
            key={transaction.id}
            style={{ borderRadius: 8, marginBottom: 8, height: 100, perspective: 10000 }}
          >
            <TransactionItem transaction={transaction} />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

const TransactionsListBase: React.FC = () => {

  return (
    <FiltersProvider>
      <TransactionsList transactions={transactionsMock} />
    </FiltersProvider>
  )
}
export default TransactionsListBase

