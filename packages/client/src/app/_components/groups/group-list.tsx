'use client'

import React from 'react'
import { GroupItem } from '@OBSHCHAK-UI/app/_components/groups/group-item'
import { ScrollableBarlessList, ListItemTiltable } from '@OBSHCHAK-UI/app/_components'
import { useLoading } from '@OBSHCHAK-UI/app/_client-hooks'
import { isNil } from 'lodash'


// group-list ts
interface GroupsListProps {
  // TODO: tbd
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groups: any[] | undefined // FIXME: tmp solution before types are in app-common
}

export const GroupsList: React.FC<GroupsListProps> = ({ groups }) =>{

  const { isLoading } = useLoading()

  if (isLoading) {
    return <div>Group list is loading - return a skeleton TODO</div>
  }

  if (isNil(groups)) {
    return <div>PROBABLY AN UNHANDLED ERROR</div>
  }

  return (
    <ScrollableBarlessList>
      {groups.map((group) => (
        <ListItemTiltable key={group.id}>
          <GroupItem group={group} />
        </ListItemTiltable>
      ))}
    </ScrollableBarlessList>
  )
}
