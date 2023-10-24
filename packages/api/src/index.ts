import 'reflect-metadata'

import Koa from 'koa'
import http from 'http'
import { Server } from 'socket.io'
import bodyParser from 'koa-bodyparser'
import { API_PATH, API_PORT, CLIENT_PATH } from 'app-common'
import cors from '@koa/cors'

import { setupRoutes } from './routes'
import { UserSocketsManager, socketConnectionHandler } from './websockets'
import session from 'koa-session'
import passport from 'koa-passport'

const app = new Koa()
const userSocketsManager = new UserSocketsManager()
const router = setupRoutes(userSocketsManager)

const SESS_CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
}

app.keys = ['hui']

app
  .use(cors({
    origin: CLIENT_PATH,
    credentials: true,
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(session(SESS_CONFIG, app))
  .use(passport.initialize())
  .use(passport.session())

const server = http.createServer(app.callback())
const io = new Server(server, {
  cors: {
    origin: API_PATH,
    methods: [ 'GET', 'POST' ],
  },
})
io.on('connection', (socket) => socketConnectionHandler(socket, userSocketsManager))

server
  .listen(API_PORT, () => console.log(`Server is running on port ${API_PORT}`))