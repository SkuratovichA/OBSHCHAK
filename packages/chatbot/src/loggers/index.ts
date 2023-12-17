import * as winston from 'winston'

export const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
  // transports: [new winston.transports.File({ filename: './logs/conversation.log' })],
})
