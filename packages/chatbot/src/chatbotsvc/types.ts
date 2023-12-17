export enum ResponseType {
  TEXT = 'TEXT',
  FUNCTION_CALL = 'FUNCTION_CALL',
}

export type ChatbotResponse = {
  type: ResponseType;
  content: string;
}
