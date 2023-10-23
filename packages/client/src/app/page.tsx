'use client'
import { Layout } from '@OBSHCHAK-UI/components'
import { ThemeProvider, WebsocketsProvider } from '@OBSHCHAK-UI/hooks'
import { AppProvider } from '@OBSHCHAK-UI/hooks'
import Link from 'next/link'
import React from 'react'
import { API_PATH, API_VER } from 'app-common'

const Home: React.FC = () => {

  return (
    <main>
      <WebsocketsProvider>
        <ThemeProvider>
          <AppProvider>
            <nav>
              <Link href={`${API_PATH}/v${API_VER}/auth/google`}>LOGIN WITH GOOGLE</Link>
            </nav>
            <Layout/>
          </AppProvider>
        </ThemeProvider>
      </WebsocketsProvider>
    </main>
  )
}


export default Home