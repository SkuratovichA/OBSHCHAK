import type { Loadable, ObshchakUser } from 'app-common'
import React from 'react'
import { Avatar, AvatarGroup, Skeleton } from '@mui/material'

const UserAvatarsRowSkeleton = () => {
  return (
    <AvatarGroup max={4} sx={{
      justifyContent: 'start',
      direction: 'row'
    }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
    </AvatarGroup>
  )
}

type UserAvatarsRowProps = Loadable<{
  users: Array<Pick<ObshchakUser, 'username' | 'profileImage'>>
}>
export const UserAvatarsRow: React.FC<UserAvatarsRowProps> = ({ isLoading, users }) => {

  if (isLoading) {
    return <UserAvatarsRowSkeleton />
  }

  return (
    <AvatarGroup max={3} sx={{
      justifyContent: 'start',
    }}>
      {users.map((user, key) => (
        <Avatar
          key={key}
          alt={user.username}
          src={user.profileImage}
        />
      ))}
    </AvatarGroup>
  )
}