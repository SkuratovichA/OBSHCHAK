'use client'

import React, { useState } from 'react'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { MoreVert, Launch } from '@mui/icons-material'
import { usePathname, useRouter } from 'next/navigation'
import type { Maybe, ObshchakUser, Pendable } from 'app-common'

import { ListItemContainerPointless, TiltedContainer } from '@OBSHCHAK-UI/app/_components'
import type { DropdownMenuProps } from '@OBSHCHAK-UI/app/_components/dropdown-menu'
import { DropdownMenu } from '@OBSHCHAK-UI/app/_components/dropdown-menu'

type UserProps = Pendable<{
  user: ObshchakUser
  actions?: DropdownMenuProps['namedCallbacks']
}>

export const User: React.FC<UserProps> = ({ user, actions, pending }) => {
  const [anchorEl, setAnchorEl] = useState<Maybe<HTMLElement>>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()
  const pathName = usePathname()

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRedirect = () => {
    router.push(`${pathName}/${user.username}`)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <TiltedContainer>
      <ListItemContainerPointless elevation={1} pending={pending}>
        <Avatar alt={user.name} src={user.profileImage} />
        <Box sx={{ flex: 1, ml: 2 }}>
          <Typography variant="body1">{user.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            @{user.username}
          </Typography>
        </Box>
        <IconButton
          aria-label="redirect"
          id={`user-redirect-${user.id}`}
          onClick={handleRedirect}
        >
          <Launch
            fontSize="small"
          />
        </IconButton>

        {actions &&
          <>
            <IconButton
              aria-label="more"
              id={`user-menu-${user.id}`}
              aria-controls={open ? 'user-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleOpenMenu}
            >
              <MoreVert />
            </IconButton>
            <DropdownMenu
              namedCallbacks={actions}
              anchorEl={anchorEl}
              onClose={handleCloseMenu}
            />
          </>

        }
      </ListItemContainerPointless>
    </TiltedContainer>
  )
}
