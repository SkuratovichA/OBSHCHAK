import { ParseLines, ProcessBuffer, ProcessBufferProps } from './types'
import { EmbeddedFunctionType, isEmbeddedFunction } from './function-calling'

const END_TOKEN_IF_EMPTY = 'Done'

export const parseLines: ParseLines = async ({
  generator,
  processBuffer,
  callbacks: { onAnswerPart, onFunctionCall },
}) => {
  let buffer = ''
  let completeAnswer = ''

  for await (const token of generator) {
    buffer += token

    const { newChunk, newBuffer } = await processBuffer({ buffer, onFunctionCall })

    buffer = newBuffer
    onAnswerPart(newChunk)
    completeAnswer += newChunk
  }

  if (buffer) {
    onAnswerPart(buffer)
    completeAnswer += buffer
  }
  if (!completeAnswer) {
    completeAnswer = END_TOKEN_IF_EMPTY // Replace with actual end token if different
    onAnswerPart(completeAnswer)
  }

  return {
    completeAnswer,
  }
}

export const processBuffer: ProcessBuffer = async ({ buffer, onFunctionCall }) => {
  const embeddedFunctionIndex = isEmbeddedFunction(buffer)

  const indexStartCommand = embeddedFunctionIndex ?? buffer.length

  const newChunk = buffer.slice(0, indexStartCommand)
  let newBuffer = buffer.slice(indexStartCommand)

  if (embeddedFunctionIndex !== undefined) {
    newBuffer = await processEmbeddedFunctions({
      buffer,
      onFunctionCall,
    })
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
    `${EmbeddedFunctionType.FUNCTION_CALL}\\(${
      EmbeddedFunctionArguments[EmbeddedFunctionType.FUNCTION_CALL]
    }\\)`,
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

type ProcessEmbeddedFunction = (props: ProcessBufferProps) => Promise<string>
const processEmbeddedFunctions: ProcessEmbeddedFunction = async ({ buffer, onFunctionCall }) => {
  const { fun: functionName, args, match } = getEmbeddedFunctionsWithArgs(buffer)

  if (match && functionName && args) {
    onFunctionCall({
      functionName,
      args: JSON.parse(args),
    })
    buffer = buffer.replace(match[0], '') // remove the whole function call from the buffer
  }

  return buffer
}
