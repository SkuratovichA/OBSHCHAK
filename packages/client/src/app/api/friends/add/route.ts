import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  if (!body) {
    return Response.json(undefined, { status: 400 })
  }
  console.log('Hello in friends adding', body)

  throw new Error('Not implemented')
  return Response.json(undefined, { status: 200 })
}
