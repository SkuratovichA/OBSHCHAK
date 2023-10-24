import { Debt, DebtGroup, DebtGroupParticipation, DebtParticipation, Payment, User } from './orm'

import { DataSource } from 'typeorm'
import { PSQL_DATABASE_NAME, PSQL_HOST, PSQL_PASSWORD, PSQL_PORT, PSQL_USERNAME } from '../config'

export const dataSource = new DataSource({
  type: 'postgres',
  host: PSQL_HOST,
  port: PSQL_PORT,
  username: PSQL_USERNAME,
  password: PSQL_PASSWORD,
  database: PSQL_DATABASE_NAME,
  entities: [User, Debt, DebtGroup, DebtGroupParticipation, DebtParticipation, Payment],
  synchronize: true,
})

dataSource
  .connect()
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.error(err)
  })
