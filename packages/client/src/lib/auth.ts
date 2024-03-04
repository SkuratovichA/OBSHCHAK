import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { ObshchakUser, userDataMock } from 'app-common'
import { GOOGLE_CLOUD_CLIENT_ID, GOOGLE_CLOUD_CLIENT_SECRET } from '../config'

import { pick } from 'lodash'



export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt' as const,
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLOUD_CLIENT_ID,
      clientSecret: GOOGLE_CLOUD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user: _user, token }) {

      // TODO: auth - return the user from the api.
      // if no user has existed before, a new is gonna be created and returned,

      // const response = await fetch(`${API_PATH}/auth`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     userId: user.id,
      //     // ... any other user details you want to send
      //   }),
      // })
      //
      // if (!response.ok) {
      //   throw new Error('Failed to notify the backend')
      // }
      //
      // console.log('SUCCESS')

      const user: ObshchakUser = {
        ...userDataMock(),
        ...(pick(_user, ['email', 'name']) as Pick<ObshchakUser, | 'email' | 'name'>)
      }

      return {
        ...session,
        user,
      }
    },
    async redirect({ url, baseUrl }: any) {
      return Promise.resolve(baseUrl + '/transactions')
    },
  },
}
