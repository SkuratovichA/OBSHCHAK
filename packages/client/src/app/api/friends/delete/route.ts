import type { NextRequest } from 'next/server'
import { arrayToIdMap } from 'app-common'
import type { ObshchakUser } from 'app-common'
import { isObshchakUser, friendsMock, updateFriendsMock } from 'app-common'
import type { FriendsResponse } from '../utils'

export interface FriendSearchPayload {
  id: string
}

const isFriendsSearchPayload = (payload: object): payload is FriendSearchPayload =>
  isObshchakUser(payload)

export async function POST(request: NextRequest) {
  console.log('Hello in friend deleting')

  const body: ObshchakUser = await request.json()

  if (!isFriendsSearchPayload(body)) {
    return Response.json(undefined, { status: 400 })
  }
  console.log('friend deletion body:', body)

  // we need to receive an array of friends without the deleted one
  // const res = await fetch(
  //  `/v${API_VER}/friend`, {
  //    method: 'DELETE',
  //    body: JSON.stringify(body),
  //  }
  // )
  // const data = await res.json()
  const friends = updateFriendsMock(friendsMock().filter((user) => user.id !== body.id))
  const responseData: FriendsResponse = arrayToIdMap(friends)

  return Response.json(responseData, { status: 200 })
}
