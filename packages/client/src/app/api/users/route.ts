import type { NextRequest } from 'next/server'
import type { ObshchakUser } from 'app-common'
import { friendsMock } from 'app-common'
import { isArray } from 'lodash'

export interface UserSearchParams {
  usernames: string[]
  // if not specified, fetches all the information
  // works like some graphql
  userInformation?: Partial<ObshchakUser>
}

export type UsersSearchResponse = ObshchakUser[]

const isUserSearchParams = (obj: object): obj is UserSearchParams =>
  obj && 'usernames' in obj && isArray(obj.usernames) // FIXME: add userInformation check

// NOTE: ehhhhmmmm? maybe some user creating? maybe. Let's keep it here
export async function POST(request: NextRequest) {
  const body = await request.json()
  if (!isUserSearchParams(body)) {
    return Response.json(undefined, { status: 400 })
  }

  const userData: UsersSearchResponse = friendsMock().filter(
    (user) => body.usernames.length === 0 || body.usernames.includes(user.username),
  )

  return Response.json(userData, { status: 200 })
}
