import { Context } from 'koa'
import { UserSocketsManager } from '../websockets'

// export const createDebt = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
//   console.log(`CREATE DEBT`)
//   // TODO: do auth
//   // use this to update the Frontend
//   //   const receiverConnections = userConnections[toUserId!] || ]
//   //   receiverConnections.forEach(socket => socket.emit('debt', debt))
// }
//
// export const updateDebt = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
//   console.log(`UPDATE DEBT`)
//   // TODO: do auth
//   // use this to update the Frontend
//   //   const receiverConnections = userConnections[toUserId!] || ]
//   //   receiverConnections.forEach(socket => socket.emit('debt', debt))
// }
//
// router.post('/transactions', async (ctx: Koa.ParameterizedContext) => {
//   const { amount, fromUserId, toUserId } = ctx.request.body as Partial<Transaction>
//   const transaction: Transaction = {
//     id: 'someId', // Generate a unique ID
//     amount: amount!,
//     fromUserId: fromUserId!,
//     toUserId: toUserId!,
//     status: 'PENDING',
//   }
//
//   transactions.push(transaction)
//
//   // Notify the receiver about the new transaction
//   const receiverConnections = userConnections[toUserId!] || []
//   receiverConnections.forEach(socket => socket.emit('new_transaction', transaction))
//
//   ctx.status = 201
//   ctx.body = transaction
// })
//
// router.patch('/transactions/:id', async (ctx: Koa.ParameterizedContext) => {
//   const { id } = ctx.params
//   const { status } = ctx.request.body as { status: Transaction['status'] }
//   const transaction = transactions.find(t => t.id === id)
//
//   if (!transaction) {
//     ctx.status = 404
//     return
//   }
//
//   transaction.status = status
//
//   // Notify the involved users about the status change
//   const involvedUsers = [ transaction.fromUserId, transaction.toUserId ]
//   involvedUsers.forEach(userId => {
//     const connections = userConnections[userId] || []
//     connections.forEach(socket => socket.emit('transaction_updated', transaction))
//   })
//
//   ctx.status = 200
//   ctx.body = transaction
// })
