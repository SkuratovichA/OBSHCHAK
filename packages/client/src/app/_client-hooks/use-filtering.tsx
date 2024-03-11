import { useEffect, useState } from 'react'
import isNil from 'lodash/isNil'

import type { Loadable } from 'app-common'
import type { FilterContextTypeBase } from '@OBSHCHAK-UI/app/_client-hooks/use-filters'
import { useFilters } from '@OBSHCHAK-UI/app/_client-hooks/use-filters'


export type FilterFn<S, T extends FilterContextTypeBase = FilterContextTypeBase> = (items: S, filters: Partial<T>) => S

type UseFiltering = <S, >({ items, filteringFunction }: {
  items: S
  filteringFunction: FilterFn<S>
}) => Loadable<ReturnType<typeof useFilters> & {
  filteredItems: S
}>

export const useFiltering: UseFiltering = ({ items, filteringFunction }) => {
  const { filters, updateFilters } = useFilters()
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    const filtered = filteringFunction(items, filters)
    setFilteredItems(filtered)
  }, [filteringFunction, filters, items])


  if (isNil(filteredItems)) {
    return { isLoading: true }
  }

  return {
    filteredItems,
    updateFilters,
    filters,
  }
}
