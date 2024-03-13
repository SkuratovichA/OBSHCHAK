import React from 'react'
import { ListItemTiltable, ScrollableBarlessList, TransactionItem } from '@OBSHCHAK-UI/app/_components'
import type { Loadable } from 'app-common'
import { entries } from 'app-common'
import type { TransactionsResponse } from '@OBSHCHAK-UI/app/api/transactions/route'


type TransactionsSkeletonProps = React.PropsWithChildren<{
  numberOfItems?: number
}>
const TransactionsSkeleton: React.FC<TransactionsSkeletonProps> = ({ children, numberOfItems = 3 }) => {
  return (
    <ScrollableBarlessList>
      {Array.from({ length: numberOfItems }).map((_, i) => (
        <ListItemTiltable key={i}>
          <TransactionItem isLoading={true} />
        </ListItemTiltable>
      ))}
    </ScrollableBarlessList>
  )
}

type TransactionsListProps = Loadable<{
  transactions: TransactionsResponse
}>

export const TransactionsList: React.FC<TransactionsListProps> = ({ isLoading, transactions }) => {

  if (isLoading) {
    return <TransactionsSkeleton />
  }

  if (transactions === undefined) {
    return <div>PROBABLY AN UNHANDLED ERROR</div>
  }

  return (
    entries(transactions).map(([id, transaction]) => (
      <ListItemTiltable key={id}>
        <TransactionItem transaction={transaction} />
      </ListItemTiltable>
    ))
  )
}
