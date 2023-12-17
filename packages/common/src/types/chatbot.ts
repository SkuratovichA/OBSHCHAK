export interface ChatbotMessageQuery {
  message: string
  userId: string
}

export const isChatbotMessageQuery = (obj: any): obj is ChatbotMessageQuery => {
  return (
    obj &&
    obj.message &&
    obj.userId &&
    typeof obj.message === 'string' &&
    typeof obj.userId === 'string'
  )
}

export enum ChatbotServiceResponseType {
  TEXT = 'TEXT',
  FUNCTION_CALL = 'FUNCTION_CALL',
}

type ChatbotServiceResponseText = {
  type: ChatbotServiceResponseType.TEXT
  content: string
}

type ChatbotServiceResponseFunctionCall = {
  type: ChatbotServiceResponseType.FUNCTION_CALL
  content: {
    functionName: string
    args: object
  }
}

export type ChatbotResponse = ChatbotServiceResponseText | ChatbotServiceResponseFunctionCall
