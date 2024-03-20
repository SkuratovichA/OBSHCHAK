import type { NextRequest } from 'next/server'
import { friendsMock } from 'app-common'
import type { FriendsResponse } from '@OBSHCHAK-UI/app/api/friends/utils'
import { isFriendsRequestBody } from '@OBSHCHAK-UI/app/api/friends/utils'

export async function POST(request: NextRequest) {
  const body = await request.json()
  if (!isFriendsRequestBody(body)) {
    return Response.json(undefined, { status: 400 })
  }

  // const res = await fetch(`/v${API_VER}/groups`)
  // const data = await res.json()
  const friendsMap: FriendsResponse = friendsMock().reduce<FriendsResponse>(
    (acc, user) => ({
      ...acc,
      [user.id]: user,
    }),
    {},
  )

  return Response.json(friendsMap, { status: 200 })
}
