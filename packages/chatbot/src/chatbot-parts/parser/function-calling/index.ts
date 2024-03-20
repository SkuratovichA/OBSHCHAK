import type { IsEmbeddedFunction, IsEmbeddedOperationResult } from './types'

export * from './types'

export enum EmbeddedFunctionType {
  FUNCTION_CALL = 'ƒ',
}

export const EmbeddedFunctions = Object.values(EmbeddedFunctionType)

const operationFirstCharacters = new Set([...EmbeddedFunctions].map((op) => op[0]))

const isEmbeddedOperation = (operations: string[], buffer: string): IsEmbeddedOperationResult => {
  const bufferTrimmed = buffer.trim()
  let indexOfOpStart = -1

  for (const opFirstChar of operationFirstCharacters) {
    indexOfOpStart = bufferTrimmed.indexOf(opFirstChar)
    if (indexOfOpStart !== -1) {
      break
    }
  }

  if (indexOfOpStart === -1) {
    return undefined
  }

  const bufferSubstring = bufferTrimmed.substring(indexOfOpStart)
  for (const operation of operations) {
    if (bufferSubstring.startsWith(operation) || operation.startsWith(bufferSubstring)) {
      return indexOfOpStart
    }
  }

  return undefined
}

export const isEmbeddedFunction: IsEmbeddedFunction = (buffer: string) =>
  isEmbeddedOperation(EmbeddedFunctions, buffer)
