'use client'

import React from 'react'

import { LoadingProvider, useTransactions } from '@OBSHCHAK-UI/app/_client-hooks'
import { TransactionsPage } from '@OBSHCHAK-UI/app/_components'

const Page: React.FC = () => {

  const {
    transactions
  } = useTransactions()
  // TODO: we need to have another layer of abstraction (xD) here and
  //  fetch the data first based on the username
  //  and then pass the transactions to the component
  //  component should be suspended while fetching the data btw.
  return (
    <LoadingProvider isLoading={!transactions}>
      <TransactionsPage transactions={transactions} />)
    </LoadingProvider>
  )
}
export default Page
