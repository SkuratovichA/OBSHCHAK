import type { NextRequest } from 'next/server'
import { arrayToIdMap } from 'app-common'
import { debtsMock } from 'app-common'

import type { DebtsResponse } from './utils'
import { isDebtsSearchParams } from './utils'
import { match, P } from 'ts-pattern'
import { isEmpty } from 'lodash'

export async function POST(request: NextRequest) {
  console.log('Hello in debt fetching')

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const body = await request.json()
  if (!isDebtsSearchParams(body)) {
    return Response.json(undefined, { status: 400 })
  }

  console.log('debt fetching body:', body)

  const intercepts = <T extends string | number>(one?: T[], two?: T[]) =>
    one?.some((it) => two?.includes(it))

  // get a session here.
  // const res = await fetch(`/v${API_VER}/debts`)
  // const data = await res.json()
  const data: DebtsResponse = arrayToIdMap(
    debtsMock().filter((debt) =>
      match([body.usernames, body.groups])
        .returnType<boolean>()
        // pain
        .with(
          [P.when((u) => !u.length), P.when((u) => !u.length)],
          [P.nullish, P.nullish],
          [P.when(isEmpty), P.when((requestGroups) => intercepts(requestGroups, debt.groups))],
          [
            P.when((requestUsers) =>
              intercepts(requestUsers, [debt.from, ...debt.to.map((u) => u.username)]),
            ),
            P.when(isEmpty),
          ],
          [
            P.when((requestUsers) =>
              intercepts(requestUsers, [debt.from, ...debt.to.map((u) => u.username)]),
            ),
            P.when((requestGroups) => intercepts(requestGroups, debt.groups)),
          ],
          () => true,
        )
        .otherwise(() => false),
    ),
  )

  return Response.json(data, { status: 200 })
}
