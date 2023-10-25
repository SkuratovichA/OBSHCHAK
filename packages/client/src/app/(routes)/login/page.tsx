'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button, Container, TextField, Divider, Link } from '@mui/material'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

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

const EmailPasswordContainer = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const OauthContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    // Implement login logic here using email and password
  }

  return (
    <StyledContainer>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <LoginBlock>
          <EmailPasswordContainer>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
            <a style={{ textAlign: 'center' }}>
              <Link href="/forgot-password">Forgot Password?</Link>
            </a>
            <a>
              {"Don't have an account? "}
              <Link href="/register">{'Register here'}</Link>
            </a>
          </EmailPasswordContainer>

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

export default LoginPage
