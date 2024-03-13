import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  console.log('Debts Update:', body)

  const data = {}
  // const res = await fetch(`/v${API_VER}/debts`)
  // const data = await res.json()

  return Response.json(data, { status: 200 })
}
