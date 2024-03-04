import type { Socket } from 'socket.io'
import { WebsocketEventType } from 'app-common'
import type { UserSocketsManager } from './socket-manager'

type SocketFunction = (socket: Socket, userSocketsManager: UserSocketsManager) => void

export const socketConnectionHandler: SocketFunction = (socket, userSocketsManager) => {
  void (async () => {
    try {
      await handleSocketConnect(socket, userSocketsManager)

      const socketListeners: Record<WebsocketEventType, (data?: object) => void> = {
        [WebsocketEventType.DISCONNECT]: () => handleSocketDisconnect(socket, userSocketsManager),
      }
      Object.entries(socketListeners).forEach(([event, listener]) => {
        socket.on(event, listener)
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`error while connecting to the server: ${error}`)
    }
  })()
}

const handleSocketConnect: SocketFunction = async (socket, userSocketsManager) => {
  const { userId } = socket.handshake.auth
  if (!userId) {
    throw new Error('No user ID provided')
  }

  userSocketsManager.addUserSocket(userId, socket)
}

const handleSocketDisconnect: SocketFunction = (socket: Socket, userSocketsManager) => {
  const { userId } = socket.handshake.auth
  if (!userId) {
    throw new Error('No user ID provided')
  }

  userSocketsManager.removeUserSocket(userId, socket)
}
