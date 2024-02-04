import { deSpacify, Function } from 'app-common'
import {
  Box,
  FormControl, IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { Search } from '@mui/icons-material'

export type NamedCallbacks<T extends string | number | symbol = string, X = void, Y = void> = Record<
  T,
  Function<X, Y>
>
interface TogglerConfiguratorProps {
  name: string
  values: NamedCallbacks
  handler: Function<SelectChangeEvent<string>, void>
  selectedValue: string
}

const TogglerConfigurtaor: React.FC<TogglerConfiguratorProps> = ({
                                                                   name,
                                                                   values,
                                                                   handler,
                                                                   selectedValue,
                                                                 }) => (
  <FormControl key={name} variant="standard" sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id={`input-label-${deSpacify(name)}`}>{name}</InputLabel>
    <Select
      labelId={`label-${deSpacify(name)}`}
      id={`select-${deSpacify(name)}`}
      value={selectedValue}
      onChange={handler}
      label={name}
    >
      {Object.entries(values).map(([displayName, _], idx) => (
        <MenuItem key={idx} id={`${idx}-${displayName}`} value={displayName}>
          {displayName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

type FilterBarProps = {
  filters: NamedCallbacks
  groupBy: NamedCallbacks
  search: Function<string>
}
export const FilterBar: React.FC<FilterBarProps> = ({
                                                                      filters,
                                                                      groupBy,
                                                                      search,
                                                                    }) => {
  const [dateFilter, setDateFilter] = useState('')
  const [userGrouping, setUserGrouping] = useState('')
  const [searchValue, setSearchValue] = useState('')

  // Handler functions for filter and group-by and search
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setDateFilter(event.target.value as string)
    filters[event.target.value as string]?.()
  }

  const handleGroupingChange = (event: SelectChangeEvent<string>) => {
    setUserGrouping(event.target.value as string)
    groupBy[event.target.value as string]?.()
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(event.target.value)
    search(event.target.value)
  }

  // TODO: we can go generic here and have an object with the specifications but we aren't going to.
  // maybe somewhere in the future whenever we'll need it
  const configurations: TogglerConfiguratorProps[] = [
    {
      name: 'Filter by',
      values: filters,
      handler: handleFilterChange,
      selectedValue: dateFilter, // Assuming dateFilter is the state for the selected filter
    },
    {
      name: 'Group by',
      values: groupBy,
      handler: handleGroupingChange,
      selectedValue: userGrouping,
    },
  ]
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      {configurations.map((config, idx) => (
        <TogglerConfigurtaor key={idx} {...config} />
      ))}

      <TextField
        id="search-by-value"
        label="Search"
        variant="standard"
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}
