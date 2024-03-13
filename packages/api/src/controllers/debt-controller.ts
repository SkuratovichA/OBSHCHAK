// import { Context } from 'koa'
// import { UserSocketsManager } from '../websockets'

export default {}

// interface CreateDebtBodyProps {
//   name: string
//   description: string
//   totalAmount: number
//   creatorUserId: number
// }

/**
 * FIXME: тут короче точно не должно быть этог
const isCreateDebtBodyProps = (obj: any): obj is CreateDebtBodyProps =>
   obj
  && 'name' in obj && typeof obj.name === 'string'
  && 'description' in obj && typeof obj.description === 'string'
  && 'totalAmount' in obj && typeof obj.totalAmount === 'number'
  && 'creatorUserId' in obj && typeof obj.creatorUserId === 'number'

export const createDebt = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
  console.log(`CREATE DEBT`)
  if (!isCreateDebtBodyProps(ctx.request.body)) {
    return
  }
  // TODO: do auth
  const { name, description, totalAmount, creatorUserId } = ctx.request.body

  // ORM Logic
  const debtController = dataSource.getRepository(Debt)
  const userController = dataSource.getRepository(User)

  const creatorUser: User | null = await userController.findOne({
    where: {
      userId: creatorUserId.toString()
    },
  })

  if (!creatorUser) {
    console.error('User not found. weird.')
    return
  }

  const debt = debtController.create({
    name,
    description,
    totalAmount,
    creatorUser,
  })

  // userSocketsManager.emitToUser(creatorUser.userId, 'debtCreated', { debtId: debt.debtId })
  // ctx.body = debt
}

export const updateDebt = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
  console.log(`UPDATE DEBT`)

  // TODO: do auth
  const debtId = ctx.params.debtId
  const { name, description, totalAmount } = ctx.request.body

  // ORM Logic
  const debt = await Debt.findOne(debtId)
  if (!debt) {
    ctx.status = 404
    ctx.body = { error: 'Debt not found' }
    return
  }

  debt.name = name || debt.name
  debt.description = description || debt.description
  debt.totalAmount = totalAmount || debt.totalAmount
  await debt.save()

  userSocketsManager.emitToUser(debt.creatorUser.userId, 'debtUpdated', { debtId: debt.debtId })
  ctx.body = debt
}
 */

// interface DebtRequestBody {
//   name: string;
//   description: string;
//   totalAmount: number;
//   creatorUserId: string;
//   participants: {
//     userId: string;
//     role: ParticipationRoleType;
//     amount: number;
//     status?: ParticipationStatusType;
//   }[];
// }
//
// interface PaymentRequestBody {
//   debtParticipationId: string;
//   amount: number;
//   method: PaymentMethodType;
//   status: PaymentStatusType;
// }
//
// interface MergeDebtsRequestBody {
//   debts: string[];  // Array of debtIds to be merged
//   name: string;
//   description: string;
//   totalAmount: number;
//   creatorUserId: string;
//   participants: {
//     userId: string;
//     role: ParticipationRoleType;
//     amount: number;
//     status?: ParticipationStatusType;
//   }[];
// }
//
// const isDebtRequestBody = (obj: any): obj is DebtRequestBody =>
//    obj && 'name' in obj && 'description' in obj && 'totalAmount' in obj && 'creatorUserId' in obj && 'participants' in obj
// const isMergePaymentsRequestBody = (obj: any): obj is MergeDebtsRequestBody =>
//   obj && 'debts' in obj && 'name' in obj && 'description' in obj && 'totalAmount' in obj && 'creatorUserId' in obj && 'participants' in obj
// const isPaymentRequestBody = (obj: any): obj is PaymentRequestBody =>
//   obj && 'debtParticipationId' in obj && 'amount' in obj && 'method' in obj && 'status' in obj
//
//
//
//
// export const createDebt = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
//   const body = ctx.request.body
//   if (!isDebtRequestBody(body)) {
//     ctx.throw(400, 'Invalid request body')
//   }
//   console.log(`CREATE DEBT`)
//
//   // TODO: do auth
//
//   // Emit a notification to all participants involved in the debt.
//   body.participants.forEach(({userId}) => userSocketsManager.emitToUser(userId, 'debt', body))
// }
//
// export const updateDebt = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
//   const body = ctx.request.body
//   if (!isDebtRequestBody(body)) {
//     ctx.throw(400, 'Invalid request body')
//   }
//   console.log(`UPDATE DEBT`)
//
//   // TODO: do auth
//
//   // Notify involved users about the debt update.
//   body.participants.forEach(({userId}) => userSocketsManager.emitToUser(userId, 'debtUpdate', body))
// }
//
//
// export const deleteDebt = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
//   const body = ctx.request.body
//   if (!isDebtRequestBody(body)) {
//     ctx.throw(400, 'Invalid request body')
//   }
//   console.log(`DELETE DEBT`)
//   // TODO: do auth
//
//   body.participants.forEach(({userId}) => userSocketsManager.emitToUser(userId, 'debtResolved', body.id))
// }
//
// export const mergeDebts = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
//   const body = ctx.request.body
//   if (!isMergePaymentsRequestBody(body)) {
//     ctx.throw(400, 'Invalid request body')
//   }
//   console.log(`MERGE DEBTS`)
//
//   // TODO: do auth
//
//   // Notify involved users that their debts have been merged.
//   body.participants.forEach(({userId}) => userSocketsManager.emitToUser(userId, 'debtMerged', body.hui))
// }
//
// export const createPayment = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
//   const body = ctx.request.body
//   if (!isPaymentRequestBody(body)) {
//     ctx.throw(400, 'Invalid request body')
//   }
//   console.log(`CREATE PAYMENT`)
//
//   // TODO: do auth
//   // Notify the debt owner about the payment.
//
//   userSocketsManager.emitToUser(body.debtParticipationId, 'paymentReceived', body)
// }
//
// export const updatePayment = (userSocketsManager: UserSocketsManager) => async (ctx: Context) => {
//   const body = ctx.request.body
//
//   console.log(`UPDATE PAYMENT`)
//   // TODO: do auth
//
//   // Notify the debt owner about the payment update.
//   userSocketsManager.emitToUser(ctx.params.id, 'paymentUpdated', ctx.request.body)
// }
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
// router.post('/debts', async (ctx: Koa.ParameterizedContext) => {
//   const { amount, fromUserId, toUserId } = ctx.request.body as Partial<Debt>
//   const item: Debt = {
//     id: 'someId', // Generate a unique ID
//     amount: amount!,
//     fromUserId: fromUserId!,
//     toUserId: toUserId!,
//     status: 'PENDING',
//   }
//
//   debts.push(item)
//
//   // Notify the receiver about the new item
//   const receiverConnections = userConnections[toUserId!] || []
//   receiverConnections.forEach(socket => socket.emit('new_debt', item))
//
//   ctx.status = 201
//   ctx.body = item
// })
//
// router.patch('/debts/:id', async (ctx: Koa.ParameterizedContext) => {
//   const { id } = ctx.params
//   const { status } = ctx.request.body as { status: Debt['status'] }
//   const item = debts.find(t => t.id === id)
//
//   if (!item) {
//     ctx.status = 404
//     return
//   }
//
//   item.status = status
//
//   // Notify the involved users about the status change
//   const involvedUsers = [ item.fromUserId, item.toUserId ]
//   involvedUsers.forEach(userId => {
//     const connections = userConnections[userId] || []
//     connections.forEach(socket => socket.emit('debt_updated', item))
//   })
//
//   ctx.status = 200
//   ctx.body = item
// })
