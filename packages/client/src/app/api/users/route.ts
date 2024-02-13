import { NextRequest } from 'next/server'
import { ObshchakUser, usersMock } from 'app-common'

export interface UserSearchParams {
  usernames: string[]
  // if not specified, fetches all the information
  // works like some graphql
  userInformation?: Partial<ObshchakUser>
}

// NOTE: ehhhhmmmm? maybe some user creating? maybe. Let's keep it here
export async function POST(request: NextRequest) {

  const body = await request.json()
  console.log(
    "Users Get users or user with some properties", body
  )
  const data = usersMock

  return Response.json(data, {status: 200})
}
