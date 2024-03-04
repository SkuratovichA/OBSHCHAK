import { API_PATH } from '../config'

enum NEXT_ENDPOINTS {
  FRIENDS = '/friends',
  ADD_FRIEND = '/friends/add',
  DELETE_FRIEND = '/friends/delete',
  TRANSACTIONS = '/transactions',
}

export type ApiEndpoints<T extends Record<string, string>, API_BASE_PATH extends string> = {
  [K in keyof T]: () => `${API_BASE_PATH}/${T[K]}`
}

// TODO: fucking integrate me everywhere PLEASE Sasha
export const nextEndpointsMap: ApiEndpoints<typeof NEXT_ENDPOINTS, typeof API_PATH> = {
  FRIENDS: () => `${API_PATH}/${NEXT_ENDPOINTS.FRIENDS}`,
  ADD_FRIEND: () => `${API_PATH}/${NEXT_ENDPOINTS.ADD_FRIEND}`,
  DELETE_FRIEND: () => `${API_PATH}/${NEXT_ENDPOINTS.DELETE_FRIEND}`,
  TRANSACTIONS: () => `${API_PATH}/${NEXT_ENDPOINTS.TRANSACTIONS}`,
}
