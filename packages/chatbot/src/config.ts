import { hideCriticalString } from 'app-common'
import { logger } from './loggers'
import dotenvExpand from 'dotenv-expand'
import dotenv from 'dotenv'

dotenvExpand(dotenv.config())

export const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY ?? ''

logger.info(`OPENAI_API_KEY: ${hideCriticalString(OPENAI_API_KEY)}`)
