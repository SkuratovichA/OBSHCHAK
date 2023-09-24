import { WebsocketsProvider } from './hooks/use-websockets'
import { ThemeProvider } from './hooks/use-theme'
import { Layout } from './components'
import { AppProvider } from './hooks/use-app-context'

const App = () => {
  return (
    <ThemeProvider>
      <WebsocketsProvider>
        <AppProvider>
          <Layout/>
        </AppProvider>
      </WebsocketsProvider>
    </ThemeProvider>
  )
}

export default App
