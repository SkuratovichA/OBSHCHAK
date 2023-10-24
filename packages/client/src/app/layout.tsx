import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OBSHCHAK',
  description: 'Split and share money with friends',
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={'TWAContainer'}>{children}</div>
      </body>
    </html>
  )
}

export default RootLayout
