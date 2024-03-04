'use client'

import { useCallback, useState } from 'react'
import { isFunction } from 'lodash'

// TODO: this should probably be eliminated in the future
//  because useFilters should be embedded into useTransactions, useGroups, etc.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilterContextTypeBase<X extends string | number = string, Y extends any = any> = Record<X, Y>

/**
 * Partial<T> is used to make all properties optional, because there could be
 */
export const useFilters = <T extends FilterContextTypeBase>() => {
  const [filters, setFilters] = useState<Partial<T>>({})
  const updateFilters = useCallback((update: Partial<T> | ((oldFilters: Partial<T>) => Partial<T>)) => {
    setFilters((oldFilters) => isFunction(update) ? update(oldFilters) : { ...oldFilters, ...update })
  }, [])

  return { filters, updateFilters }
}
