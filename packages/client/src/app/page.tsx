'use client'
import { Button } from '@mui/material'
import { Layout } from '@OBSHCHAK-UI/components'
import { ThemeProvider, WebsocketsProvider } from '@OBSHCHAK-UI/hooks'
import { AppProvider } from '@OBSHCHAK-UI/hooks'
import React from 'react'
import { API_PATH, API_VER } from 'app-common'
import { signIn } from 'next-auth/react'

const Home: React.FC = () => {
  return (
    <main>
      <WebsocketsProvider>
        <ThemeProvider>
          <AppProvider>
            <Button variant="contained" color="primary" onClick={() => signIn('google')}>
              Login with Google
            </Button>
            <Layout />
          </AppProvider>
        </ThemeProvider>
      </WebsocketsProvider>
    </main>
  )
}

export default Home
