import {
  ChatbotResponse,
  ChatbotServiceResponseType,
  OPENAI_GPT_MODEL,
  splitSentence,
} from 'app-common'
import { Observable, ReplaySubject, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { LLMSession, parseStream } from '../chatbot-parts'
import type { ParseStreamCallbacks } from '../chatbot-parts'

export class ChatbotService {
  private readonly session: LLMSession

  constructor() {
    this.session = new LLMSession({ model: OPENAI_GPT_MODEL })
  }

  processMessage(message: string): Observable<any> {
    const subject = new ReplaySubject<ChatbotResponse>()
    let textBuffer = ''

    const callbacks: ParseStreamCallbacks = {
      onAnswerPart: (answerPart) => {
        const { prefix, suffix } =
          answerPart === null
            ? { prefix: textBuffer, suffix: '' }
            : splitSentence(textBuffer, answerPart)
        textBuffer = suffix

        if (prefix.trim()) {
          subject.next({ type: ChatbotServiceResponseType.TEXT, content: prefix })
        }
      },
      onFunctionCall: (props) => {
        const content = {
          functionName: props.functionName,
          args: props.args,
        }
        subject.next({ type: ChatbotServiceResponseType.FUNCTION_CALL, content })
      },
    }

    const generator = this.session.answerGenerator(
      { systemPrompt: '', historyLookBehind: 0 },
      message,
    )
    parseStream({ message, callbacks, generator })
      .then(() => subject.complete())
      .catch((error) => subject.error(error))

    return subject.asObservable().pipe(
      catchError((err) => {
        return throwError(err)
      }),
    )
  }
}
