import type { UserSocketsManager } from '../websockets'

// TODO: implement
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDebt = async (ctx: any, userSocketsManager: UserSocketsManager) => {
  console.log(`CREATE DEBT`)
  // print request payload

  console.log(ctx)
  console.log(ctx.request)
  console.log(ctx.request.body)
}
