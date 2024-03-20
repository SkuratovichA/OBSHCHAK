import React from 'react'
import { IconButton } from '@mui/material'
import { MicNone, NotificationsNone } from '@mui/icons-material'
import {
  BottomBar,
  FullHeightStackContainer,
  ScrollableBodyContainer,
  TopBar,
} from '@OBSHCHAK-UI/app/_components'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <FullHeightStackContainer>
      <TopBar>
        <IconButton edge="start" color="inherit" aria-label="notifications">
          <NotificationsNone />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="microphone">
          <MicNone />
        </IconButton>
      </TopBar>

      <ScrollableBodyContainer component="main">{children}</ScrollableBodyContainer>

      <BottomBar />
    </FullHeightStackContainer>
  )
}

export default Layout
