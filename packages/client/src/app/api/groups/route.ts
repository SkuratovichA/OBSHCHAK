import type { NextRequest } from 'next/server'
import { isArray } from 'lodash'

export type GroupsSearchParams = {
  usernames: string[]
} & Partial<{
  page: number
  limit: number
}>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GroupsSearchResponse = any[]

const isGroupSearchParams = (obj: object): obj is GroupsSearchParams =>
  obj && 'usernames' in obj && isArray(obj.usernames)

export async function POST(request: NextRequest) {
  console.log('Hello in group fetching')
  const body: GroupsSearchParams = await request.json()

  if (!isGroupSearchParams(body)) {
    return Response.json(undefined, { status: 400 })
  }
  console.log('group fetching body:', body)

  // const res = await fetch(`/v${API_VER}/groups`)
  // const data = await res.json()
  const data: GroupsSearchResponse = []

  return Response.json(data, { status: 200 })
}
