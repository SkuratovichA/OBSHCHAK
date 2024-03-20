import type { NextRequest } from 'next/server'
import { arrayToIdMap } from 'app-common'
import { debtsMock } from 'app-common'

import type { DebtsResponse } from './utils'
import { isDebtsSearchParams } from './utils'

export async function POST(request: NextRequest) {
  console.log('Hello in debt fetching')

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const body = await request.json()
  if (!isDebtsSearchParams(body)) {
    return Response.json(undefined, { status: 400 })
  }

  console.log('debt fetching body:', body)

  // get a session here.
  // const res = await fetch(`/v${API_VER}/debts`)
  // const data = await res.json()
  const data: DebtsResponse = arrayToIdMap(
    debtsMock().filter(
      (t) =>
        !body.usernames.length ||
        body.usernames.includes(t.from) ||
        t.to.some(({ username }) => body.usernames.includes(username)),
    ),
  )

  return Response.json(data, { status: 200 })
}
