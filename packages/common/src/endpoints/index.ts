import { NEXT_API_PATH } from '../config'

enum NEXT_ENDPOINTS {
  FRIENDS = '/friends',
  ADD_FRIEND = '/friends/add',
  DELETE_FRIEND = '/friends/delete',
  TRANSACTIONS = '/transactions',
  USERS = '/users',
  GROUPS = '/groups',
}

export type ApiEndpoints<T extends Record<string, string>, API_BASE_PATH extends string> = {
  [K in keyof T]: () => `${API_BASE_PATH}/${T[K]}`
}

// TODO: fucking integrate me everywhere PLEASE Sasha
// Why so complicated? because we wanna do it in a FP way.
export const nextEndpointsMap: ApiEndpoints<typeof NEXT_ENDPOINTS, typeof NEXT_API_PATH> = {
  FRIENDS: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.FRIENDS}`,
  ADD_FRIEND: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.ADD_FRIEND}`,
  DELETE_FRIEND: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.DELETE_FRIEND}`,
  TRANSACTIONS: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.TRANSACTIONS}`,
  USERS: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.USERS}`,
  GROUPS: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.GROUPS}`,
}
