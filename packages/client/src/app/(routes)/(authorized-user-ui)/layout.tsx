'use client'

import { useSession } from 'next-auth/react'
import { AppBar, Badge, BottomNavigation, BottomNavigationAction, Container } from '@mui/material'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import GroupsIcon from '@mui/icons-material/GroupWork'
import TransactionIcon from '@mui/icons-material/AccountBalanceWallet'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession()

  return (
    <Container component="main">
      {children}

      <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation showLabels style={{ justifyContent: 'center' }}>
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Groups" icon={<GroupsIcon />} />
          <BottomNavigationAction label="Transactions" icon={<TransactionIcon />} />
          <BottomNavigationAction
            label="Notifications"
            icon={
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            }
          />
          <BottomNavigationAction label="Logout" icon={<LogoutIcon />} />
        </BottomNavigation>
      </AppBar>
    </Container>
  )
}

export default Layout
