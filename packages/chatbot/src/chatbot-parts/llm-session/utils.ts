import type { Tiktoken, TiktokenModel } from 'tiktoken'
import { encoding_for_model } from 'tiktoken'
import type { ChatCompletionMessageParam } from 'openai/resources'

const encoders = new Map<TiktokenModel, Tiktoken>()

export const getTokenEncoder = (model: TiktokenModel) => {
  let encoder = encoders.get(model)
  if (!encoder) {
    encoder = encoding_for_model(model)
    encoders.set(model, encoder)
  }
  return encoder
}

const KILOTOKEN = 1024
export const MAX_CONTEXT_TOKENS = 4 * KILOTOKEN
export const MAX_OUTPUT_TOKENS = 420

export const maxTokensByModel = {
  'gpt-3.5-turbo': KILOTOKEN * 4,
  'gpt-3.5-turbo-16k': KILOTOKEN * 16,
  'gpt-4': KILOTOKEN * 8,
  'gpt-4-32k': KILOTOKEN * 32,
  'gpt-4-1106-preview': KILOTOKEN * 128,
  'gpt-4-vision-preview': KILOTOKEN * 128,
} as Record<`gpt-${string}`, number> satisfies Record<`gpt-${string}` & TiktokenModel, number>

export const getNumberOfTokens = (
  encoder: Tiktoken,
  input: string | ChatCompletionMessageParam | ChatCompletionMessageParam[]
): number => {
  if (typeof input === 'string') {
    return encoder.encode(input).length
    /* ChatCompletionMessageParam[] */
  } else if (Array.isArray(input)) {
    return encoder.encode(input.map(x => x.content).join(' ')).length
    /* ChatCompletionMessageParam */
  } else {
    return encoder.encode(input.content as string).length
  }
}

