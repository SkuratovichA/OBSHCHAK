import { NextRequest } from 'next/server'
import { isArray } from 'lodash'

export type GroupsSearchParams = {
  usernames: string[]
} & Partial<{
  page: number
  limit: number
}>

export type GroupsSearchResponse = any[]

const isGroupSearchParams = (obj: any): obj is GroupsSearchParams =>
  obj && isArray(obj.usernames)

export async function POST(request: NextRequest) {
  console.log(
    'Hello in group fetching',
  )
  const body: GroupsSearchParams = (await request.json())

  if (!isGroupSearchParams(body)) {
    return Response.json(undefined, { status: 400 })
  }
  console.log('group fetching body:', body)

  // const res = await fetch(`/v${API_VER}/groups`)
  // const data = await res.json()
  const data: GroupsSearchResponse = []

  return Response.json(data, { status: 200 })
}
