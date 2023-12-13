import { UserSocketsManager } from '../websockets'
import { dummyDebts } from '../model'

export const createDebt = async (ctx: any, userSocketsManager: UserSocketsManager) => {
  console.log(`CREATE DEBT`)
  // print request payload

  console.log(ctx)
  console.log(ctx.request)
  console.log(ctx.request.body)
}