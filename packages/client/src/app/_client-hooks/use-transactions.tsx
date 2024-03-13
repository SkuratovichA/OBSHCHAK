import type { Maybe, ObshchakUser, Transaction, WithId } from 'app-common'
import { arrayToIdMap } from 'app-common'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  TransactionsSearchParams,
  TransactionsResponse,
  isTransactionsResponse,
} from '@OBSHCHAK-UI/app/api/transactions/route'
import { useSwr } from '@OBSHCHAK-UI/app/_client-hooks/use-suspense-swr'
import { nextEndpointsMap } from 'app-common/lib/endpoints'
import { reducer, ReducerActionType, useSafeOptimistic } from '@OBSHCHAK-UI/app/_client-hooks/use-safe-optimistic'


type UseTransactionsResult = {
  transactions: Maybe<TransactionsResponse>
  createTransaction: (transaction: Transaction) => void
  updateTransaction: (transaction: WithId<Partial<Transaction>>) => void
  deleteTransaction: (transaction: Transaction) => void
  error?: boolean
}

// match the shit so only UPDATE accepts a partial transaction
const modifyTransactions = async (endpoint: string, body: Partial<Transaction>): Promise<Maybe<TransactionsResponse>> => {
  try {
    const res = await fetch(
      endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      },
    )
    const jsonResponse = await res.json()
    if (!isTransactionsResponse(jsonResponse)) {
      throw new Error(`Invalid friends response ${JSON.stringify(jsonResponse)}`)
    }
    return jsonResponse
  } catch (e: unknown) {
    console.error('Error modifying transactions', e)
    return null
  }
}


// filter by user id (transactions for a friend)
// filter by a group id (transactions for a group)
type UseTransactionsProps = {
  usernames?: string[],
  groups?: string[]
}

type UseTransactions = (props?: UseTransactionsProps) => UseTransactionsResult

export const useTransactions: UseTransactions = (props) => {

  const { usernames, groups} = useMemo(() => props ?? {}, [props])

  // TODO: when using not mocks, somehow add the username of an authenticated user. But probably on the NEXT server side. Idk
  const transactionsFetchBody: TransactionsSearchParams = {
    usernames: usernames ?? [],
    groups: groups ?? [],
  } as TransactionsSearchParams

  const { data, error } = useSwr<TransactionsSearchParams, TransactionsResponse>(
    nextEndpointsMap.TRANSACTIONS(), transactionsFetchBody
  )
  const [transactions, setTransactions] = useState<Maybe<TransactionsResponse>>(data)
  const [optimisticTransactions, dispatchOptimisticTransactions] = useSafeOptimistic<UseTransactionsResult['transactions'], ReducerActionType>(
    transactions,
    reducer,
  )

  useEffect(() => {
    setTransactions(data)
  }, [data])

  const createTransaction = useCallback( async (transaction: Parameters<UseTransactionsResult['createTransaction']>[0]) => {
    console.log('Create transaction', transaction)
    dispatchOptimisticTransactions({
      type: ReducerActionType.ADD,
      payload: arrayToIdMap([transaction])
    })

    const newTransactions = await modifyTransactions(nextEndpointsMap.ADD_TRANSACTION(), transaction)
    setTransactions(
      (prev) => newTransactions ?? prev
    )
  }, [dispatchOptimisticTransactions])

  const updateTransaction = useCallback(async (transaction: Parameters<UseTransactionsResult['updateTransaction']>[0]) => {
    console.log('Update transaction', transaction)
    dispatchOptimisticTransactions({
      type: ReducerActionType.UPDATE,
      payload: arrayToIdMap([transaction as Transaction])
    })

    const newTransactions = await modifyTransactions(nextEndpointsMap.UPDATE_TRANSACTION(), transaction)
    setTransactions(
      (prev) => newTransactions ?? prev
    )
  }, [dispatchOptimisticTransactions])

  const deleteTransaction = useCallback(async (transaction: Parameters<UseTransactionsResult['deleteTransaction']>[0]) => {
    console.log('Delete transaction', transaction.id)
    dispatchOptimisticTransactions({
      type: ReducerActionType.REMOVE,
      payload: arrayToIdMap([transaction])
    })

    const newTransactions = await modifyTransactions(nextEndpointsMap.UPDATE_TRANSACTION(), transaction)
    setTransactions(
      (prev) => newTransactions ?? prev
    )
  }, [dispatchOptimisticTransactions])

  return {
    transactions: optimisticTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  }
}
