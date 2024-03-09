import type { NextRequest } from 'next/server'
import type { Paginatable, Transaction} from 'app-common';
import { transactionsMock } from 'app-common'
import { isArray } from 'lodash'


export type TransactionsSearchParams = Paginatable<{
  usernames: string[]
} & Partial<{
  afterDate: string
  beforeDate: string
  minAmount: number
  maxAmount: number
}>>

const isTransactionsSearchParams = (obj: object): obj is TransactionsSearchParams =>
  obj && 'usernames' in obj && isArray(obj.usernames)

export type TransactionsSearchResponse = Transaction[]

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

  // const res = await fetch(`/v${API_VER}/transactions`)
  // const data = await res.json()
  const data = transactionsMock().filter((t) =>
    !body.usernames.length || body.usernames.includes(t.from) || t.to.some(({ username }) => body.usernames.includes(username)),
  )

  return Response.json(data, { status: 200 })
}
