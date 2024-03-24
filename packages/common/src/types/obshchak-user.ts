import type { WithId } from './index'

export type ObshchakUser = WithId<{
  name: string
  username: string
  email: string
  profileImage: string // so far URL, maybe should go with Bulbs
  mobileNumber: string
}>

export const isObshchakUser = (user: object): user is ObshchakUser =>
  user &&
  'id' in user &&
  typeof user.id === 'string' &&
  'name' in user &&
  typeof user.name === 'string' &&
  'username' in user &&
  typeof user.username === 'string' &&
  'email' in user &&
  typeof user.email === 'string' &&
  'profileImage' in user &&
  typeof user.profileImage === 'string' &&
  'mobileNumber' in user &&
  typeof user.mobileNumber === 'string'
