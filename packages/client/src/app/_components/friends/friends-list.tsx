'use client'

import React, { useEffect, useState } from 'react'

import { useFilters } from '@OBSHCHAK-UI/app/_client-hooks'
import { User } from '@OBSHCHAK-UI/app/(routes)/(authorized-user-ui)/friends/user'
import {
  FilterBar,
  FullHeightNonScrollableContainer,
  ListItemTiltable,
  ScrollableBarlessList,
} from '@OBSHCHAK-UI/app/_components'
import { ObshchakUser } from 'app-common'

interface UserFilters {
  search: string
}

const filterFriends = (users: ObshchakUser[], filters: UserFilters): ObshchakUser[] =>
  users.filter(
    (user) =>
      !filters.search ||
      Object.values(user).join('').toLowerCase().includes(filters.search.toLowerCase()),
  )

interface UsersListProps {
  friends: ObshchakUser[]
}

export const FriendsList: React.FC<UsersListProps> = ({ friends }) => {
  const { filters, updateFilters } = useFilters<UserFilters>()
  const [filteredFriends, setFilteredFriends] = useState<ObshchakUser[]>(friends)

  useEffect(() => {
    const filtered = filterFriends(friends, filters)
    setFilteredFriends(filtered)
  }, [filters, friends])

  const handleSearchChange = (value: string) => {
    updateFilters({ search: value })
  }

  return (
    <FullHeightNonScrollableContainer>
      <FilterBar searchValue={filters.search || ''} onSearchChange={handleSearchChange} />

      <ScrollableBarlessList>
        {filteredFriends.map((friend) => (
          <ListItemTiltable key={friend.id}>
            <User user={friend} />
          </ListItemTiltable>
        ))}
      </ScrollableBarlessList>
    </FullHeightNonScrollableContainer>
  )
}
