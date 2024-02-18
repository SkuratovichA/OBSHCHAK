import React from 'react'
import { Typography } from '@mui/material'
import { Loadable, Transaction, TransactionStatusType } from 'app-common'

interface TransactionViewProps {
  transaction: Transaction
}

export const TransactionView: React.FC<Loadable<TransactionViewProps>> = ({ transaction, isLoading }) => {
  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <>
      <Typography id="transaction-modal-title" variant="h6" component="h2">
        {transaction.name}
      </Typography>

      <Typography>From: {transaction.from}</Typography>

      <Typography>To:</Typography>
      <ul>
        {transaction.to.map((to, idx) => (
          <li key={idx}>{to.username}</li>
        ))}
      </ul>

      <Typography>
        Amount: {transaction.amount} {transaction.currency}
      </Typography>
      <Typography>Status: {TransactionStatusType[transaction.status]}</Typography>
    </>
  )
}
