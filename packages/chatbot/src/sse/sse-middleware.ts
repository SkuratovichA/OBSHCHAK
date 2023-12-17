import type { Context } from 'koa'
import { PassThrough } from 'node:stream'

export const sseMiddleware = (ctx: Context) => {
  ctx.set('Content-Type', 'text/event-stream')
  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Connection', 'keep-alive')

  ctx.req.setTimeout(Number.MAX_VALUE)
  const stream = new PassThrough()

  ctx.body = stream

  return {
    send: (data: string) => {
      stream.write(`data: ${JSON.stringify(data)}\n\n`)
    },
    close: () => {
      stream.end()
    },
  }
}
