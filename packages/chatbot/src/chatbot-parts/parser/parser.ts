import { logger } from '../../loggers'
import { parseLines, processBuffer } from './parser-parts'
import type { ParseStream, ParseLinesProps } from './types'

export const parseStream: ParseStream = async ({ callbacks, generator }) => {
  const parseLinesProps: ParseLinesProps = {
    generator,
    processBuffer,
    callbacks,
  }

  try {
    const { completeAnswer } = await parseLines(parseLinesProps)
    logger.debug(`COMPLETE ANSWER: ${completeAnswer}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    logger.error(`ERROR: ${e.name}: ${e.message}`)
    // TODO: maybe add error handling here
    return
  } finally {
    callbacks.onAnswerPart(null)
  }
}
