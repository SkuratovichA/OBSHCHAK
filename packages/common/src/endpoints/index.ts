import { NEXT_API_PATH } from '../config'

enum NEXT_ENDPOINTS {
  FRIENDS = 'friends',
  ADD_FRIEND = 'friends/add',
  DELETE_FRIEND = 'friends/delete',
  DEBTS = 'debts',
  CREATE_DEBT = 'debts/add',
  UPDATE_DEBT = 'debts/update',
  USERS = 'users',
  GROUPS = 'groups',
  CREATE_GROUP = 'groups/add',
  UPDATE_GROUP = 'groups/update',
  DELETE_GROUP = 'groups/delete', // for both deleting and leaving
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
  DEBTS: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.DEBTS}`,
  CREATE_DEBT: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.CREATE_DEBT}`,
  UPDATE_DEBT: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.UPDATE_DEBT}`,
  USERS: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.USERS}`,
  GROUPS: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.GROUPS}`,
  CREATE_GROUP: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.CREATE_GROUP}`,
  UPDATE_GROUP: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.UPDATE_GROUP}`,
  DELETE_GROUP: () => `${NEXT_API_PATH}/${NEXT_ENDPOINTS.DELETE_GROUP}`,
}
