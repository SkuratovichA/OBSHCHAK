import type { Maybe, Debt, WithId } from 'app-common'
import { nextEndpointsMap } from 'app-common'
import { arrayToIdMap } from 'app-common'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSwr } from '@OBSHCHAK-UI/app/_client-hooks/use-suspense-swr'
import {
  reducer,
  ReducerActionType,
  useSafeOptimistic,
} from '@OBSHCHAK-UI/app/_client-hooks/use-safe-optimistic'
import type { DebtsResponse, DebtsSearchParams } from '@OBSHCHAK-UI/app/api/debts/utils'
import { isDebtsResponse } from '@OBSHCHAK-UI/app/api/debts/utils'

type UseDebtsResult = {
  debts: Maybe<DebtsResponse>
  createDebt: (debt: Debt) => void
  updateDebt: (debt: WithId<Partial<Debt>>) => void
  deleteDebt: (debt: Debt) => void
  error?: boolean
}

// add ts-pattern to match the shit. Update accepts a partial debt
const modifyDebts = async (
  endpoint: string,
  body: Partial<Debt>,
): Promise<Maybe<DebtsResponse>> => {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const jsonResponse = await res.json()
    if (!isDebtsResponse(jsonResponse)) {
      throw new Error(`Invalid friends response ${JSON.stringify(jsonResponse)}`)
    }
    return jsonResponse
  } catch (e: unknown) {
    console.error('Error modifying debts', e)
    return null
  }
}

// filter by user id (debts for a friend)
// filter by a group id (debts for a group)
type UseDebtsProps = {
  usernames?: string[]
  groups?: string[]
}

type UseDebts = (props?: UseDebtsProps) => UseDebtsResult

// TODO: KAN-37 move debts fetching outside the hook.
export const useDebts: UseDebts = (props) => {
  const { usernames, groups } = useMemo(() => props ?? {}, [props])

  // TODO: when using not mocks, somehow add the username of an authenticated user. But probably on the NEXT server side. Idk
  const debtsFetchBody: DebtsSearchParams = {
    usernames: usernames ?? [],
    groups: groups ?? [],
  } as DebtsSearchParams

  const { data, error } = useSwr<DebtsSearchParams, DebtsResponse>(
    nextEndpointsMap.DEBTS(),
    debtsFetchBody,
  )
  const [debts, setDebts] = useState<Maybe<DebtsResponse>>(data)
  const [optimisticDebts, dispatchOptimisticDebts] = useSafeOptimistic<
    UseDebtsResult['debts'],
    ReducerActionType
  >(debts, reducer)

  useEffect(() => {
    setDebts(data)
  }, [data])

  const createDebt = useCallback(
    async (debt: Parameters<UseDebtsResult['createDebt']>[0]) => {
      console.log('Create debt', debt)
      dispatchOptimisticDebts({
        type: ReducerActionType.ADD,
        payload: arrayToIdMap([debt]),
      })

      const newDebt = await modifyDebts(nextEndpointsMap.CREATE_DEBT(), debt)
      setDebts((prev) => newDebt ?? prev)
    },
    [dispatchOptimisticDebts],
  )

  const updateDebt = useCallback(
    async (debt: Parameters<UseDebtsResult['updateDebt']>[0]) => {
      console.log('Update debt', debt)
      dispatchOptimisticDebts({
        type: ReducerActionType.UPDATE,
        payload: arrayToIdMap([debt as Debt]),
      })

      const newDebts = await modifyDebts(nextEndpointsMap.UPDATE_DEBT(), debt)
      setDebts((prev) => newDebts ?? prev)
    },
    [dispatchOptimisticDebts],
  )

  const deleteDebt = useCallback(
    async (debt: Parameters<UseDebtsResult['deleteDebt']>[0]) => {
      console.log('Delete debt', debt.id)
      dispatchOptimisticDebts({
        type: ReducerActionType.REMOVE,
        payload: arrayToIdMap([debt]),
      })

      const newDebts = await modifyDebts(nextEndpointsMap.UPDATE_DEBT(), debt)
      setDebts((prev) => newDebts ?? prev)
    },
    [dispatchOptimisticDebts],
  )

  return {
    debts: optimisticDebts,
    createDebt,
    updateDebt,
    deleteDebt,
  }
}
