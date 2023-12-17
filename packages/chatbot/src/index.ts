import Koa from 'koa'
import { messageRouter } from './routes'
import { PORT } from './config'

const app = new Koa()

app.use(messageRouter.routes())
app.listen(PORT, () => {
  console.log(`Chatbot server running on port ${PORT}`)
})