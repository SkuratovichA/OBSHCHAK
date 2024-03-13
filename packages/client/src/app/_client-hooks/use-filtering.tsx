import { useEffect, useState } from 'react'

import type { FilterContextTypeBase } from '@OBSHCHAK-UI/app/_client-hooks/use-filters'
import { useFilters } from '@OBSHCHAK-UI/app/_client-hooks/use-filters'

export type FilterFn<S, T extends FilterContextTypeBase = FilterContextTypeBase> = (
  items: S,
  filters: Partial<T>,
) => S

type UseFiltering = <S, >({
   items,
  filteringFunction,
}: {
  items: S
  filteringFunction: FilterFn<S>
}) => ReturnType<typeof useFilters> & {
  filteredItems: S
}

export const useFiltering: UseFiltering = ({ items, filteringFunction }) => {
  const { filters, updateFilters } = useFilters()
  const [filteredItems, setFilteredItems] = useState(items)

  useEffect(() => {
    const filtered = filteringFunction(items, filters)
    setFilteredItems(filtered)
  }, [filteringFunction, filters, items])

  return {
    filteredItems,
    updateFilters,
    filters,
  }
}
