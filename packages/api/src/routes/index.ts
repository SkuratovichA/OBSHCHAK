import Router from 'koa-router'
import { UserSocketsManager } from '../websockets'
import { API_PATH, API_VER, CLIENT_PATH, GOOGLE_CLOUD_CLIENT_ID, GOOGLE_CLOUD_CLIENT_SECRET } from 'app-common'

import passport from 'koa-passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { dataSource, User } from '../model'

passport.use(new GoogleStrategy({
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
))

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


  router.get(`/v${API_VER}/auth/google`, passport.authenticate('google', { scope: [ 'profile', 'email' ] }))
  router.get(`/v${API_VER}/auth/google/callback`, passport.authenticate('google', { failureRedirect: `${CLIENT_PATH}/login` }), (ctx) => {
    ctx.redirect(`${CLIENT_PATH}/`)
  })
  return router
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
// router.post('/v${API_VER}/debts', debtController.createDebt)
// router.get('/v${API_VER}/debts/:debtId', debtController.getDebt)
// router.put('/v${API_VER}/debts/:debtId', debtController.updateDebt)
// router.delete('/v${API_VER}/debts/:debtId', debtController.deleteDebt)
//
// router.post('/v${API_VER}/debts/:debtId/participations', participationController.createParticipation)
// router.get('/v${API_VER}/debts/:debtId/participations', participationController.listParticipations)
// router.put('/v${API_VER}/debts/:debtId/participations/:participationId', participationController.updateParticipation)
//
// router.post('/v${API_VER}/debts/:debtId/payments', paymentController.makePayment)
// router.get('/v${API_VER}/debts/:debtId/payments', paymentController.listPayments)
// router.get('/v${API_VER}/payments/:paymentId', paymentController.getPayment)
//
// router.post('/v${API_VER}/debt-groups', debtGroupController.createDebtGroup)
// router.get('/v${API_VER}/debt-groups/:groupId', debtGroupController.getDebtGroup)
// router.put('/v${API_VER}/debt-groups/:groupId', debtGroupController.updateDebtGroup)

