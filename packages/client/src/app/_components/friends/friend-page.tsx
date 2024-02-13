'use client'

import React, { Suspense } from 'react'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import { ObshchakUser } from 'app-common'

import { GroupsList, TransactionsList } from '@OBSHCHAK-UI/app/_components'
import { useSuspenseSWR } from '@OBSHCHAK-UI/app/_client-hooks'
import { UserSearchParams } from '@OBSHCHAK-UI/app/api/users/route'
import { TransactionsSearchParams } from '@OBSHCHAK-UI/app/api/transactions/route'
import { GroupsSearchParams } from '@OBSHCHAK-UI/app/api/groups/route'

interface UserProfileProps {
  user: ObshchakUser // FIXME: move this to common
}

// UserProfile component
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const theme = useTheme()
  const isSmallWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box>
    </Box>
  )
}

// FIXME: tmp solution
export interface FriendPageProps {
  username: string
}

export const FriendPage: React.FC<FriendPageProps> = ({ username }) => {
  console.log(
    `Friend page is about to be rendered`,
  )
  const usernames: UserSearchParams = { usernames: [username] }

  return (
    <Container maxWidth="sm">
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile
          user={useSuspenseSWR<UserSearchParams>(`/api/users`, usernames)}
        />
      </Suspense>

      <Suspense fallback={<div>Loading transactions...</div>}>
        <TransactionsList
          transactions={useSuspenseSWR<TransactionsSearchParams>('/api/transactions', usernames)}
        />
      </Suspense>

      <Suspense fallback={<div>Loading groups...</div>}>
        <GroupsList groups={useSuspenseSWR<GroupsSearchParams>('/api/groups', usernames)} />
      </Suspense>
    </Container>
  )
}
