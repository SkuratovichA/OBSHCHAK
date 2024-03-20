export type FunctionCallProps<T extends object> = {
  functionName: string
  args: T
}

export interface ParseStreamCallbacks {
  onAnswerPart: (props: string | null) => void
  onFunctionCall: <T extends object>(props: FunctionCallProps<T>) => void
}

export interface ParseStreamProps {
  message: string
  callbacks: ParseStreamCallbacks
  generator: AsyncGenerator<string>
}

export type ParseStream = (props: ParseStreamProps) => Promise<void>

export type ProcessBufferProps = {
  buffer: string
} & Pick<ParseStreamCallbacks, 'onFunctionCall'>

export type ProcessBufferResult = {
  newBuffer: string
  newChunk: string
}
export type ProcessBuffer = (props: ProcessBufferProps) => Promise<ProcessBufferResult>

export type ParseLinesProps = {
  generator: AsyncGenerator<string>
  processBuffer: ProcessBuffer
  callbacks: ParseStreamCallbacks
}

export interface ParseLinesResult {
  completeAnswer: string
}

export type ParseLines = (props: ParseLinesProps) => Promise<ParseLinesResult>
