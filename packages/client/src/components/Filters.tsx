import React from 'react'
import styled from '@emotion/styled'
import { FilterTypes } from '../common'
import { COLORS, ThemeType } from '../styles'
import { css } from '@emotion/react'
import { useTheme } from '../hooks/use-theme'

interface FiltersProps {
  activeFilters: FilterTypes[];
  setActiveFilters: React.Dispatch<React.SetStateAction<FilterTypes[]>>;
}

interface FilterButtonProps {
  isActive: boolean;
  theme: ThemeType
}


export const Filters: React.FC<FiltersProps> = ({ activeFilters, setActiveFilters }) => {
  const handleFilterClick = (filter: FilterTypes) => {
    setActiveFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((f) => f !== filter)
      }
      return [ ...prev, filter ]
    })
  }

  const {theme} = useTheme()

  return (
    <FiltersContainer
      theme={theme}
    >
      {Object.values(FilterTypes).map((filter) => (
        <FilterButton
          key={filter}
          isActive={activeFilters.includes(filter)}
          onClick={() => handleFilterClick(filter)}
          theme={theme}
        >
          {filter}
        </FilterButton>
      ))}

    </FiltersContainer>
  )
}

const FiltersContainer = styled.div<{theme: ThemeType}>`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px; // to give space between buttons
  padding: 8px;
  border-radius: 10px;
  
  ${({theme}) => css`
    background: ${COLORS.text(theme).primary}; 
  `}
`

const FilterButton = styled.button<FilterButtonProps>`
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid transparent;

  ${({ theme, isActive }) => isActive ? css`
    border: 1px solid ${COLORS.text(theme).secondary};
    color: ${COLORS.text(theme).secondary};
    background: ${COLORS.text(theme).primary};
  ` : css`     
    color: ${COLORS.text(theme).primary};
    background: ${COLORS.text(theme).secondary};
  `}
  cursor: pointer;
`
