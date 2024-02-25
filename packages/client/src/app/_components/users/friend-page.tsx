'use client'

import React, { useMemo } from 'react'
import useSWR, { State } from 'swr'
import styled from '@emotion/styled'

import {
  BaseTransactionsPage,
  GroupsList,
  ScrollableBarlessList,
  UserProfile,
} from '@OBSHCHAK-UI/app/_components'
import { fetcher, LoadingProvider } from '@OBSHCHAK-UI/app/_client-hooks'
import type { UserSearchParams, UsersSearchResponse } from '@OBSHCHAK-UI/app/api/users/route'
import type { TransactionsSearchResponse } from '@OBSHCHAK-UI/app/api/transactions/route'
import type { GroupsSearchResponse } from '@OBSHCHAK-UI/app/api/groups/route'

export interface FriendPageProps {
  username: string
}

const suspendWithNoFallback = {
  // suspense: true,
  // fallbackData: null,
}

export const FriendPage: React.FC<FriendPageProps> = ({ username }) => {
  const usernames: UserSearchParams = { usernames: [username] }

  const swrCallback = useMemo(() => {
    return function <T, S>([uri, params]: [string, T]) {
      return fetcher<T, S>(uri, params)
    }
  }, [])

  const { data: users, isLoading: isLoadingUser, error: errorUser } = useSWR(
    [`/api/users`, usernames],
    swrCallback,
    suspendWithNoFallback,
  ) as State<UsersSearchResponse>

  const { data: transactions, isLoading: isLoadingTransactions, error: errorTransactions } = useSWR(
    [`/api/transactions`, usernames],
    swrCallback,
    suspendWithNoFallback,
  ) as State<TransactionsSearchResponse>

  const { data: groups, isLoading: isLoadingGroups, error: errorGroups } = useSWR(
    [`/api/groups`, usernames],
    swrCallback,
    suspendWithNoFallback,
  ) as State<GroupsSearchResponse>

  return (
    <ScrollableBarlessList>
      <LoadingProvider isLoading={!!isLoadingUser}>
        <UserProfile user={users && users.length ? users[0] : undefined} />
      </LoadingProvider>

      <LoadingProvider isLoading={!!isLoadingTransactions}>
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

const FriendsTransactions = styled(BaseTransactionsPage)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
`
