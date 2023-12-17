import dotenvExpand from 'dotenv-expand'
import dotenv from 'dotenv'

dotenvExpand(dotenv.config())

export const PSQL_USERNAME = process.env.PSQL_USERNAME ?? ''
export const PSQL_PASSWORD = process.env.PSQL_PASSWORD ?? ''
export const PSQL_DATABASE_NAME = process.env.PSQL_DATABASE_NAME ?? ''
export const PSQL_HOST = process.env.PSQL_HOST ?? ''
export const PSQL_PORT = Number(process.env.PSQL_PORT) ?? 0

export const GOOGLE_CLOUD_CLIENT_ID = process.env.GOOGLE_CLOUD_CLIENT_ID as string

export const GOOGLE_CLOUD_CLIENT_SECRET = process.env.GOOGLE_CLOUD_CLIENT_SECRET as string

// TODO: add logging
