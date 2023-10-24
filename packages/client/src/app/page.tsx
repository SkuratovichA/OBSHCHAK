'use client'
import { WebsocketsProvider } from '@OBSHCHAK-UI/hooks'
import { AppProvider } from '@OBSHCHAK-UI/hooks'
import { Layout } from '@OBSHCHAK-UI/components'

const Home: React.FC = () => {

  return (
    <main>
      <WebsocketsProvider>
        <AppProvider>
          <Layout/>
        </AppProvider>
      </WebsocketsProvider>
    </main>
  )
}


export default Home