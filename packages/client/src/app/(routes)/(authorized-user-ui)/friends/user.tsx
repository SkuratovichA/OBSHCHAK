'use client'

import React, { useState } from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Launch } from '@mui/icons-material'
import { usePathname, useRouter } from 'next/navigation'
import { ObshchakUser } from 'app-common'

import { ListItemContainer, TiltedContainer } from '@OBSHCHAK-UI/app/_components'

interface UserProps {
  user: ObshchakUser
}

interface UserMenuProps {
  anchorEl: HTMLElement | null
  onClose: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl)

  const handleMenuAction = (action: string) => () => {
    alert(action)
    onClose()
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={handleMenuAction('remove')}>Remove</MenuItem>
      <MenuItem onClick={handleMenuAction('createTransaction')}>Create a transaction</MenuItem>
      <MenuItem onClick={handleMenuAction('createGroup')}>Create a group</MenuItem>
      <MenuItem onClick={handleMenuAction('goToTransactions')}>Go to transactions</MenuItem>
    </Menu>
  )
}

export const User: React.FC<UserProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()
  const pathName = usePathname()

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleRedirect = () => {
    router.push(`${pathName}/${user.id}`)
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
        <UserMenu anchorEl={anchorEl} onClose={handleCloseMenu} />
      </ListItemContainer>
    </TiltedContainer>
  )
}
