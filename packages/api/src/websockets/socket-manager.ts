import type { Socket } from 'socket.io'

export class UserSocketsManager {
  private userSockets: Record<string, Socket[]> = {}

  addUserSocket(userId: string, socket: Socket) {
    console.log(`SOCKET ADDED TO USER ${userId}`)
    if (!this.userSockets[userId]) {
      this.userSockets[userId] = []
    }
    this.userSockets[userId].push(socket)
  }

  removeUserSocket(userId: string, socket: Socket) {
    console.log(`SOCKET REMOVED FROM USER ${userId}`)
    this.userSockets[userId] = this.userSockets[userId].filter((s) => s !== socket)
    if (this.userSockets[userId].length === 0) {
      delete this.userSockets[userId]
    }
  }

  emitToUser(userId: string, event: string, data: object) {
    console.log(`EVENT ${event} EMITTED TO USER ${userId}`)
    this.userSockets[userId]?.forEach((socket) => socket.emit(event, data))
  }
}
