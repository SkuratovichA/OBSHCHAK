import OpenAI from 'openai'
import type {
  ChatCompletionChunk,
} from 'openai/resources'
import type { Stream } from 'openai/streaming'

import { logger } from '../../loggers'
import { OPENAI_API_KEY } from '../../config'
import { CompleteFn } from './types'

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

export const complete: CompleteFn = async function* ({systemPrompt, messages, params}) {
  let stream: Stream<ChatCompletionChunk> | undefined
  try {
    stream = await openai.chat.completions.create({
      ...params,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: true
    })
  } catch (err: any) {
    if (err instanceof OpenAI.APIError) {
      err.message = getOpenAIErrorMessage(err.status) ?? err.message
    }
    throw err
  }

  for await (const part of stream) {
    const delta = part.choices[0]?.delta
    logger.debug(`CHUNK ${JSON.stringify(part.choices[0])}`)

    if (delta.content) {
      yield delta.content
    }
  }
}