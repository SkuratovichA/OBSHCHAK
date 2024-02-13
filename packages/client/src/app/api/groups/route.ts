import { API_VER } from 'app-common'
import { NextRequest } from 'next/server'

export type GroupsSearchParams = {
  usernames: string[]
} & Partial<{
  page: number
  limit: number
}>


export async function POST(request: NextRequest) {
  console.log(
    'Hello in group fetching',
  )
  const body = await request.json()
  console.log('group fetching body:', body)

  // const res = await fetch(`/v${API_VER}/groups`)
  // const data = await res.json()
  const data: Array<any> = []

  return Response.json(data, { status: 200 })
}
