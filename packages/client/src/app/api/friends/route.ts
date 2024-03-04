import type { NextRequest } from 'next/server'
import type { FriendsMap } from 'app-common'
import { friendsMock } from 'app-common'
import { isFriendsRequestBody } from '@OBSHCHAK-UI/app/api/friends/types'

export async function POST(request: NextRequest) {
  const body = (await request.json())
  if (!isFriendsRequestBody(body)) {
    return Response.json(undefined, { status: 400 })
  }

  // const res = await fetch(`/v${API_VER}/groups`)
  // const data = await res.json()
  const friendsMap: FriendsMap = friendsMock()
    .reduce<FriendsMap>((acc, user) => ({
      ...acc,
      [user.id]: user,
    }), {})

  return Response.json(friendsMap, { status: 200 })
}
