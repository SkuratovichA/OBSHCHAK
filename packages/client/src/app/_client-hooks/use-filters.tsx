'use client'

import { useCallback, useState } from 'react'
import { isFunction } from 'lodash'

// TODO: this should probably be eliminated in the future
//  because useFilters should be embedded into useTransactions, useGroups, etc
export type FilterContextTypeBase<X extends string | number | symbol = string, Y = any> = Record<X, Y>

interface FiltersContextType<T extends FilterContextTypeBase = FilterContextTypeBase> {
  updateFilters: (newFilters: Partial<T>) => void
  filters: T
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

export const FiltersProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [filters, setFilters] = useState<FilterContextTypeBase>({})

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
  }

  return (
    <FiltersContext.Provider value={{ filters, updateFilters }}>{children}</FiltersContext.Provider>
  )
}

export const useFilters = <T extends FilterContextTypeBase = FilterContextTypeBase>() => {
  const context = useContext(FiltersContext as Context<FiltersContextType<T> | undefined>)
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }
  return context as FiltersContextType<T>
}
