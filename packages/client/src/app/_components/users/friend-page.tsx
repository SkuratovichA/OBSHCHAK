'use client'

import React from 'react'
import styled from '@emotion/styled'
import type { ObshchakUser } from 'app-common'
import { nextEndpointsMap } from 'app-common'

import {
  DebtsPage,
  DebtsPageSkeleton,
  GroupListSkeleton,
  GroupsList,
  ScrollableBarlessList,
  UserProfile,
} from '@OBSHCHAK-UI/app/_components'
import { LoadingProvider, useSwr } from '@OBSHCHAK-UI/app/_client-hooks'
import type { UserSearchParams, UsersSearchResponse } from '@OBSHCHAK-UI/app/api/users/route'
import type { GroupsRequestBody, GroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { deserializeGroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { match, P } from 'ts-pattern'
import type { DebtsResponse, DebtsSearchParams } from '@OBSHCHAK-UI/app/api/debts/utils'
import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'


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

  const {
    data: debts,
    isLoading: isDebtsLoading,
    isValidating: isDebtsValidating,
  } = useSwr<DebtsSearchParams, DebtsResponse>(
    nextEndpointsMap.DEBTS(),
    { ...usernames, groups: [] },
  )

  const {
    data: groups,
    isLoading: isGroupsLoading,
    isValidating: isGroupsValidating,
  } = useSwr<GroupsRequestBody, GroupsResponse>(
    nextEndpointsMap.GROUPS(),
    {...usernames, groupId: null},
  )

  return (
    <ScrollableBarlessList
      style={{
        gap: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LoadingProvider isLoading={!!isLoadingUser}>
        <UserProfile user={users?.length ? users[0] : undefined} />
      </LoadingProvider>

      <Section>
        {match([isDebtsLoading, isDebtsValidating, debts])
          .returnType<React.ReactNode>()
          .with(
            [false, false, P.select('debts', P.not(P.nullish))],
            ({ debts }) => <FriendsDebts debts={debts} />,
          )
          .otherwise(() => <DebtsPageSkeleton />)
        }
      </Section>

      <Section>
        {match([isGroupsLoading, isGroupsValidating, groups])
          .returnType<React.ReactNode>()
          .with(
            [false, false, P.select('groups', P.not(P.nullish))],
            ({ groups }) => <GroupsList groups={deserializeGroupsResponse(groups)} />,
          )
          .otherwise(() => <GroupListSkeleton />)
        }
      </Section>

    </ScrollableBarlessList>
  )
}

const FriendsDebts = styled(DebtsPage)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
`

const Section = styled(Box)`
    align-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    background: ${grey[50]};
    border-radius: 16px;
`
