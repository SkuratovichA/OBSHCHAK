'use client'

import React from 'react'

import { useSwr } from '@OBSHCHAK-UI/app/_client-hooks'
import { DebtsPage, DebtsPageSkeleton } from '@OBSHCHAK-UI/app/_components'
import type { DebtsResponse, DebtsSearchParams } from '@OBSHCHAK-UI/app/api/debts/utils'
import { nextEndpointsMap } from 'app-common'

const Page: React.FC = () => {
  const { data: debts } = useSwr<DebtsSearchParams, DebtsResponse>(nextEndpointsMap.DEBTS(), {
    usernames: [],
    groups: [],
  })

  // TODO: we need to have another layer of abstraction (xD) here and
  //  fetch the data first based on the username
  //  and then pass the debts to the component
  //  component should be suspended while fetching the data btw.
  if (!debts) {
    return <DebtsPageSkeleton />
  }

  return <DebtsPage debts={debts} />
}
export default Page
