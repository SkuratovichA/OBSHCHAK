import React, { useState } from 'react'
import {
  ScrollableBarlessList,
  ListItemTiltable,
  TiltedContainer,
  ListItemContainer,
  FullHeightNonScrollableContainer,
  GroupItem,
} from '@OBSHCHAK-UI/app/_components'
import { Box, Skeleton } from '@mui/material'
import type { Group } from 'app-common'
import { entries, isSomeEmpty } from 'app-common'
import type { GroupsMap } from '@OBSHCHAK-UI/app/api/groups/utils'
import type { DropdownMenuProps } from '@OBSHCHAK-UI/app/_components/dropdown-menu'
import { match } from 'ts-pattern'
import { useGroups } from '@OBSHCHAK-UI/app/_client-hooks/use-groups'

export const GroupListSkeleton = () => {
  return (
    <ScrollableBarlessList>
      {Array.from({ length: 3 }).map((_, i) => (
        <ListItemTiltable key={i}>
          <GroupSkeleton />
        </ListItemTiltable>
      ))}
    </ScrollableBarlessList>
  )
}

const GroupSkeleton = () => {
  return (
    <TiltedContainer>
      <ListItemContainer elevation={1}>
        <Skeleton variant="circular" width={40} height={40} />

        <Box sx={{ flex: 1, ml: 2 }}>
          <Skeleton variant="text" width={'20ch'} />
          <Skeleton variant="text" width={'10ch'} />
        </Box>
      </ListItemContainer>
    </TiltedContainer>
  )
}

type GroupsListProps = {
  groups: GroupsMap
}
export const GroupsList: React.FC<GroupsListProps> = ({
  groups,
}) => {

  const { deleteGroup, updateGroup, createGroup } = useGroups(groups)

  const [filteredGroups, setFlteredGroups] = useState<GroupsMap>(groups)

  // TODO: group filtering (tbd in the future)
  // const { filters, updateFilters } = useFilters<GroupFilters>()
  // useEffect(() => {
  //   const filtered = filterGroups(groups, filters)
  //   setFilteredGroups(filtered)
  // }, [filters, groups])

  // const handleSearchChange = (value: string) => {
  //   updateFilters({ search: value })
  // }

  const groupActions = (group: Group): DropdownMenuProps['namedCallbacks'] => ({
    delete: {
      name: 'Delete group',
      callback: () => deleteGroup(group),
    },
    createDebt: {
      name: 'Create a debt',
      callback: async () => createGroup(group),
    },
    addMembers: {
      name: 'Add members',
      callback: async () => console.log('addMembers'),
    },
  })

  return (
    <FullHeightNonScrollableContainer>
      {/*<FilterBar searchValue={filters.search ?? ''} onSearchChange={handleSearchChange} />*/}

      <ScrollableBarlessList>
        <>
          {match(filteredGroups)
            .when(isSomeEmpty, () => <div>No groups</div>) // Show "No groups" message when there are no groups
            .otherwise((groups) =>
              entries(groups).map(([id, group]) => (
                <ListItemTiltable key={id}>
                  <GroupItem group={group} actions={groupActions(group)} />
                </ListItemTiltable>
              )),
            )}
        </>
      </ScrollableBarlessList>
    </FullHeightNonScrollableContainer>
  )
}
