'use client'

import styled from '@emotion/styled'
import { Button, TextField, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'

import { CredentialsContainer } from '../components'

const Link = styled(NextLink)`
  color: #1976d2;
  text-decoration: underline;
`

const Layout: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const email = searchParams.get('email')
    console.log(email)
    if (email) {
      setEmail(email)
    }
  }, [searchParams])

  const handleLogin = useCallback(() => {}, [])

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <CredentialsContainer>
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
        <Typography>
          {"Don't have an account? "}
          <Link href="/register">{'Register here'}</Link>
        </Typography>
        <Typography textAlign="center">
          <Link href="/forgot-password">Forgot Password?</Link>
        </Typography>
      </CredentialsContainer>
    </motion.div>
  )
}

export default Layout
