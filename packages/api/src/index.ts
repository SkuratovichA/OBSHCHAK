import Koa from 'koa'
import http from 'http'
import { Server } from 'socket.io'
import bodyParser from 'koa-bodyparser'
import { API_PATH, PORT } from '@OBSHCHAK/common'
import { socketConnectionHandler } from './websockets'
import { setupRoutes } from './routes'
import { UserSocketsManager } from './socket-manager'

const app = new Koa()
const userSocketsManager = new UserSocketsManager()
const router = setupRoutes(userSocketsManager)

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())

const server = http.createServer(app.callback())
const io = new Server(server, {
  cors: {
    origin: API_PATH,
    methods: ['GET', 'POST'],
  },
})
io.on('connection', (socket) => socketConnectionHandler(socket, userSocketsManager))

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
