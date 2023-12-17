import { logger } from '../../loggers'
import { parseLines, processBuffer } from './parser-parts'
import { ParseStream, ParseLinesProps } from './types'

export const parseStream: ParseStream = async ({ callbacks, generator }) => {
  const parseLinesProps: ParseLinesProps = {
    generator,
    processBuffer,
    callbacks,
  }

  try {
    const { completeAnswer } = await parseLines(parseLinesProps)
    logger.debug(`COMPLETE ANSWER: ${completeAnswer}`)
  } catch (e: any) {
    logger.error(`ERROR: ${e.name}: ${e.message}`)
    // TODO: maybe add error handling here
    return
  } finally {
    callbacks.onAnswerPart(null)
  }
}
