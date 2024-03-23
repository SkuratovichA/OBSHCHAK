import React, { useState } from 'react'
import {
  ScrollableBarlessList,
  ListItemTiltable,
  FullHeightNonScrollableContainer,
  GroupItem,
} from '@OBSHCHAK-UI/app/_components'
import { entries, isSomeEmpty } from 'app-common'
import type { GroupsMap } from '@OBSHCHAK-UI/app/api/groups/utils'
import { match } from 'ts-pattern'
import { useGroups } from '@OBSHCHAK-UI/app/_client-hooks/use-groups'

export const GroupListSkeleton = () => {
  return (
    <FullHeightNonScrollableContainer>
      <ScrollableBarlessList>
        {Array.from({ length: 3 }).map((_, i) => (
          <ListItemTiltable key={i}>
            <GroupItem isLoading />
          </ListItemTiltable>
        ))}
      </ScrollableBarlessList>
    </FullHeightNonScrollableContainer>
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
                  <GroupItem
                    group={group}
                    leaveGroup={() => deleteGroup(group)}
                  />
                </ListItemTiltable>
              )),
            )}
        </>
      </ScrollableBarlessList>
    </FullHeightNonScrollableContainer>
  )
}
