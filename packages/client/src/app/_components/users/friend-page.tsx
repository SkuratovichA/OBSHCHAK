'use client'

import React from 'react'
import styled from '@emotion/styled'
import { nextEndpointsMap } from 'app-common'

import {
  DebtsPage,
  GroupsList,
  ScrollableBarlessList,
  UserProfile,
} from '@OBSHCHAK-UI/app/_components'
import { LoadingProvider, useSwr, useDebts } from '@OBSHCHAK-UI/app/_client-hooks'
import type { UserSearchParams, UsersSearchResponse } from '@OBSHCHAK-UI/app/api/users/route'
import type { GroupsSearchResponse } from '@OBSHCHAK-UI/app/api/groups/route'

export interface FriendPageProps {
  username: string
}

export const FriendPage: React.FC<FriendPageProps> = ({ username }) => {
  const usernames: UserSearchParams = { usernames: [username] }

  const {
    data: users,
    isLoading: isLoadingUser,
  } = useSwr<UserSearchParams, UsersSearchResponse>(nextEndpointsMap.USERS(), usernames)

  const { debts } = useDebts({ usernames: [username] })

  const {
    data: groups,
    isLoading: isLoadingGroups,
  } = useSwr<UserSearchParams, GroupsSearchResponse>(nextEndpointsMap.GROUPS(), usernames)

  return (
    <ScrollableBarlessList>
      <LoadingProvider isLoading={!!isLoadingUser}>
        <UserProfile user={users?.length ? users[0] : undefined} />
      </LoadingProvider>

      <LoadingProvider isLoading={!debts}>
        <FriendsDebts items={debts} />
      </LoadingProvider>

      <LoadingProvider isLoading={!!isLoadingGroups}>
        <GroupsList groups={groups} />
      </LoadingProvider>
    </ScrollableBarlessList>
  )
}

const FriendsDebts = styled(DebtsPage)`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`
