import Koa from 'koa'
import { messageRouter } from './routes'
import { CHATBOT_PORT } from 'app-common'

const app = new Koa()

app.use(messageRouter.routes())
app.listen(CHATBOT_PORT, () => {
  console.log(`Chatbot server running on port ${CHATBOT_PORT}`)
})
