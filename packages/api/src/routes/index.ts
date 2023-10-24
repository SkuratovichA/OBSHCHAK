import Router from 'koa-router'
import { UserSocketsManager } from '../socket-manager'
import * as transactionController from '../controllers/transaction-controller'

export const setupRoutes = (userSocketsManager: UserSocketsManager) => {
  const router = new Router()

  router.post('/transactions', transactionController.createTransaction(userSocketsManager))
  router.patch('/transactions/:id', transactionController.updateTransaction(userSocketsManager))

  // ... more routes

  return router
}
