import Router from 'koa-router'
import { ChatbotResponse, ChatbotService } from '../chatbotsvc'
import { sseMiddleware } from '../sse'

export const messageRouter = new Router()
const chatbotService = new ChatbotService()

messageRouter.get('/message', async (ctx) => {
  const { send, close } = sseMiddleware(ctx)
  const message = ctx.query.message as string

  let responses: undefined | ChatbotResponse[]
  try {
    responses = await chatbotService.processMessage(message)
  } catch (e: any) {
    ctx.status = 500
    ctx.body = { error: `Internal Server Error ${e.message}` }
    close()
    return
  }

  responses.forEach(response  => send(JSON.stringify(response)))
  close()
})
