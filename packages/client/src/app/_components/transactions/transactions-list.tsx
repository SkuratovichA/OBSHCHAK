import React from 'react'
import { ListItemTiltable, ScrollableBarlessList, TransactionItem } from '@OBSHCHAK-UI/app/_components'
import { Loadable, Transaction } from 'app-common'


const TransactionsSkeleton: React.FC = () => {
  return (
    <ScrollableBarlessList>
      <ListItemTiltable>
        <TransactionItem isLoading={true} />
      </ListItemTiltable>
      <ListItemTiltable>
        <TransactionItem isLoading={true} />
      </ListItemTiltable>
      <ListItemTiltable>
        <TransactionItem isLoading={true} />
      </ListItemTiltable>
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
