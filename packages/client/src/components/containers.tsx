import React from 'react'
import { Tilt } from 'react-tilt'
import styled from '@emotion/styled'
import { Paper } from '@mui/material'

export const TiltedContainer: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Tilt
    style={{ width: '100%' }}
    options={{ max: 1.2, scale: 1.0, speed: 10, glare: true, 'max-glare': 0.5 }}
  >
    {children}
  </Tilt>
)

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
