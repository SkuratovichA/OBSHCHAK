import type { NextRequest } from 'next/server'
import type { ObshchakUser } from 'app-common'
import { arrayToIdMap, groupsMock } from 'app-common'
import type { GroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { serializeGroup } from '@OBSHCHAK-UI/app/api/groups/utils'
import { isGroupsRequestBody } from '@OBSHCHAK-UI/app/api/groups/utils'

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
        !body.usernames ||
        // check if some of the usernames are in the array of group.members({usernames})
        body.usernames.some(username => group.members.some(member => member.username === username)),
      )
      .map(serializeGroup),
  )
  return Response.json(data, { status: 200 })
}
