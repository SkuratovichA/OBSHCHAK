export const API_ORIGIN = process.env.REACT_APP_API_ORIGIN ?? 'http://localhost'
export const API_PORT = process.env.PORT ?? '8000'
export const CLIENT_PORT = process.env.REACT_APP_CLIENT_PORT ?? '3000'

export const API_VER = 1
export const API_PATH = `${API_ORIGIN}:${API_PORT}`
export const CLIENT_PATH = process.env.REACT_APP_CLIENT_PATH ?? `${API_ORIGIN}:${CLIENT_PORT}`


export const OPENAI_STT_MODEL = 'whisper-1'
export const OPENAI_STT_URL = 'https://api.openai.com/v1/audio/transcriptions'
