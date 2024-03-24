import type { NextRequest } from 'next/server'
import { deserializeGroup } from '@OBSHCHAK-UI/app/api/groups/utils'
import { isGroupsAddRequestBody } from '@OBSHCHAK-UI/app/api/groups/utils'
import { arrayToIdMap, groupsMock, updateGroupsMock } from 'app-common'

export async function POST(request: NextRequest) {
  const body = await request.json()
  if (!isGroupsAddRequestBody(body)) {
    return Response.json(undefined, { status: 400 })
  }

  const newGroups = body.groups
  // const res = await fetch(`/v${API_VER}/groups`)
  // const data = await res.json()
  const groupsMap = arrayToIdMap(
    updateGroupsMock([...groupsMock(), ...newGroups.map(deserializeGroup)]),
  )

  return Response.json(groupsMap, { status: 200 })
}
