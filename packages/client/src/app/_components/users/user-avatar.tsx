import React from 'react'
import styled from '@emotion/styled'
import { Avatar, AvatarProps, Skeleton } from '@mui/material'

import type { Loadable, Optional, WithDimensions } from 'app-common'

import { CenteredBox } from '@OBSHCHAK-UI/app/_components'


const DEFAULT_AVATAR_SIZE = 200

const AvatarWithDimensions = styled(Avatar)<WithDimensions<AvatarProps, number>>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
`

type UserAvatarProps = Optional<WithDimensions> & Loadable<AvatarProps>
const UserAvatarBase: React.FC<UserAvatarProps> = ({ isLoading, ...props }) => {

  const { width, height } = {
    width: props.width ?? DEFAULT_AVATAR_SIZE,
    height: props.height ?? DEFAULT_AVATAR_SIZE,
  }

  if (isLoading) {
    return <Skeleton variant="circular" width={width} height={height} />
  }

  return <AvatarWithDimensions
    {...props}
    width={width ?? DEFAULT_AVATAR_SIZE}
    height={height ?? DEFAULT_AVATAR_SIZE}
  />
}

export const UserAvatar: typeof UserAvatarBase = (props) =>
  <CenteredBox>
    <UserAvatarBase {...props} />
  </CenteredBox>
