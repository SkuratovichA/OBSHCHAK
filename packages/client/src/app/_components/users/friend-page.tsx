'use client'

import React, { useMemo } from 'react'
import styled from '@emotion/styled'

import {
  TransactionsPage,
  GroupsList,
  ScrollableBarlessList,
  UserProfile,
} from '@OBSHCHAK-UI/app/_components'
import { fetcher, LoadingProvider, useSwr, useTransactions } from '@OBSHCHAK-UI/app/_client-hooks'
import type { UserSearchParams, UsersSearchResponse } from '@OBSHCHAK-UI/app/api/users/route'
import type { GroupsSearchResponse } from '@OBSHCHAK-UI/app/api/groups/route'
import { nextEndpointsMap } from 'app-common/lib/endpoints'

export interface FriendPageProps {
  username: string
}


export const FriendPage: React.FC<FriendPageProps> = ({ username }) => {
  const usernames: UserSearchParams = { usernames: [username] }

  const swrCallback = useMemo(() => {
    return function <T, S>([uri, params]: [string, T]) {
      return fetcher<T, S>(uri, params)
    }
  }, [])


  // const { data: users, isLoading: isLoadingUser, error: errorUser } = useSWR(
  //   [`/api/users`, usernames],
  //   swrCallback,
  //   {},
  // ) as State<UsersSearchResponse>
  const {
    data: users, isLoading: isLoadingUser, error: errorUser
  } = useSwr<UserSearchParams, UsersSearchResponse>(
    nextEndpointsMap.USERS(), usernames
  )

  const {
    transactions,
  } = useTransactions({ friendId: username })

  const {
    data: groups, isLoading: isLoadingGroups, error: errorGroups
  } = useSwr<UserSearchParams, GroupsSearchResponse>(
    nextEndpointsMap.GROUPS(), usernames
  )

  return (
    <ScrollableBarlessList>
      <LoadingProvider isLoading={!!isLoadingUser}>
        <UserProfile user={users?.length ? users[0] : undefined} />
      </LoadingProvider>

      <LoadingProvider isLoading={!transactions}>
        <FriendsTransactions transactions={transactions} />
      </LoadingProvider>

      <LoadingProvider isLoading={!!isLoadingGroups}>
        <GroupsList
          groups={groups}
        />
      </LoadingProvider>
    </ScrollableBarlessList>
  )
}

const FriendsTransactions = styled(TransactionsPage)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
`
