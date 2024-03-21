'use client'
import React from 'react'
import type { Group, Pendable } from 'app-common'
import type { DropdownMenuProps } from '@OBSHCHAK-UI/app/_components/dropdown-menu'
import { Typography } from '@mui/material'

type GroupItemProps = Pendable<{
  group: Group
  actions: DropdownMenuProps['namedCallbacks']
}>
export const GroupItem: React.FC<GroupItemProps> = ({ group }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: '#ebebeb',
        borderRadius: '10px',
        padding: '10px',
      }}
    >
      <div>
        <Typography variant={'h6'}>
          {group.name}
        </Typography>

        <Typography variant={'caption'}>
          {group.description}
        </Typography>

        <Typography variant={'caption'}>
          {new Date(group.creationDate).toLocaleDateString()}
        </Typography>
      </div>

      <p>
        admin: {JSON.stringify(group.admin)}
      </p>

      <p>
        creation date: {JSON.stringify(group.creationDate)}
      </p>

      <div>
        {group.members.length} members
      </div>

    </div>
  )
}
