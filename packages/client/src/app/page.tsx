'use client'
import { Layout } from '@OBSHCHAK-UI/components'
import { ThemeProvider, WebsocketsProvider } from '@OBSHCHAK-UI/hooks'
import { AppProvider } from '@OBSHCHAK-UI/hooks'

const Home: React.FC = () => {

  return (
    <main>
      <WebsocketsProvider>
        <ThemeProvider>
          <AppProvider>
            <Layout/>
          </AppProvider>
        </ThemeProvider>
      </WebsocketsProvider>
    </main>
  )
}


export default Home