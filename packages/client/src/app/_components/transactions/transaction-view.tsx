import React from 'react'
import { Typography } from '@mui/material'
import { getTransactionAmount, Transaction, TransactionStatusType } from 'app-common'

interface TransactionViewProps {
  transaction: Transaction
}

export const TransactionView: React.FC<TransactionViewProps> = ({ transaction }) => {
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
        Amount: ${getTransactionAmount(transaction)} {transaction.currency}
      </Typography>
      <Typography>Status: {TransactionStatusType[transaction.status]}</Typography>
    </>
  )
}
