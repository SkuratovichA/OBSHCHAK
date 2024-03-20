// gets the specified information (in the type) about the user(s)
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log('Users Update:', body)

  const data = {}
  // const res = await fetch(`/v${API_VER}/users`)
  // const data = await res.json()

  return Response.json(data, { status: 200 })
}
