import { logger } from '../../loggers'
import { parseLines, processBuffer } from './utils'
import { ParseStream, ParseLinesProps } from './types'

// TODO Call it like that with these callbacks
// export class ConfiguratorChatbot {
//   answer: string = ''
//   private textBuffer: string = ''
//
//   updateCallbacks(callbacks: Omit<ChatbotCallbacks, 'onAnswerEnd'>) {
//     const { onError, onAnswerStart, onAnswerPart, onMessageEmitEnd } = callbacks
//
//     const onNewChunkWrapped = async (chunk: string | null) => {
//       const { prefix, suffix } = chunk === null
//         ? {prefix: this.textBuffer, suffix: ''}
//         : splitSentence(this.textBuffer, chunk)
//       this.textBuffer = suffix
//
//       if (prefix.trim()) {
//         onAnswerPart({ text: prefix })
//       }
//       if (chunk === null) {
//         onMessageEmitEnd()
//       }
//     }
//
//     const newCallbacks: Required<ParserCallbacks> = {
//       onNewChunk: onNewChunkWrapped,
//       onAnswerStart,
//       onError: onErrorPiped,
//     }
//     this.configuratorGPT.updateCallbacks(newCallbacks)
//   }
//
//   async call(text: string, generator, callbacks) {
//     this.textBuffer = ''
//     const parseStreamProps: ParseStreamProps = {
//       text,
//       callbacks: this.callbacks,
//       generator: this.generator,
//     }
//     await parseStream(parseStreamProps)
//     return { message: text, answer: this.answer }
//   }
// }

export const parseStream: ParseStream = async ({ callbacks, generator }) => {
  const parseLinesProps: ParseLinesProps = {
    generator,
    processBuffer,
    callbacks,
  }

  try {
    await callbacks.onAnswerStart()
    const { completeAnswer } = await parseLines(parseLinesProps)
    logger.debug(`COMPLETE ANSWER: ${completeAnswer}`)
  } catch (e: any) {
    logger.error(`ERROR: ${e.name}: ${e.message}`)
    // TODO: maybe add error handling here
    return
  } finally {
    await callbacks.onAnswerPart(null)
    await callbacks.onAnswerEnd()
  }
}

// generator = this.chatGPTSession.complete({
//     systemPrompt: getSystemPrompt(),
//   },
//   text,
// )
