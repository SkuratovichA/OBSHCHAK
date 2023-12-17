import type { ChatCompletionCreateParams, ChatCompletionMessageParam } from 'openai/resources'

export type CompletionParams = Partial<ChatCompletionCreateParams> & {
  model: ChatCompletionCreateParams['model'] & `gpt-${string}`
}

interface CompletionProps {
  params: CompletionParams
  systemPrompt: string
  messages: ChatCompletionMessageParam[]
  maxIterations?: number
}

export type CompleteFn = (props: CompletionProps) => AsyncGenerator<string, void, unknown>
