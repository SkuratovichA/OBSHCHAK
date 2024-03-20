import React from 'react'
import { ListItemTiltable, ScrollableBarlessList, DebtItem } from '@OBSHCHAK-UI/app/_components'
import type { Loadable } from 'app-common'
import { entries } from 'app-common'
import type { DebtsResponse } from '@OBSHCHAK-UI/app/api/debts/utils'

type DebtsSkeletonProps = React.PropsWithChildren<{
  numberOfItems?: number
}>
const DebtsSkeleton: React.FC<DebtsSkeletonProps> = ({ children, numberOfItems = 3 }) => {
  return (
    <ScrollableBarlessList>
      {Array.from({ length: numberOfItems }).map((_, i) => (
        <ListItemTiltable key={i}>
          <DebtItem isLoading={true} />
        </ListItemTiltable>
      ))}
    </ScrollableBarlessList>
  )
}

type DebtsListProps = Loadable<{
  itemsMap: DebtsResponse
}>

export const DebtsList: React.FC<DebtsListProps> = ({ isLoading, itemsMap }) => {
  if (isLoading) {
    return <DebtsSkeleton />
  }

  if (itemsMap === undefined) {
    return <div>PROBABLY AN UNHANDLED ERROR</div>
  }

  return entries(itemsMap).map(([id, entry]) => (
    <ListItemTiltable key={id}>
      <DebtItem item={entry} />
    </ListItemTiltable>
  ))
}
