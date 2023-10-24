'use client'

import React from 'react'
import styled from '@emotion/styled'

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <TWAContainer>{children}</TWAContainer>
}

const TWAContainer = styled.div`
  width: 386px;
  margin: auto;
  padding: 12px;
  height: 100vh;

  > * {
    margin-bottom: 20px;
  }
`
