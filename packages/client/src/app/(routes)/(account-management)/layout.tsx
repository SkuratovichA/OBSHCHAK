'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { Button, Divider } from '@mui/material'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { StyledContainer } from '@OBSHCHAK-UI/app/(routes)/(account-management)/components'

const LoginDivider = styled(Divider)`
  margin: 20px 0;
  height: calc(
    4 * 56px + 20px
  ); // Adjusted for 2 text fields, 1 button, 1 forgot password link + margin
  width: 1px;
`

const LoginBlock = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const OauthContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <StyledContainer>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <LoginBlock>
          {children}

          {/*TODO: instead of divider, create OR with before and after sticks
         .or-divider:after, .or-divider:before {
              border-top: 0.1rem solid #dee2e7;
              border-top: 0.1rem solid var(--color-line);
              content: "";
              display: inline-block;
              flex-grow: 1;
          */}
          {/*
            Or instead, create a splitted page. the whole left is for adds, the right for login. Horizontal divider is used
          */}
          <LoginDivider orientation="vertical" />

          <OauthContainer>
            <Button variant="contained" color="primary" onClick={() => signIn('google')}>
              Login with Google
            </Button>
          </OauthContainer>
        </LoginBlock>
      </motion.div>
    </StyledContainer>
  )
}

export default Layout
