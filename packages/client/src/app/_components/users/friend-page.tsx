'use client'

import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import type { ObshchakUser } from 'app-common'
import { nextEndpointsMap } from 'app-common'

import {
  DebtsPage, GroupListSkeleton,
  GroupsList,
  ScrollableBarlessList,
  UserProfile,
} from '@OBSHCHAK-UI/app/_components'
import { LoadingProvider, useSwr, useDebts } from '@OBSHCHAK-UI/app/_client-hooks'
import type { UserSearchParams, UsersSearchResponse } from '@OBSHCHAK-UI/app/api/users/route'
import type { GroupsRequestBody, GroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils';
import { deserializeGroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { match, P } from 'ts-pattern'

export type FriendPageProps = {
  username: ObshchakUser['username']
}

// TODO: move friends fetching outside the hook
export const FriendPage: React.FC<FriendPageProps> = ({ username }) => {
  const usernames = { usernames: [username] }

  const { data: users, isLoading: isLoadingUser } = useSwr<UserSearchParams, UsersSearchResponse>(
    nextEndpointsMap.USERS(),
    usernames,
  )

  const { debts } = useDebts({ usernames: [username] })

  const {
    data: groupsSerialized,
    isLoading: isGroupsloading,
    isValidating: isGroupsValidating,
  } = useSwr<GroupsRequestBody, GroupsResponse>(
    nextEndpointsMap.GROUPS(),
    usernames,
  )
  const groups = useMemo(() => groupsSerialized
      ? deserializeGroupsResponse(groupsSerialized)
      : groupsSerialized
    , [groupsSerialized])

  return (
    <ScrollableBarlessList>
      <LoadingProvider isLoading={!!isLoadingUser}>
        <UserProfile user={users?.length ? users[0] : undefined} />
      </LoadingProvider>

      <LoadingProvider isLoading={!debts}>
        <FriendsDebts items={debts} />
      </LoadingProvider>


      <>
        {
          match([isGroupsloading, isGroupsValidating, groups])
            .with(
              [true, true, undefined],
              () => <GroupListSkeleton />,
            )
            .with(
              [false, true, undefined],
              () => <div>Groups are validating</div>,
            )
            .with(
              [false, false, P.select('groups', P.not(P.nullish))],
              ({ groups }) => <GroupsList groups={groups} />,
            )
        }
      </>
      {/*<GroupsList groups={groups} />*/}
    </ScrollableBarlessList>
  )
}

const FriendsDebts = styled(DebtsPage)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
`
