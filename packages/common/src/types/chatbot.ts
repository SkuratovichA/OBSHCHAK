export interface ChatbotMessageQuery {
  message: string
  userId: string
}

export const isChatbotMessageQuery = (obj: object): obj is ChatbotMessageQuery => {
  return (
    !!obj &&
    'message' in obj &&
    obj &&
    typeof obj.message === 'string' &&
    'userId' in obj &&
    obj &&
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
