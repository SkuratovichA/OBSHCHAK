import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React from 'react'
import { Search } from '@mui/icons-material'

import { deSpacify } from 'app-common'
import type { Function, Undefined } from 'app-common'
import styled from '@emotion/styled'

interface FilterSelectorProps {
  name: string
  values: Record<string, string>
  selectedValue: string
  onFilterChange: (name: string, value: string) => void
}
const FilterSelector: React.FC<FilterSelectorProps> = ({
  name,
  values,
  selectedValue,
  onFilterChange,
}) => {
  const deSpacifiedName = deSpacify(name)

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={`input-label-${deSpacifiedName}`}>{name}</InputLabel>
      <Select
        labelId={`label-${deSpacifiedName}`}
        id={`select-${deSpacifiedName}`}
        value={selectedValue}
        onChange={(event: SelectChangeEvent) => onFilterChange(name, event.target.value)}
        label={deSpacifiedName}
      >
        {Object.entries(values).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export interface FilterOption<V extends Record<string, string> = Record<string, string>> {
  name: string
  values: V
  selectedValue: string
}

interface SearchFilters {
  searchValue: string
  onSearchChange: Function<string>
}

interface FilterOptions {
  filterOptions: FilterOption[]
  // TODO: use something like Function<<string, string>, void>
  onFilterChange: (filterName: string, value: string) => void
}

type FilterBarProps = (SearchFilters & Undefined<FilterOptions>) | (SearchFilters & FilterOptions)

export const FilterBar: React.FC<FilterBarProps> = ({
  filterOptions,
  onFilterChange,
  searchValue,
  onSearchChange,
}) => {
  return (
    <FilterBarBox
      sx={{
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: 0,
      }}
      display="flex"
      justifyContent="end"
      alignItems="center"
      width={'100%'}
    >
      {filterOptions?.map(({ name, values, selectedValue }) => (
        <FilterSelector
          key={name}
          name={name}
          values={values}
          selectedValue={selectedValue}
          onFilterChange={onFilterChange}
        />
      ))}
      <TextField
        id="search-by-value"
        label="Search"
        variant="standard"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => onSearchChange(searchValue)}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FilterBarBox>
  )
}

const FilterBarBox = styled(Box)`
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0;
`

export default FilterBar
