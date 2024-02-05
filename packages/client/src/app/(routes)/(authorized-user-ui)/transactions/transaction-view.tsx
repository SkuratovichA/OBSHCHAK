import { Typography } from '@mui/material'
import type { Transaction } from './common-mocks'
import { TransactionStatus } from './common-mocks'


interface TransactionViewProps {
  transaction: Transaction
}

export const TransactionView: React.FC<TransactionViewProps> = ({ transaction }) => {
  return <>
    <Typography id="transaction-modal-title" variant="h6" component="h2">
      {transaction.name}
    </Typography>
    <Typography>
      From: {transaction.from}
    </Typography>
    <Typography>
      To: {transaction.to}
    </Typography>
    <Typography>
      Amount: ${transaction.amount} {transaction.currency}
    </Typography>
    <Typography>
      Status: {TransactionStatus[transaction.status]}
    </Typography>
  </>
}


