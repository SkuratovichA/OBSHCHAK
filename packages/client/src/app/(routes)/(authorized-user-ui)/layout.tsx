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
import React from 'react'
import { AddCircleOutline, Group, Groups, MicNone, NotificationsNone } from '@mui/icons-material'
import ListIcon from '@mui/icons-material/List'
import { usePathname } from 'next/navigation'
import styled from '@emotion/styled'
import { useRouter } from 'next/navigation'

const linkify = (text: string): string => `/${text.toLowerCase()}`

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const pathname = usePathname()
  const shouldHl = (text: string): boolean => pathname === linkify(text)
  const handleRedirect = (path: string) => {
    console.log('redirecting to', path)
    router.push(path)
  }

  return (
    <Container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
      <TopBar>
        <IconButton edge="start" color="inherit" aria-label="notifications">
          <NotificationsNone />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="microphone">
          <MicNone />
        </IconButton>
      </TopBar>

      {children}

      {/*TODO: fucked up route names. here we go having with some bugs probably*/}
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation showLabels style={{ justifyContent: 'center' }}>
          {[
            { Friends: { icon: <Group /> } },
            { Groups: { icon: <Groups /> } },
            { '': { icon: <AddCircleOutline fontSize="large" color="primary" /> } },
            { Transactions: { icon: <ListIcon /> } },
            { Account: { icon: <ProfileIcon /> } },
          ]
            .map((a) => Object.entries(a)[0])
            .map(([text, props]) => ({ ...props, label: text }))
            .map((props, idx) => (
              <BottomNavActionHighlighted
                onClick={() => handleRedirect(linkify(props.label))}
                // TODO: fucked up constants
                shouldhighlight={shouldHl(props.label)}
                highlightcolor={'rgba(151,71,255,0.43)'}
                key={idx}
                icon={props.icon}
                label={props.label}
              />
            ))}
        </BottomNavigation>
      </AppBar>
    </Container>
  )
}

const TopBar = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1100;
`

const BottomNavActionHighlighted = styled(BottomNavigationAction)<{
  shouldhighlight?: boolean
  highlightcolor?: string
}>`
  ${({ shouldhighlight, highlightcolor }) =>
    shouldhighlight &&
    css`
      background: ${highlightcolor};
      border-radius: 8px;
    `}
`

export default Layout
