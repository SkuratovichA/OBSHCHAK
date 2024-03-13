import React from 'react'
import { Box } from '@mui/material'
import type { Maybe, ObshchakUser } from 'app-common'
import { CenteredBox } from '@OBSHCHAK-UI/app/_components'
import { useLoading } from '@OBSHCHAK-UI/app/_client-hooks'

import { isNil, pick } from 'lodash'
import { NameField } from './name-field'
import { ContactInfo } from './contact-info'
import { UserAvatar } from './user-avatar'

export type Contacts = Pick<ObshchakUser, 'username' | 'email' | 'mobileNumber'>

const UserProfileSkeleton: React.FC = () => {
  return (
    <Box padding={'16px'}>
      <CenteredBox>
        <UserAvatar isLoading={true} />
      </CenteredBox>
      <CenteredBox>
        <NameField isLoading={true} />
      </CenteredBox>
      <CenteredBox>
        <ContactInfo isLoading={true} />
      </CenteredBox>
    </Box>
  )
}

interface UserProfileProps {
  user: Maybe<ObshchakUser>
}

// TODO: probably, this should be called a FriendsProfile instaed
export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { isLoading } = useLoading()

  console.log(`isLoading: ${isLoading}, user: `, user)

  if (isLoading) {
    return <UserProfileSkeleton />
  }

  if (isNil(user)) {
    return <div>PROBABLY AN UNHANDLED ERROR</div>
  }

  return (
    <Box padding={'16px'}>
      <>
        <CenteredBox>
          <UserAvatar alt={user.name} src={user.profileImage} />
        </CenteredBox>

        <CenteredBox>
          <NameField name={user.name} />
        </CenteredBox>

        <CenteredBox>
          <ContactInfo contacts={pick(user, ['username', 'email', 'mobileNumber']) as Contacts} />
        </CenteredBox>
      </>
    </Box>
  )
}
