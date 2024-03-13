import { useCallback, useEffect, useState } from 'react'
import type { IdMap, Maybe } from 'app-common'
import { entries } from 'app-common'
import { match, P } from 'ts-pattern'

type ReducerActionProp<T, S> = {
  type: T
  payload: S
}

export enum ReducerActionType {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  UPDATE = 'UPDATE',
}

export const reducer = <T extends Maybe<IdMap>>(
  state: T,
  action: ReducerActionProp<ReducerActionType, T>,
): T =>
  match(action)
    .with(
      { type: P.any },
      ({ payload }) =>
        payload && {
          ...state,
          ...entries(payload).reduce<T>(
            (acc, [id, user]) => ({
              ...acc,
              [id]: {
                ...user,
                pending: 'true',
              },
            }),
            {} as T,
          ),
        },
    )
    .exhaustive()

export const useSafeOptimistic = <T, S>(
  data: T,
  reducer: (state: T, action: ReducerActionProp<S, T>) => T,
) => {
  const [state, setState] = useState<T>(data)

  useEffect(() => {
    setState(() => data)
  }, [data])

  const dispatch = useCallback(
    (action: ReducerActionProp<S, T>) => {
      setState((prev) => reducer(prev, action))
    },
    [reducer],
  )
  return [state, dispatch] as const
}
