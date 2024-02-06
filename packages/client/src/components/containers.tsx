import React from 'react'
import { Tilt } from 'react-tilt'
import styled from '@emotion/styled'
import { Container, List, ListItem, Paper } from '@mui/material'

export const TiltedContainer: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Tilt
    style={{ width: '100%' }}
    options={{ max: 1.2, scale: 1.0, speed: 10, glare: true, 'max-glare': 0.5 }}
  >
    {children}
  </Tilt>
)

// TODO: Wtf do I have two components for ListITem?
export const ListItemContainer = styled(Paper)`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

export const ScrollableBarlessList = styled(List)`
    overflow: auto;
    max-height: 100%;

    &::-webkit-scrollbar {
        display: none; // for Chrome, Safari, and Opera
    }

    -ms-overflow-style: none; // for IE and Edge
    scrollbar-width: none; // for Firefox
`