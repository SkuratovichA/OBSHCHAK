import React from 'react'
import { Tilt } from 'react-tilt'
import styled from '@emotion/styled'
import { Box, Container, css, List, ListItem, Paper } from '@mui/material'
import type { Pendable } from 'app-common'

export const TiltedContainer: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Tilt
    style={{ width: '100%' }}
    options={{ max: 1.2, scale: 1.0, speed: 10, glare: true, 'max-glare': 0.5 }}
  >
    {children}
  </Tilt>
)

const listItemContainerBase = css`
    width: 100%;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fefefe;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #fcfcfc;
    }
`

// TODO: Wtf do I have two components for ListITem?
//  Where ListItem Tiltable is used compared to ListItemContainer
export const ListItemContainer = styled(Paper)`
    ${listItemContainerBase};
    cursor: pointer;
`


export const ListItemContainerPointless = styled(Paper)<Pendable>`
    ${listItemContainerBase};
    cursor: default;
    
    ${({ pending }) => pending && css`
        opacity: 0.5;
        pointer-events: none;
    `}
`

export const ListItemTiltable = styled(ListItem)`
    border-radius: 8px;
    margin-bottom: 8px;
    height: 100px;
    perspective: 10000;
`

export const FullHeightNonScrollableContainer = styled(Container)`
    height: 100%;
`

export const ScrollableBarlessList = styled(List)<{ maxHeight?: string }>`
    overflow: scroll;
    max-height: ${({ maxHeight }) => maxHeight ?? '100%'};

    &::-webkit-scrollbar {
        display: none; // for Chrome, Safari, and Opera
    }

    -ms-overflow-style: none; // for IE and Edge
    scrollbar-width: none; // for Firefox
`

export const CenteredBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

export const FullHeightStackContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    padding: 2rem 2rem 0;
`

export const ScrollableBodyContainer = styled(Box)`
    flex: 1;
    overflow-y: auto;
    padding: 0;
`
