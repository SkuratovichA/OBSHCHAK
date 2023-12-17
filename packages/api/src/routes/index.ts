import Router from 'koa-router'
import { UserSocketsManager } from '../websockets'
import { API_PATH, API_VER, CLIENT_PATH } from 'app-common'
import { GOOGLE_CLOUD_CLIENT_ID, GOOGLE_CLOUD_CLIENT_SECRET } from '../config'

import passport from 'koa-passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { dataSource, User } from '../model'
import * as transactionFunctions from './transactions'

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLOUD_CLIENT_ID,
      clientSecret: GOOGLE_CLOUD_CLIENT_SECRET,
      callbackURL: `${API_PATH}/v${API_VER}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(accessToken, refreshToken, profile)

      const userController = dataSource.getRepository(User)
      let user = await userController.findOne({
        where: {
          googleId: profile.id,
        },
      })

      if (!profile.emails) {
        cb(new Error('No email found'))
        return
      }

      if (!user) {
        user = userController.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        })
        await userController.save(user)
      }

      cb(null, user)
    },
  ),
)

passport.serializeUser((user: any, done) => {
  done(null, (user as User).userId)
})

passport.deserializeUser(async (id: string, done) => {
  const userController = dataSource.getRepository(User)

  try {
    const user = await userController.findOne({
      where: {
        userId: id,
      },
    })
    if (!user) {
      return done(new Error('User not found'))
    }
    done(null, user)
  } catch (error) {
    done(error)
  }
})

export const setupRoutes = (userSocketsManager: UserSocketsManager) => {
  const router = new Router()

  router.get(
    `/v${API_VER}/auth/google`,
    passport.authenticate('google', { scope: ['profile', 'email'] }),
  )
  router.get(
    `/v${API_VER}/auth/google/callback`,
    passport.authenticate('google', { failureRedirect: `${CLIENT_PATH}/login` }),
    (ctx) => {
      ctx.redirect(`${CLIENT_PATH}/`)
    },
  )
  router.get(`/v${API_VER}/user`, (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.body = ctx.state.user
    } else {
      ctx.status = 401
      ctx.body = { error: 'Not authenticated' }
    }
  })
  router.post(`/v${API_VER}/create-transaction`, async (ctx) =>
    transactionFunctions.createDebt(ctx, userSocketsManager),
  )

  return router
}

const getDebtsFunction = (userSocketsManager: UserSocketsManager) => async (ctx: any) => {
  console.log(`GET DEBTS`)
  // TODO: implement authentication
  // if (!ctx.isAuthenticated()) {
  //   ctx.status = 401
  //   ctx.body = { error: 'Not authenticated' }
  //   return
  // }

  // const userController = dataSource.getRepository(User)
  // TODO: implement transactions by user, and find them
  // const user = await userController.findOne({
  //   where: {
  //     userId: ctx.state.user.userId,
  //   },
  // })
  // if (!user) {
  //   ctx.status = 404
  //   ctx.body = { error: 'User not found' }
  //   return
  // }
  // const transactions = await user.transactions
  // ctx.body = transactions
  // ctx.status = 200
}

// const loginFunction = (userSocketsManager: UserSocketsManager) => async (ctx: any) => {
//   console.log(`LOGIN`)
//
//   if (!ctx.request.body || !('username' in ctx.request.body || 'email' in ctx.request.body)) {
//     ctx.status = 400
//     return
//   }
//
//   const userController = dataSource.getRepository(User)
//   // if user with email or username exists log in succespully
//   const { username, email } = ctx.request.body
//   // find in the database
//   const user = await userController.findOne({
//     where: {
//       name: username,
//       email,
//     },
//   })
//
//   if (!user) {
//     console.log('User not found')
//     ctx.status = 404
//     return
//   }
//   console.log(user)
//
//   ctx.body = user
//   ctx.status = 200
// }
//
// const signupFunction = (userSocketsManager: UserSocketsManager) => async (ctx: any) => {
//   console.log(`SIGNUP`)
//
//   const userController = dataSource.getRepository(User)
//   if (!ctx.request.body || !('username' in ctx.request.body && 'email' in ctx.request.body)) {
//     ctx.status = 400
//     return
//   }
//
//   const { username, email } = ctx.request.body
//
//   console.log(username, email)
//
//   const user = userController.create({
//     name: username,
//     email,
//   })
//   await userController.save(user)
//
//   ctx.body = user
//   ctx.status = 201
// }
//
//
// router.post(`/v${API_VER}/login`, loginFunction(userSocketsManager))
// router.post(`/v${API_VER}/signup`, signupFunction(userSocketsManager))

// router.post(`/v${API_VER}/users`, userController.createUser)
// router.get('/v${API_VER}/users/:userId', userController.getUser)
//
// router.post('/v${API_VER}/transactions', transactionController.createDebt)
// router.get('/v${API_VER}/transactions/:transactionId', transactionController.getDebt)
// router.put('/v${API_VER}/transactions/:transactionId', transactionController.updateDebt)
// router.delete('/v${API_VER}/transactions/:transactionId', transactionController.deleteDebt)
//
// router.post('/v${API_VER}/transactions/:transactionId/participations', participationController.createParticipation)
// router.get('/v${API_VER}/transactions/:transactionId/participations', participationController.listParticipations)
// router.put('/v${API_VER}/transactions/:transactionId/participations/:participationId', participationController.updateParticipation)
//
// router.post('/v${API_VER}/transactions/:transactionId/payments', paymentController.makePayment)
// router.get('/v${API_VER}/transactions/:transactionId/payments', paymentController.listPayments)
// router.get('/v${API_VER}/payments/:paymentId', paymentController.getPayment)
//
// router.post('/v${API_VER}/transaction-groups', transactionGroupController.createDebtGroup)
// router.get('/v${API_VER}/transaction-groups/:groupId', transactionGroupController.getDebtGroup)
// router.put('/v${API_VER}/transaction-groups/:groupId', transactionGroupController.updateDebtGroup)
