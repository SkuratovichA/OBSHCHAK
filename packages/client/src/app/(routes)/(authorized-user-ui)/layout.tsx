'use client'

import { useSession } from 'next-auth/react'
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  css,
  IconButton,
} from '@mui/material'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import TransactionIcon from '@mui/icons-material/AccountBalanceWallet'
import React from 'react'
import { AddCircleOutline, Group, Groups, MicNone, NotificationsNone } from '@mui/icons-material'
import { usePathname } from 'next/navigation'
import styled from '@emotion/styled'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession()

  const pathname = usePathname()
  const shouldHl = (text: string): boolean => pathname.includes(text.toLowerCase())

  return (
    <Container component="main">
      <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
        <IconButton edge="start" color="inherit" aria-label="notifications">
          <NotificationsNone />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="microphone">
          <MicNone />
        </IconButton>
      </Box>
      {children}

      <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation showLabels style={{ justifyContent: 'center' }}>
          {[
            // TODO: fucked up route names. here we go having with some bugs probably
            { label: 'Friends', icon: <Group />, shouldHighlight: shouldHl('friends') },
            { label: 'Groups', icon: <Groups />, shouldHighlight: shouldHl('groups') },
            {
              label: '',
              icon: <AddCircleOutline fontSize="large" color="primary" />,
              shouldHighlight: shouldHl('addTransaction'),
            },
            {
              label: 'Transactions',
              icon: <TransactionIcon />,
              shouldHighlight: shouldHl('transactions'),
            },
            { label: 'Account', icon: <ProfileIcon />, shouldHighlight: shouldHl('account') },
          ].map((props, idx) => (
            <BottomNavActionHighlighted
              // TODO: fucked up constants
              highlightColor={'rgba(151,71,255,0.43)'}
              key={idx}
              {...props}
            />
          ))}
        </BottomNavigation>
      </AppBar>
    </Container>
  )
}

const BottomNavActionHighlighted = styled(BottomNavigationAction)<{
  shouldHighlight?: boolean
  highlightColor?: string
}>`
  ${({ shouldHighlight, highlightColor }) =>
    shouldHighlight &&
    css`
      background: ${highlightColor};
      border-radius: 8px;
    `}
`

export default Layout
