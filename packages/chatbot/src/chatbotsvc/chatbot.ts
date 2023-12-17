import { ChatbotResponse, ResponseType } from './types'


export class ChatbotService {
  async processMessage(message: string): Promise<ChatbotResponse[]> {
    // Business logic to process message and generate response
    // Placeholder response generation
    return [{ type: ResponseType.TEXT, content: `Echo: ${message}` }]
  }
}
