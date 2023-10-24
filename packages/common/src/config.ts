export const API_ORIGIN = process.env.REACT_APP_API_ORIGIN ?? 'http://localhost'
export const API_PORT = process.env.PORT ?? '8000'
export const CLIENT_PORT = process.env.REACT_APP_CLIENT_PORT ?? '3000'

export const API_VER = 1
export const API_PATH = `${API_ORIGIN}:${API_PORT}`
export const CLIENT_PATH = process.env.REACT_APP_CLIENT_PATH ?? `${API_ORIGIN}:${CLIENT_PORT}`

export const GOOGLE_CLOUD_CLIENT_ID = process.env.GOOGLE_CLOUD_CLIENT_ID as string
if (!GOOGLE_CLOUD_CLIENT_ID) {
  throw new Error('Missing GOOGLE_CLOUD_CLIENT_ID')
}
export const GOOGLE_CLOUD_CLIENT_SECRET = process.env.GOOGLE_CLOUD_CLIENT_SECRET as string
if (!GOOGLE_CLOUD_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_CLOUD_CLIENT_SECRET')
}
