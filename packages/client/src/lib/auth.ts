import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { API_PATH } from 'app-common'
import { GOOGLE_CLOUD_CLIENT_ID, GOOGLE_CLOUD_CLIENT_SECRET } from '../config'

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
    async session({ session, user, token }) {
      // Notify the backend about the authentication
      const response = await fetch(`${API_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          // ... any other user details you want to send
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to notify the backend')
      }

      console.log('SUCCESS')
      return session
    },
    async redirect({ url, baseUrl }: any) {
      return Promise.resolve(baseUrl + '/home')
    },
  },
}
