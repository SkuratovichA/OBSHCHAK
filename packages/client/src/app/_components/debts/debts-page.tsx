'use client'

import React, { useMemo } from 'react'
import type { FilterContextTypeBase, FilterFn } from '@OBSHCHAK-UI/app/_client-hooks'
import { useFiltering } from '@OBSHCHAK-UI/app/_client-hooks'
import {
  FilterBar,
  FullHeightNonScrollableContainer,
  DebtsList,
} from '@OBSHCHAK-UI/app/_components'
import type { Maybe, Debt } from 'app-common'
import { entries } from 'app-common'
import { DebtStatusType } from 'app-common'
import type { DebtsResponse } from '@OBSHCHAK-UI/app/api/debts/utils'

interface DebtFilters extends FilterContextTypeBase {
  search: string
  status: keyof typeof DebtStatusType | ''
}

enum FilterType {
  'Filter by' = 'Filter by',
}

const filtersToKeyMap: Record<FilterType, keyof Debt> = {
  [FilterType['Filter by']]: 'status',
}

const filterDebts: FilterFn<Maybe<DebtsResponse>, DebtFilters> = (
  debts,
  filters,
): Maybe<DebtsResponse> =>
  entries(debts).reduce((acc, [id, entry]) => {
    const matchesStatus =
      !filters.status ||
      entry.status === DebtStatusType[filters.status as keyof typeof DebtStatusType]

    const matchesSearch =
      !filters.search ||
      Object.values(entry).join('').toLowerCase().includes(filters.search.toLowerCase())

    return matchesStatus && matchesSearch ? { ...acc, [id]: entry } : acc
  }, {})

export const DebtsPageSkeleton = () => {
  return (
    <FullHeightNonScrollableContainer>
      <FilterBar
        filterOptions={[]}
        onFilterChange={() => {}}
        searchValue=""
        onSearchChange={() => {}}
      />
      <DebtsList isLoading={true} />
    </FullHeightNonScrollableContainer>
  )
}

interface DebtsPageProps {
  debts: DebtsResponse
}

export const DebtsPage: React.FC<DebtsPageProps> = ({ debts }) => {
  const result = useFiltering({
    items: debts,
    filteringFunction: filterDebts,
  })

  const { updateFilters, filteredItems: filteredDebts, filters } = result // that's weird that this isn't enough to make it defined

  const handleFilterChange = (filterName: FilterType, value: keyof Debt) => {
    updateFilters!({ [filtersToKeyMap[filterName]]: value })
  }

  const handleSearchChange = (value: string) => {
    updateFilters!({ search: value })
  }

  // TODO: come up with some grouping solution
  const filterOptions = useMemo(
    () => (filters: Partial<DebtFilters>) => [
      {
        name: FilterType['Filter by'],
        values: { None: '', Paid: 'Paid', Active: 'Active', Pending: 'Pending' },
        selectedValue: filters.status ?? '', // Use the status filter value here
      },
    ],
    [],
  )

  return (
    <FullHeightNonScrollableContainer>
      <FilterBar
        filterOptions={filterOptions(filters)}
        // TODO: maybe go with hooks to make it more type-safe. tbd in the future versions if there are any
        onFilterChange={(filterName, value) =>
          handleFilterChange(filterName as FilterType, value as keyof Debt)
        }
        searchValue={filters.search || ''}
        onSearchChange={handleSearchChange}
      />

      {/*try do it w/o !*/}
      <DebtsList itemsMap={filteredDebts!} />
    </FullHeightNonScrollableContainer>
  )
}
