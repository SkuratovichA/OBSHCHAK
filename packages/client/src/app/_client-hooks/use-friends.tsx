'use client'

import type { Maybe, ObshchakUser, Pendable } from 'app-common'
import { nextEndpointsMap, WithId } from 'app-common'
import { arrayToIdMap } from 'app-common'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSwr } from '@OBSHCHAK-UI/app/_client-hooks/use-suspense-swr'
import type { FriendsRequestBody, FriendsResponse } from '@OBSHCHAK-UI/app/api/friends/utils'
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

interface UseFriendsProps {
  userId: FriendsRequestBody['id']
}

export const useFriends = ({ userId }: UseFriendsProps) => {
  const fetcherProps = useMemo(
    () => ({
      id: userId,
    }),
    [userId],
  )

  const { data, error } = useSwr<FriendsRequestBody, FriendsResponse>(
    nextEndpointsMap.FRIENDS(),
    fetcherProps,
  )

  const [friends, setFriends] = useState<Maybe<FriendsResponse>>(data)
  const [optimisticFriends, dispatchOptimisticFriend] = useSafeOptimistic<
    Maybe<FriendsResponse>,
    ReducerActionType
  >(friends, reducer)

  // maybe this is redundant
  useEffect(() => {
    setFriends(data)
  }, [data])

  const removeFriend = useCallback(
    async (friend: ObshchakUser) => {
      console.log('useFriends: REMOVE FRIEND')
      dispatchOptimisticFriend({
        type: ReducerActionType.REMOVE,
        payload: arrayToIdMap([friend]),
      })
      const newFriends = await modifyFriends(nextEndpointsMap.DELETE_FRIEND(), friend)
      setFriends((prev) => newFriends ?? prev)
    },
    [dispatchOptimisticFriend, setFriends],
  )

  const addFriend = useCallback(
    () => async (friend: ObshchakUser) => {
      dispatchOptimisticFriend({
        type: ReducerActionType.ADD,
        payload: arrayToIdMap([friend]),
      })
      const newFriends = await modifyFriends(nextEndpointsMap.ADD_FRIEND(), friend)
      setFriends(() => (newFriends ? newFriends : friends))
    },
    [dispatchOptimisticFriend, setFriends, friends],
  )

  return {
    friends: optimisticFriends,
    error,
    addFriend,
    removeFriend,
  }
}
