import React from 'react'
import styled from '@emotion/styled'
import { Transaction } from '../common'

interface TransactionListProps {
  transactions: Transaction[];
}


export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <ListContainer>
      {transactions.map((transaction) => (
        <TransactionRow key={transaction.timestamp}>
          <div>{transaction.target}</div>
          <div>{transaction.amount} {transaction.currency}</div>
          <div>{transaction.message}</div>
          <div>{transaction.status}</div>
        </TransactionRow>
      ))}
    </ListContainer>
  )
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TransactionRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc; // adjust as necessary
`
