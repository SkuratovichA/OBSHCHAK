'use client'

import { useCallback, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { API_ORIGIN, Maybe, Optional } from 'app-common'

interface UseWebsocketProps {
  username: Maybe<string>
}

type UseWebsocketResult = Optional<{
  socket: Maybe<Socket>
  connectSocket: () => void
  disconnectSocket: () => void
}>

type WebsocketFn = (props: UseWebsocketProps) => UseWebsocketResult

export const useWebsocket: WebsocketFn = ({ username }) => {
  const [socket, setSocket] = useState<Maybe<Socket>>(null)

  const connectSocket = useCallback(() => {
    if (socket) {
      return
    }
    const query = username ? { username } : {}
    const newSocket = io(
      API_ORIGIN, {
        transports: ['websocket'],
        query,
      },
    )
    setSocket(newSocket)

  }, [socket, username])

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

  return {
    socket,
    connectSocket,
    disconnectSocket,
  }
}
