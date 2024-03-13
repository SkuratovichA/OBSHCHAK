import type { NextRequest } from 'next/server'
import { entries, IdMap, isObshchakUser, Maybe, ObshchakUser, Paginatable, Transaction } from 'app-common'
import { arrayToIdMap } from 'app-common'
import { transactionsMock } from 'app-common'
import { isArray } from 'lodash'
import { FriendsResponse } from '@OBSHCHAK-UI/app/api/friends/types'


export type TransactionsSearchParams = Paginatable<{
  usernames: ObshchakUser['username'][]
  groups: string[]
}>

const isTransactionsSearchParams = (obj: object): obj is TransactionsSearchParams =>
  obj && 'usernames' in obj && isArray(obj.usernames)

export type TransactionsResponse = IdMap<Transaction>



// TODO: move to common. It looks like shit btw
export const isTransaction = (transaction: object): transaction is Transaction =>
  transaction &&
  'id' in transaction && typeof transaction.id === 'string' &&
  'description' in transaction && typeof transaction.description === 'string' &&
  'amount' in transaction && typeof transaction.amount === 'number' &&
  'name' in transaction && typeof transaction.name === 'string' &&
  'currency' in transaction && typeof transaction.currency === 'string' &&
  'from' in transaction && typeof transaction.from === 'string' &&
  'to' in transaction && isArray(transaction.to) &&
  'status' in transaction && typeof transaction.status === 'string' &&
  'transactionDate' in transaction && transaction.transactionDate instanceof Date &&
  'createdDate' in transaction && transaction.createdDate instanceof Date &&
  'resolvedDate' in transaction && (transaction.resolvedDate === null || transaction.resolvedDate instanceof Date)


export const isTransactionsResponse = (obj: object): obj is TransactionsResponse =>
  Object.entries(obj).every(([id, transaction]) => id === transaction.id && isTransaction(transaction))


// creates a new transaction
export async function POST(request: NextRequest) {
  console.log(
    'Hello in transaction fetching',
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const body = await request.json()
  if (!isTransactionsSearchParams(body)) {
    return Response.json(undefined, { status: 400 })
  }

  console.log('transaction fetching body:', body)

  // get a session here.
  // const res = await fetch(`/v${API_VER}/transactions`)
  // const data = await res.json()
  const data: TransactionsResponse = arrayToIdMap(
    transactionsMock()
      .filter((t) =>
        !body.usernames.length ||
        body.usernames.includes(t.from) ||
        t.to.some(({ username }) => body.usernames.includes(username)),
      ),
  )

  return Response.json(data, { status: 200 })
}
