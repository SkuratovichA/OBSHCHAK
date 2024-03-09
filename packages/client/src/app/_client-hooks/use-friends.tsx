'use client'

import type { FriendsMap, Maybe, ObshchakUser, Pendable } from 'app-common'
import { useCallback, useEffect, useMemo, useOptimistic, useState } from 'react'
import { match } from 'ts-pattern'
import type { State } from 'swr'
import useSWR from 'swr'
import { fetcher } from '@OBSHCHAK-UI/app/_client-hooks/use-suspense-swr'
import type { FriendsRequestBody, FriendsResponse} from '@OBSHCHAK-UI/app/api/friends/types';
import { isFriendsResponse } from '@OBSHCHAK-UI/app/api/friends/types'


enum ReducerActionType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',

}

type ReducerActionProp<T, S> = {
  type: T,
  payload: S
}

export type OptimisticFriends = FriendsMap<Pendable>


type OptimisticReducerAction = ReducerActionProp<ReducerActionType, ObshchakUser>

const reducer = (
  state: Maybe<OptimisticFriends>,
  action: OptimisticReducerAction,
) => match(action)
  .with({ type: ReducerActionType.ADD }, { type: ReducerActionType.REMOVE },
    ({ payload }): OptimisticFriends => ({
      ...state,
      [payload.id]: {
        ...payload,
        pending: true,
      },
    }),
  )
  .exhaustive()


const modifyFriends = async (endpoint: string, friend: ObshchakUser): Promise<Maybe<FriendsMap>> => {
  try {
    const friendsPromise = await fetch(
      endpoint, {
        method: 'POST',
        body: JSON.stringify(friend),
      },
    )
    const friendsResponse = await friendsPromise.json()
    if (!isFriendsResponse(friendsResponse)) {
      throw new Error(`Invalid friends response ${JSON.stringify(friendsResponse)}`)
    }
    return friendsResponse
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e.message)
    return new Promise(() => null)
  }
}


interface UseFriendsProps {
  userId: FriendsRequestBody['id']
}

export const useFriends = ({ userId }: UseFriendsProps) => {

  const swrCallback = useMemo(() => {
    return function <T, S>([uri, params]: [string, T]) {
      return fetcher<T, S>(uri, params)
    }
  }, [])

  const fetcherProps = useMemo((): FriendsRequestBody => ({
    id: userId,
  }), [userId])

  const { data, isLoading } = useSWR(
    [`/api/friends`, fetcherProps],
    swrCallback,
  ) as State<FriendsResponse>

  const [friends, setFriends] = useState<Maybe<FriendsMap>>(data)
  const [
    optimisticFriends,
    dispatchOptimisticFriend,
  ] = useOptimistic(friends, reducer)

  // This stuff actually sets the friends from the API
  useEffect(() => {
    setFriends(() => data)
    console.log('useFriends data, friends are set', data)
  }, [data])

  const removeFriend = useCallback(async (friend: ObshchakUser) => {
    console.log('useFriends: REMOVE FRIEND')
    dispatchOptimisticFriend({
      type: ReducerActionType.REMOVE,
      payload: friend,
    })
    const newFriends = await modifyFriends(`/api/friends/delete`, friend)
    console.log(
      'useFriends: REMOVE FRIEND - got new frienss', newFriends,
    )
    setFriends((prev) => newFriends ?? prev)
  }, [dispatchOptimisticFriend, setFriends])

  const addFriend = useCallback(() => async (friend: ObshchakUser) => {
    dispatchOptimisticFriend({
      type: ReducerActionType.ADD,
      payload: friend,
    })
    const newFriends = await modifyFriends(`/api/friends/add`, friend)
    setFriends(() => newFriends ? newFriends : friends)
  }, [dispatchOptimisticFriend, setFriends, friends])


  return {
    isLoading,
    friends,
    addFriend,
    removeFriend,
  }
}
