'use client'

import React, { useEffect, useState } from 'react'

import type { OptimisticFriends } from '@OBSHCHAK-UI/app/_client-hooks'
import { useFilters, useFriends } from '@OBSHCHAK-UI/app/_client-hooks'
import { User } from '@OBSHCHAK-UI/app/(routes)/(authorized-user-ui)/friends/user'
import {
  FilterBar,
  FullHeightNonScrollableContainer,
  ListItemTiltable,
  ScrollableBarlessList,
} from '@OBSHCHAK-UI/app/_components'
import type { Maybe, ObshchakUser } from 'app-common'
import { isEmpty, userDataMock } from 'app-common'
import { useSession } from 'next-auth/react'
import { match } from 'ts-pattern'
import { entries } from 'app-common/lib/types'
import type { DropdownMenuProps } from '@OBSHCHAK-UI/app/_components/dropdown-menu'

interface UserFilters {
  search: string
}

const fuzzySearch = (search: string, user: object) =>
  Object
    .values(user)
    .join('')
    .toLowerCase()
    .includes(search.toLowerCase())

const filterFriends = (users: Maybe<OptimisticFriends>, filters: Partial<UserFilters>): Maybe<OptimisticFriends> =>
  users && entries(users)
    .reduce<ReturnType<typeof filterFriends>>(
      (acc, [id, user]) => {
        const userMatchesStringSearch = !filters.search || fuzzySearch(filters.search, user)
        return userMatchesStringSearch ? { ...acc, [id]: user } : acc
      },
      {},
    )


const FriendsListSkeleton = () => {
  return (
    <ScrollableBarlessList>
      {Array.from({ length: 3 }).map((_, i) => (
        <ListItemTiltable key={i}>
          <User isLoading={true} />
        </ListItemTiltable>
      ))}
    </ScrollableBarlessList>
  )

}
export const FriendsList: React.FC = () => {

  const { data: session, status } = useSession()

  const {
    friends,
    addFriend,
    removeFriend,
  } = useFriends({ userId: userDataMock().id })

  const { filters, updateFilters } = useFilters<UserFilters>()
  const [filteredFriends, setFilteredFriends] = useState<Maybe<OptimisticFriends>>(friends)

  useEffect(() => {
    const filtered = filterFriends(friends, filters)
    setFilteredFriends(filtered)
  }, [filters, friends])

  const handleSearchChange = (value: string) => {
    updateFilters({ search: value })
  }

  const friendActions = (friend: ObshchakUser): DropdownMenuProps['namedCallbacks'] => {

    return {
      remove: {
        name: 'Remove a friend',
        callback: () => removeFriend(friend),
      },
      createTransaction: {
        name: 'Create a transaction',
        callback: async () => console.log('createTransaction'),
      },
      createGroup: {
        name: 'Create a group',
        callback: async () => console.log('createGroup'),
      },
    }
  }

  return (
    <FullHeightNonScrollableContainer>
      <FilterBar searchValue={filters.search ?? ''} onSearchChange={handleSearchChange} />

      <ScrollableBarlessList>
        <>{
          match(filteredFriends)
            .with(undefined, null, () => <FriendsListSkeleton />) // TODO: add loading
            .when(isEmpty, () => <div>no friends</div>) // TODO: add no friends view
            .otherwise(friends => (entries(friends))
              .map(([id, friend]) => (
                <ListItemTiltable key={id}>
                  <User
                    user={friend}
                    actions={friendActions(friend)}
                    pending={friend.pending}
                  />
                </ListItemTiltable>
              )))
        }</>
      </ScrollableBarlessList>
    </FullHeightNonScrollableContainer>
  )
}
