'use client'

import React from 'react'
import { GroupItem } from '@OBSHCHAK-UI/app/_components/groups/group-item'
import { ScrollableBarlessList, ListItemTiltable } from '@OBSHCHAK-UI/app/_components'


// group-list ts
interface GroupsListProps {
  groups: any[] // FIXME: tmp solution before types are in app-common
}

export const GroupsList: React.FC<GroupsListProps> = ({ groups }) =>
  <ScrollableBarlessList>
    {groups.map((group) => (
      <ListItemTiltable key={group.id}>
        <GroupItem group={group} />
      </ListItemTiltable>
    ))}
  </ScrollableBarlessList>
