'use client'

import React, { useState } from 'react'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Launch } from '@mui/icons-material'
import { usePathname, useRouter } from 'next/navigation'
import { Maybe, ObshchakUser } from 'app-common'

import { ListItemContainer, TiltedContainer } from '@OBSHCHAK-UI/app/_components'
import { DropdownMenu, DropdownMenuProps } from '@OBSHCHAK-UI/app/_components/dropdown-menu'


const friendActions: DropdownMenuProps['namedCallbacks'] = {
  remove: {
    name: 'Remove a friend',
    callback: async () => console.log('remove'),
  },
  createTransaction: {
    name: 'Create a transaction',
    callback: async () => console.log('createTransaction'),
  },
  createGroup: {
    name: 'Create a group',
    callback: async () => console.log('createGroup'),
  },
  goToTransactions: {
    name: 'Go to transactions',
    callback: async () => console.log('goToTransactions'),
  },
}

interface UserProps {
  user: ObshchakUser
}

export const User: React.FC<UserProps> = ({ user }) => {
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
      <ListItemContainer elevation={1} onClick={() => console.log('Open user details')}>
        <Avatar alt={user.name} src={user.profileImage} />
        <Box sx={{ flex: 1, ml: 2 }}>
          <Typography variant="body1">{user.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            @{user.username}
          </Typography>
        </Box>
        <Launch
          fontSize="small"
          onClick={handleRedirect}
        />
        <IconButton
          aria-label="more"
          id={`user-menu-${user.id}`}
          aria-controls={open ? 'user-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <DropdownMenu
          namedCallbacks={friendActions}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
        />
      </ListItemContainer>
    </TiltedContainer>
  )
}
