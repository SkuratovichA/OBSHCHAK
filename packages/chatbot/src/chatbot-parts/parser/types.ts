
export interface ParseStreamCallbacks {
  onAnswerStart: () => Promise<void>
  onAnswerPart: (text: string | null) => Promise<void>
  // TODO: add functions
  onFunctionCall: (functionName: string, args: object) => Promise<void>
  onAnswerEnd: () => Promise<void>
}
export interface ParseStreamProps {
  text: string
  callbacks: ParseStreamCallbacks
  generator: AsyncGenerator<string>
}
export type ParseStream = (props: ParseStreamProps) => Promise<void>


export type ProcessBufferProps = {
  buffer: string
  functionCall: ParseStreamCallbacks['onFunctionCall']
}
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
