'use client'

import React from 'react'
import { Tilt } from 'react-tilt'
import styled from '@emotion/styled'
import { Box, Container, List, ListItem, Paper } from '@mui/material'

export const TiltedContainer: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Tilt
    style={{ width: '100%' }}
    options={{ max: 1.2, scale: 1.0, speed: 10, glare: true, 'max-glare': 0.5 }}
  >
    {children}
  </Tilt>
)

// TODO: Wtf do I have two components for ListITem?
//  Where ListItem Tiltable is used compared to ListItemContainer
export const ListItemContainer = styled(Paper)`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fefefe;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
        background-color: #fcfcfc;
    }
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
    padding: 2rem;
    padding-bottom: 0;
`

export const ScrollableBodyContainer = styled(Box)`
    flex: 1;
    overflow-y: auto;
    padding: 0;
`
