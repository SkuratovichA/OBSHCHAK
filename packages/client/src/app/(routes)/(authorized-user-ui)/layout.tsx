'use client'

import { useSession } from 'next-auth/react'
import { AppBar, Badge, BottomNavigation, BottomNavigationAction, Container, Fab } from '@mui/material'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import TransactionIcon from '@mui/icons-material/AccountBalanceWallet'
import React from 'react'
import styled from '@emotion/styled'
import { AddCircleOutline, Group, Groups } from '@mui/icons-material'

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
})

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession()

  return (
    <Container component="main">
      {children}

      <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation showLabels style={{ justifyContent: 'center' }}>
          <BottomNavigationAction label="Friends" icon={<Group />} />
          <BottomNavigationAction label="Groups" icon={<Groups />} />
          <BottomNavigationAction
            icon={
              <AddCircleOutline fontSize="large" color="primary" />
            }
          />
          <BottomNavigationAction label="Transactions" icon={<TransactionIcon />} />
          <BottomNavigationAction label="Account" icon={<ProfileIcon />} />
        </BottomNavigation>
      </AppBar>
    </Container>
  )
}

export default Layout
