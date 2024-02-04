'use client'

import React, { useState } from 'react'
import {
  Container,
  List,
  ListItem,
  SelectChangeEvent,
} from '@mui/material'

import { NamedCallbacks, FilterBar } from '../filter-bar'
import { transactionsMock } from '../common-mocks'
import { TransactionStatus } from '../common-mocks'
import { TransactionItem } from '@OBSHCHAK-UI/app/(routes)/(authorized-user-ui)/transaction-item'

const withNone = (obj: Object) => ({ ...obj, None: 'None' })

const TransactionsList: React.FC = () => {
  // State for filter and group-by
  const [filterBy, setFilterBy] = useState(withNone({}).None)
  const [groupBy, setGroupBy] = useState(withNone({}).None)

  // Handler functions for filter and group-by
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterBy(event.target.value as string)
  }

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    setGroupBy(event.target.value as string)
  }

  // Filter function for transactions
  const filteredTransactions = transactionsMock.filter((transaction) => {
    // Implement filtering logic here based on the filterBy state
    return true // Currently, it returns true for all transactions
  })

  const filterValues = Object.fromEntries(
    Object.keys(withNone(TransactionStatus)).map((key) => [
      key,
      () => console.log(`filtering by ${key}`),
    ]),
  ) as NamedCallbacks<keyof typeof TransactionStatus, void, void>

  const groupByValues = Object.fromEntries(
    Object.keys(
      withNone({
        Users: 1,
        Labels: 2,
        Direction: 3,
      }),
    ).map((key) => [key, () => console.log(`grouping by ${key}`)]),
  )

  // TODO: Implement grouping logic based on the groupBy state
  return (
    <Container>
      <FilterBar
        filters={filterValues}
        groupBy={groupByValues}
        search={(value: string) => {
          console.log(`searching ${value}`)
        }}
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

export default TransactionsList
