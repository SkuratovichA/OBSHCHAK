import React from 'react'

import { transactionsMock } from 'app-common'
import { BaseTransactionsPage } from '@OBSHCHAK-UI/app/_components'
import { LoadingProvider } from '@OBSHCHAK-UI/app/_client-hooks'

const Page: React.FC = () => {
  // TODO: we need to have another layer of abstraction (xD) here and
  //  fetch the data first based on the username
  //  and then pass the transactions to the component
  //  component should be suspended while fetching the data btw.
  return (
    <LoadingProvider isLoading={false}>
      <BaseTransactionsPage transactions={transactionsMock()} />
    </LoadingProvider>
  )
}
export default Page
