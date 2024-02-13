'use client'

import React from 'react'
import { ListItemTiltable, ScrollableBarlessList, TransactionItem } from '@OBSHCHAK-UI/app/_components'


interface TransactionsListProps {
  transactions: any[] // FIXME: tmp solution
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) =>
  <ScrollableBarlessList>
    {transactions.map((transaction) => (
      <ListItemTiltable key={transaction.id}>
        <TransactionItem transaction={transaction} />
      </ListItemTiltable>
    ))}
  </ScrollableBarlessList>

