'use client'

import React, { useEffect, useState } from 'react'

import {
  FullHeightNonScrollableContainer,
  FilterBar,
  ScrollableBarlessList,
  ListItemTiltable,
} from '@OBSHCHAK-UI/components'
import { FiltersProvider, useFilters } from '@OBSHCHAK-UI/hooks/use-filters'

import { friendsMock, UserMockType } from './friends-mock'
import { User } from './user'

interface UserFilters {
  search: string
}

const filterFriends = (users: UserMockType[], filters: UserFilters): UserMockType[] =>
  users.filter(
    (user) =>
      !filters.search ||
      Object.values(user).join('').toLowerCase().includes(filters.search.toLowerCase()),
  )

interface UsersListProps {
  friends: UserMockType[]
}

const FriendsList: React.FC<UsersListProps> = ({ friends }) => {
  const { filters, updateFilters } = useFilters<UserFilters>()
  const [filteredFriends, setFilteredFriends] = useState<UserMockType[]>(friends)

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

const FriendsListBase: React.FC = () => {
  return (
    <FiltersProvider>
      <FriendsList friends={friendsMock} />
    </FiltersProvider>
  )
}
export default FriendsListBase
