import { commonDescription } from './prompt-parts'

export * from './prompt-parts'

export type SystemPromptFn = () => string

export const getSystemPrompt: SystemPromptFn = () => [commonDescription].join('\n\n')
