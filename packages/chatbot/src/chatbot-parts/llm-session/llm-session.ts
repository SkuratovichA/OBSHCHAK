import type { Tiktoken, TiktokenModel } from 'tiktoken'
import type { ChatCompletionMessageParam } from 'openai/resources'
import type { ChatCompletionCreateParams } from 'openai/resources/chat/completions'

import { logger } from '../../loggers'
import { complete, CompletionParams } from '../openai-wrapper'
import { ChatGPTBlockDataGeneratorProps } from './types'
import {
  getTokenEncoder,
  maxTokensByModel,
  getNumberOfTokens,
  MAX_OUTPUT_TOKENS,
  MAX_CONTEXT_TOKENS,
} from './utils'
import { OPENAI_GPT_MODEL } from 'app-common'

export type ChatCompletionModel = `gpt-${string}` &
  TiktokenModel &
  ChatCompletionCreateParams['model']
export type LLMSessionProps = Partial<Omit<ChatCompletionCreateParams, 'max_tokens'>> & {
  model?: ChatCompletionModel
  contextTokens?: number
  maxTokens?: number
}

export class LLMSession {
  private readonly model: ChatCompletionModel
  private messages: ChatCompletionMessageParam[]
  private readonly encoder: Tiktoken
  private readonly maxTokens: number
  private readonly contextTokens: number
  private readonly completionParams: CompletionParams

  constructor({
    messages = [],
    model,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    maxTokens = MAX_OUTPUT_TOKENS,
    contextTokens = MAX_CONTEXT_TOKENS,
  }: LLMSessionProps) {
    this.model = model ?? OPENAI_GPT_MODEL
    this.messages = messages
    this.maxTokens = maxTokens
    this.contextTokens = contextTokens
    this.encoder = getTokenEncoder(this.model)
    this.completionParams = {
      model: this.model,
    }
  }

  private trimHistoryIfNeeded(systemPrompt: string): void {
    const trimToTokens = Math.min(
      this.contextTokens,
      maxTokensByModel[this.model] - this.maxTokens - getNumberOfTokens(this.encoder, systemPrompt),
    )

    let trimmedHistory: ChatCompletionMessageParam[] = [this.messages[this.messages.length - 1]]
    let tokensCount = getNumberOfTokens(this.encoder, trimmedHistory[0])

    for (let i = this.messages.length - 2; i >= 0; i--) {
      const newTokensCount = getNumberOfTokens(this.encoder, this.messages[i]) + tokensCount
      if (newTokensCount > trimToTokens) {
        break
      }
      tokensCount = newTokensCount
      trimmedHistory.unshift(this.messages[i])
    }

    const userElementIndex = trimmedHistory.findIndex((element) => element.role === 'user')
    if (userElementIndex !== -1 && userElementIndex !== 0) {
      trimmedHistory = trimmedHistory.slice(userElementIndex)
    }

    this.messages = trimmedHistory
  }

  private onAnswerStart(message: string) {
    this.messages.push({ role: 'user', content: message })
    const tokensInMessage = getNumberOfTokens(this.encoder, message)
    logger.info(`TOKENS IN MESSAGE: ${tokensInMessage}`)
  }

  private onAnswerEnd(systemPrompt: string, answer: string) {
    this.messages.push({ role: 'assistant', content: answer })
    this.trimHistoryIfNeeded(systemPrompt)
  }

  async *answerGenerator(
    { systemPrompt, historyLookBehind }: ChatGPTBlockDataGeneratorProps,
    message: string,
  ): AsyncGenerator<string> {
    this.onAnswerStart(message)

    const messages = this.messages.slice(-(historyLookBehind ?? 0))
    const generator = complete({ systemPrompt, messages, params: this.completionParams })

    let answer = ''
    for await (const chunk of generator) {
      answer += chunk
      yield chunk
    }

    this.onAnswerEnd(systemPrompt, answer)
  }
}
