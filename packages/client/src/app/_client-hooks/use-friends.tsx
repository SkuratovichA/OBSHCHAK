'use client'

import type { Maybe, ObshchakUser, Pendable } from 'app-common'
import { nextEndpointsMap } from 'app-common'
import { arrayToIdMap } from 'app-common'
import { useCallback } from 'react'
import type { FriendsResponse } from '@OBSHCHAK-UI/app/api/friends/utils'
import { isFriendsResponse } from '@OBSHCHAK-UI/app/api/friends/utils'
import {
  reducer,
  ReducerActionType,
  useSafeOptimistic,
} from '@OBSHCHAK-UI/app/_client-hooks/use-safe-optimistic'

export type OptimisticFriends = FriendsResponse<Pendable>

const modifyFriends = async (
  endpoint: string,
  body: ObshchakUser,
): Promise<Maybe<FriendsResponse>> => {
  try {
    const friendsPromise = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const friendsResponse = await friendsPromise.json()
    if (!isFriendsResponse(friendsResponse)) {
      throw new Error(`Invalid friends response ${JSON.stringify(friendsResponse)}`)
    }
    return friendsResponse
  } catch (e: unknown) {
    console.error('Error modifying friends', e)
    return null
  }
}

export type UseFriendsResult = {
  friends: Maybe<FriendsResponse>
  addFriend: (friend: ObshchakUser) => Promise<void>
  removeFriend: (friend: ObshchakUser) => Promise<void>
}

type UseFriends = (friends: Maybe<FriendsResponse>) => UseFriendsResult

export const useFriends: UseFriends = (friends) => {
  const [optimisticFriends, dispatchOptimisticFriend] = useSafeOptimistic<
    Maybe<FriendsResponse>,
    ReducerActionType
  >(friends, reducer)

  const removeFriend = useCallback(
    async (friend: ObshchakUser) => {
      console.log('useFriends: REMOVE FRIEND')
      dispatchOptimisticFriend({
        type: ReducerActionType.REMOVE,
        payload: arrayToIdMap([friend]),
      })
      const newFriends = await modifyFriends(nextEndpointsMap.DELETE_FRIEND(), friend)
    },
    [dispatchOptimisticFriend],
  )

  const addFriend = useCallback(
    async (friend: ObshchakUser) => {
      dispatchOptimisticFriend({
        type: ReducerActionType.ADD,
        payload: arrayToIdMap([friend]),
      })
      const newFriends = await modifyFriends(nextEndpointsMap.ADD_FRIEND(), friend)
    },
    [dispatchOptimisticFriend],
  )

  return {
    friends: optimisticFriends,
    addFriend,
    removeFriend,
  }
}
