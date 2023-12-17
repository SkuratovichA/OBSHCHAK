import { ParseLines, ProcessBuffer } from './types'
import { EmbeddedFunctionType, isEmbeddedFunction } from '../function-calling'


const END_TOKEN_IF_EMPTY = 'Done'

export const parseLines: ParseLines = async ({ generator, processBuffer, callbacks: { onAnswerPart, onFunctionCall } }) => {
  let buffer = ''
  let completeAnswer = ''

  for await (const token of generator) {
    buffer += token

    const { newChunk, newBuffer } = await processBuffer({ buffer, functionCall: onFunctionCall })

    buffer = newBuffer
    await onAnswerPart(newChunk)
    completeAnswer += newChunk
  }

  if (buffer) {
    await onAnswerPart(buffer)
    completeAnswer += buffer
  }
  if (!completeAnswer) {
    completeAnswer = END_TOKEN_IF_EMPTY // Replace with actual end token if different
    await onAnswerPart(completeAnswer)
  }

  return {
    completeAnswer,
  }
}

export const processBuffer: ProcessBuffer = async ({ buffer, functionCall }) => {
  const embeddedFunctionIndex = isEmbeddedFunction(buffer)

  const indexStartCommand = embeddedFunctionIndex ?? buffer.length

  const newChunk = buffer.slice(0, indexStartCommand)
  let newBuffer = buffer.slice(indexStartCommand)

  if (embeddedFunctionIndex !== undefined) {
    newBuffer = await processEmbeddedFunctions({buffer, functionCall})
  }

  return {
    newBuffer,
    newChunk,
  }
}

const fnNameRegex = 'w+'
const fnPropsObjRegex = '{.*?}'
const EmbeddedFunctionArguments: Record<EmbeddedFunctionType, string> = {
  [EmbeddedFunctionType.FUNCTION_CALL]: `${fnNameRegex}, ${fnPropsObjRegex}`,
}

export const EmbeddedFunctionRegexes: Record<EmbeddedFunctionType, RegExp> = {
  [EmbeddedFunctionType.FUNCTION_CALL]: new RegExp(
    `${EmbeddedFunctionType.FUNCTION_CALL}\\(${EmbeddedFunctionArguments[EmbeddedFunctionType.FUNCTION_CALL]}\\)`
  ),
}

const getEmbeddedFunctionsWithArgs = (buffer: string) =>
  (Object.entries(EmbeddedFunctionRegexes) as Array<[EmbeddedFunctionType, RegExp]>).reduce<{
    fun?: EmbeddedFunctionType
    args?: string
    match?: RegExpExecArray
  }>((acc, [fun, regex]) => {
    const match = regex.exec(buffer)
    if (!match) {
      return acc
    }
    const args = match[1]
    return { fun, args, match }
  }, {})


type FunctionCall = <T extends {}>(functionName: string, args: T) => Promise<void>
type ProcessEmbeddedFunctionProps = {
  buffer: string
  functionCall: FunctionCall
}
type ProcessEmbeddedFunction = (props: ProcessEmbeddedFunctionProps) => Promise<string>
const processEmbeddedFunctions: ProcessEmbeddedFunction = async ({ buffer, functionCall }) => {
  const { fun, args, match } = getEmbeddedFunctionsWithArgs(buffer)

  if (match && fun && args) {
    await functionCall<object>(fun, JSON.parse(args))
    buffer = buffer.replace(match[0], '') // remove the function call from the buffer
  }

  return buffer
}
