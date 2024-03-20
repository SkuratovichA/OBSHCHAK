'use client'

import React from 'react'

import { LoadingProvider, useDebts } from '@OBSHCHAK-UI/app/_client-hooks'
import { DebtsPage } from '@OBSHCHAK-UI/app/_components'

const Page: React.FC = () => {
  const { debts } = useDebts()
  // TODO: we need to have another layer of abstraction (xD) here and
  //  fetch the data first based on the username
  //  and then pass the debts to the component
  //  component should be suspended while fetching the data btw.
  return (
    <LoadingProvider isLoading={!debts}>
      <DebtsPage items={debts} />)
    </LoadingProvider>
  )
}
export default Page
