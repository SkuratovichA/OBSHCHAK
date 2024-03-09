import type { Loadable, WithSize } from 'app-common'
import React from 'react'
import { Skeleton } from '@mui/material'
import styled from '@emotion/styled'

export enum DotDividerSizeType {
  small = '5px',
  medium = '10px',
  large = '15px',
}


const DEFAULT_SIZE: DotDividerSizeType = DotDividerSizeType.small

export type DotDividerProps = Loadable<WithSize<DotDividerSizeType>>


export const DotDivider: React.FC<DotDividerProps> = ({size: nullableSize, isLoading}) => {

  const size = nullableSize ?? DEFAULT_SIZE

  return isLoading ? (
    <Skeleton variant="circular" width={size} height={size} />
  ) : (
    <DotDividerStyled size={size} />
  )
}

const DotDividerStyled = styled.div<Required<WithSize<DotDividerSizeType>>>`
  width: ${({size}) => size};
  height: ${({size}) => size};
  
  background-color: currentColor;
  border-radius: 50%;
  pointer-events: none;
`
