export const GET = (request: Request) => {
  console.log('get request')
  return new Response('Hello world!')
}

export const POST = (request: Request) => {
  console.log('post request')
  return new Response(JSON.stringify({ message: 'why are you gae?' }))
}
