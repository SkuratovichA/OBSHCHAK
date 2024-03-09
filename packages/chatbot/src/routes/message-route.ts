import Router from 'koa-router'
import type { ChatbotResponse} from 'app-common';
import { isChatbotMessageQuery } from 'app-common'

import { ChatbotService } from '../chatbotsvc'
import { sseMiddleware } from '../sse'
import { logger } from '../loggers'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

export const messageRouter = new Router()

// TODO: make it persistent in the future versions
const chatbotSessions = new Map<string, ChatbotService>()

const processResponse = (response: ChatbotResponse, send: (data: string) => void) => {
  send(JSON.stringify(response))
}

messageRouter.get('/message', async (ctx) => {
  const { send, close } = sseMiddleware(ctx)
  if (!isChatbotMessageQuery(ctx.query)) {
    ctx.status = 400
    ctx.body = { error: 'Invalid query' }
    close()
    return
  }
  const { message, userId } = ctx.query

  let chatbotService = chatbotSessions.get(userId)
  if (!chatbotService) {
    logger.debug(`Creating new chatbot service for user ${userId}`)
    chatbotService = new ChatbotService()
    chatbotSessions.set(userId, chatbotService)
  }

  try {
    const subscription = chatbotService
      .processMessage(message)
      .pipe(
        catchError((err) => {
          logger.error(`Error in chatbot service: ${err.message}`)
          ctx.status = 500
          ctx.body = { error: `Internal Server Error: ${err.message}` }
          return throwError(err)
        }),
      )
      .subscribe({
        next: (response) => processResponse(response, send), //(response) => send(JSON.stringify(response)),
        error: (err) => {
          logger.error(`Stream error: ${err.message}`)
          close()
        },
        complete: () => {
          logger.debug('Stream completed')
          close()
        },
      })

    ctx.res.on('close', () => {
      logger.debug('Client disconnected, closing subscription')
      subscription.unsubscribe()
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    logger.error(`Error in SSE logic: ${e.message}`)
    ctx.status = 500
    ctx.body = { error: `Internal Server Error: ${e.message}` }
    close()
  }
})
