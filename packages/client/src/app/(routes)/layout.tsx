'use client'

import { SessionProvider } from 'next-auth/react'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Layout
