import {
  Container,
  IconButton,
} from '@mui/material'
import React from 'react'
import { MicNone, NotificationsNone } from '@mui/icons-material'
import { BottomBar, TopBar } from '@OBSHCHAK-UI/app/_components'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {

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
      <BottomBar />
    </Container>
  )
}

export default Layout
