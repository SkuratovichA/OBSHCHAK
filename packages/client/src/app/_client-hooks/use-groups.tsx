import { useCallback } from 'react'
import { useSWRConfig } from 'swr'
import type { Maybe, WithId, Group } from 'app-common'
import { arrayToIdMap } from 'app-common'
import { nextEndpointsMap } from 'app-common'
import {
  useSafeOptimistic,
  ReducerActionType,
  reducer,
} from '@OBSHCHAK-UI/app/_client-hooks/use-safe-optimistic'
import type { GroupsMap, GroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { deserializeGroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { isGroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'

const modifyGroups = async (endpoint: string, body: Partial<Group>): Promise<Maybe<GroupsMap>> => {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const jsonResponse: GroupsResponse = await res.json()

    if (!isGroupsResponse(jsonResponse)) {
      throw new Error(`Invalid groups response ${JSON.stringify(jsonResponse)}`)
    }

    return deserializeGroupsResponse(jsonResponse)
  } catch (e: unknown) {
    console.error('Error modifying groups', e)
    return null
  }
}

export type UseGroupsResult = {
  groups: Maybe<GroupsMap>
  createGroup: (group: Group) => Promise<void>
  updateGroup: (group: WithId<Partial<Group>>) => Promise<void>
  deleteGroup: (group: Group) => Promise<void>
  error?: boolean
}
type UseGroups = (groups: Maybe<GroupsMap>) => UseGroupsResult
export const useGroups: UseGroups = (groups) => {
  const { mutate } = useSWRConfig() // god please help me to make it work correctly

  const [optimisticGroups, dispatchOptimisticGroups] = useSafeOptimistic<
    Maybe<GroupsMap>,
    ReducerActionType
  >(groups, reducer)

  const createGroup = useCallback(
    async (group: Group) => {
      dispatchOptimisticGroups({
        type: ReducerActionType.ADD,
        payload: arrayToIdMap([group]),
      })

      const newGroups = await modifyGroups(nextEndpointsMap.CREATE_GROUP(), group)
      // setGroups((prev) => newGroups ?? prev)
      await mutate(nextEndpointsMap.GROUPS())
    },
    [dispatchOptimisticGroups, mutate],
  )

  const updateGroup = useCallback(
    async (group: WithId<Partial<Group>>) => {
      dispatchOptimisticGroups({
        type: ReducerActionType.UPDATE,
        payload: arrayToIdMap([group as Group]),
      })

      const newGroups = await modifyGroups(nextEndpointsMap.UPDATE_GROUP(), group)
      // setGroups((prev) => newGroups ?? prev)
      await mutate(nextEndpointsMap.GROUPS())
    },
    [dispatchOptimisticGroups, mutate],
  )

  const deleteGroup = useCallback(
    async (group: Group) => {
      dispatchOptimisticGroups({
        type: ReducerActionType.REMOVE,
        payload: arrayToIdMap([group]),
      })

      const newGroups = await modifyGroups(nextEndpointsMap.DELETE_GROUP(), group)
      // setGroups((prev) => newGroups ?? prev)
      await mutate(nextEndpointsMap.GROUPS())
    },
    [dispatchOptimisticGroups, mutate],
  )

  return {
    groups: optimisticGroups,
    createGroup,
    updateGroup,
    deleteGroup,
  }
}
