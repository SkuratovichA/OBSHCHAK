'use client'

import styled from '@emotion/styled'
import { BottomNavigationAction, css } from '@mui/material'

export const BottomNavActionHighlighted = styled(BottomNavigationAction, {
  shouldForwardProp: (prop) => !['shouldHighlight', 'highlightColor'].includes(prop),
})<{
  shouldHighlight?: boolean
  highlightColor?: string
}>(({ shouldHighlight, highlightColor}) => shouldHighlight
    ? css`
        background: ${highlightColor};
        border-radius: 8px;
      `
    : css``)
