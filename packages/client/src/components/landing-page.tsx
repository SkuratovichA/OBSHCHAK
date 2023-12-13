'use client'
import React from 'react'
import { Button, Typography, Container } from '@mui/material'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import Link from 'next/link'

export const LandingPage: React.FC = () => {
  return (
    <StyledContainer>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Debt Splitter
        </Typography>
        <Typography variant="body1" gutterBottom>
          The best app for managing and splitting your expenses.
        </Typography>
        <Button variant="contained" color="primary">
          <Link href="/login">Log In</Link>
        </Button>
      </motion.div>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
