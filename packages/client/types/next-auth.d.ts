import type { ObshchakUser } from 'app-common'

/**
 * https://github.com/nextauthjs/next-auth/discussions/2979
 */
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ObshchakUser
  }
}
