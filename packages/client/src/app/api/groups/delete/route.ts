import type { NextRequest } from 'next/server'
import type { GroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { serializeGroup } from '@OBSHCHAK-UI/app/api/groups/utils'
import { isGroupsDeleteRequestBody } from '@OBSHCHAK-UI/app/api/groups/utils'
import { arrayToIdMap, groupsMock, updateGroupsMock } from 'app-common'

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!isGroupsDeleteRequestBody(body)) {
    return Response.json(undefined, { status: 400 })
  }

  // const res = await fetch(`/v${API_VER}/groups`)
  // const data = await res.json()
  const groupsMap: GroupsResponse = arrayToIdMap(
    updateGroupsMock(groupsMock().filter((group) => !body.groupIds.includes(group.id))).map(
      serializeGroup,
    ),
  )

  return Response.json(groupsMap, { status: 200 })
}
