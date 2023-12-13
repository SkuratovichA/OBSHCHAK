export const GOOGLE_CLOUD_CLIENT_ID = process.env.GOOGLE_CLOUD_CLIENT_ID as string
if (!GOOGLE_CLOUD_CLIENT_ID) {
  throw new Error('Missing GOOGLE_CLOUD_CLIENT_ID')
}
export const GOOGLE_CLOUD_CLIENT_SECRET = process.env.GOOGLE_CLOUD_CLIENT_SECRET as string
if (!GOOGLE_CLOUD_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_CLOUD_CLIENT_SECRET')
}
