import type { NextRequest } from 'next/server'
import { transactionsMock } from 'app-common'


export type TransactionsSearchParams = {
  usernames: string[]
} & Partial<{
  afterDate: string
  beforeDate: string
  minAmount: number
  maxAmount: number
  page: number
  limit: number
}>

// creates a new transaction
export async function POST(request: NextRequest) {
  console.log(
    'Hello in transaction creation',
  )
  const body = await request.json()
  console.log('transaction creation body:', body)

  // const res = await fetch(`/v${API_VER}/transactions`)
  // const data = await res.json()
  const data = transactionsMock

  return Response.json(data, { status: 200 })
}
