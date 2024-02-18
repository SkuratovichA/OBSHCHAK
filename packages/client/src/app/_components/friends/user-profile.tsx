import React from 'react'
import { Box, Typography, Skeleton, AvatarProps, Avatar } from '@mui/material'
import styled from '@emotion/styled'

import type { Loadable, ObshchakUser, WithDimensions } from 'app-common'
import { DotDivider, CenteredBox, DotDividerSizeType } from '@OBSHCHAK-UI/app/_components'
import { useLoading } from '@OBSHCHAK-UI/app/_client-hooks'
import { isNil, pick } from 'lodash'


const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 16px;
  min-width: 400px;
`

type ContactInfoLineProps = Loadable<{
  text: string
}>
const ContactInfoLine: React.FC<ContactInfoLineProps> = ({ text, isLoading }) => {
  return isLoading || isNil(text) ? (
    <Skeleton variant="text" width="10ch" height="1.5rem" />
  ) : (
    <Typography variant="body2">{text}</Typography>
  )
}


type Contacts = Pick<ObshchakUser, 'username' | 'email' | 'mobileNumber'>


const ContactInfoSkeleton: React.FC = () => {
  return (
    <ContactInfoContainer>
      <ContactInfoLine isLoading={true} text={''} />
      <DotDivider isLoading={true} size={DotDividerSizeType.small} />
      <ContactInfoLine isLoading={true} text={''} />
      <DotDivider isLoading={true} size={DotDividerSizeType.small} />
      <ContactInfoLine isLoading={true} text={''} />
    </ContactInfoContainer>
  )
}

type ContactInfoProps = Loadable<{
  contacts: Contacts
}>
const ContactInfo: React.FC<ContactInfoProps> = ({ isLoading, contacts }) => {

  if (isLoading) {
    return <ContactInfoSkeleton />
  }

  if (isNil(contacts)) {
    return <div>PROBABLY AN UNHANDLED ERROR</div>
  }

  return (
    <ContactInfoContainer>
      <ContactInfoLine text={`@${contacts.username}`} />
      <DotDivider size={DotDividerSizeType.small} />
      <ContactInfoLine text={contacts.email} />
      <DotDivider size={DotDividerSizeType.small} />
      <ContactInfoLine text={contacts.mobileNumber} />
    </ContactInfoContainer>
  )
}


const DEFAULT_AVATAR_SIZE = 200
const AvatarWithDimensions = styled(Avatar)<WithDimensions<AvatarProps, number>>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`
const StyledAvatar: React.FC<WithDimensions<Loadable<AvatarProps>, number>> = ({ isLoading, ...props }) => {

  const { width, height } = props

  return (
    <CenteredBox>
      {isLoading ? (
        <Skeleton variant="circular" width={width} height={height} />
      ) : (
        <AvatarWithDimensions {...props} width={width} height={height} />
      )}
    </CenteredBox>
  )
}

const NameField: React.FC<Loadable<{ name: string }>> = ({ isLoading, name }) =>
  isLoading ? (
    <Skeleton variant="text" width="20ch" height="3rem" />
  ) : (
    <Typography variant="h4">{name}</Typography>
  )


const UserProfileSkeleton: React.FC = () => {
  return (
    <Box padding={'16px'}>
      <CenteredBox>
        <StyledAvatar isLoading={true} width={DEFAULT_AVATAR_SIZE} height={DEFAULT_AVATAR_SIZE} />
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
  user: ObshchakUser | undefined
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { isLoading } = useLoading()

  console.log(
    `isLoading: ${isLoading}, user: `, user,
  )

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
          <StyledAvatar
            alt={user.name}
            src={user.profileImage}
            width={DEFAULT_AVATAR_SIZE}
            height={DEFAULT_AVATAR_SIZE}
          />
        </CenteredBox>

        <CenteredBox>
          <NameField name={user.name} />
        </CenteredBox>

        <CenteredBox>
          <ContactInfo
            contacts={pick(user, ['username', 'email', 'mobileNumber']) as Contacts}
          />
        </CenteredBox>
      </>
    </Box>
  )
}
