import type { NextRequest } from 'next/server'
import type { ObshchakUser } from 'app-common'
import { arrayToIdMap, groupsMock } from 'app-common'
import type { GroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { serializeGroup } from '@OBSHCHAK-UI/app/api/groups/utils'
import { isGroupsRequestBody } from '@OBSHCHAK-UI/app/api/groups/utils'
import { match, P } from 'ts-pattern'

export type GroupsSearchParams = {
  usernames: ObshchakUser['username']
} & Partial<{
  page: number
  limit: number
}>

export async function POST(request: NextRequest) {
  const body: GroupsSearchParams = await request.json()

  if (!isGroupsRequestBody(body)) {
    return Response.json(undefined, { status: 400 })
  }

  // const res = await fetch(`/v${API_VER}/groups`)
  // const data = await res.json()
  const data: GroupsResponse = arrayToIdMap(
    groupsMock()
      .filter(group =>
        match(body)
          .with({ groupId: P.select('groupId', P.string) }, ({ groupId }) =>
            groupId === group.id,
          )
          .with({ usernames: P.select('usernames', P.array(P.string)) }, ({ usernames }) =>
            usernames.some(username => group.members.some(member => member.username === username)),
          )
          .otherwise(() =>
            true,
          ),
      )
      .map(serializeGroup),
  )
  return Response.json(data, { status: 200 })
}
