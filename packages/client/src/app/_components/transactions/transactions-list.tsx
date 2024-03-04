import React from 'react'
import { ListItemTiltable, ScrollableBarlessList, TransactionItem } from '@OBSHCHAK-UI/app/_components'
import type { Loadable, Transaction } from 'app-common'


type TransactionsSkeletonProps = React.PropsWithChildren<{
  numberOfItems?: number
}>
const TransactionsSkeleton: React.FC<TransactionsSkeletonProps> = ({children, numberOfItems = 3}) => {
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
  transactions: Transaction[]
}>

export const TransactionsList: React.FC<TransactionsListProps> = ({ isLoading, transactions }) => {

  if (isLoading) {
    return <TransactionsSkeleton />
  }

  if (transactions === undefined) {
    return <div>PROBABLY AN UNHANDLED ERROR</div>
  }

  return (
    transactions.map((transaction) => (
      <ListItemTiltable key={transaction.id}>
        <TransactionItem transaction={transaction} />
      </ListItemTiltable>
    ))
  )
}
