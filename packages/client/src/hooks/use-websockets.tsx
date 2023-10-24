'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { API_ORIGIN } from '@OBSHCHAK/common'


interface WebsocketsContextProps {
}

const WebsocketsContext = createContext<WebsocketsContextProps | undefined>(undefined)

export const WebsocketsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null)

  const [socket, setSocket] = useState<Socket | null>(null)

  const connectSocket = useCallback(() => {
    if (socket) {
      return
    }
    const username = new URLSearchParams(window.location.search).get('username')
    const query = username ? { username } : {}
    const newSocket = io(
      API_ORIGIN, {
        transports: ['websocket'],
        query
      }
    )
    setSocket(newSocket)
  }, [socket])

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect()
      setSocket(null)
    }
  }, [socket])

  useEffect(() => {
    connectSocket()
    return disconnectSocket
  }, [connectSocket, disconnectSocket])


  useEffect(() => {
    if (!socket){
      return
    }
  }, [socket])

  return (
    <WebsocketsContext.Provider value={{}}>
      {children}
    </WebsocketsContext.Provider>
  )
}

export const useWebsockets = () => {
  const context = useContext(WebsocketsContext)
  if (context === undefined) throw new Error('useTransactions must be used within WebsocketProvider')
  return context
}
