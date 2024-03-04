'use client'

import { useReducer, useCallback, useState } from 'react'
import { Button, TextField, Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import styled from '@emotion/styled'
import { CredentialsContainer } from '../components'

enum Steps {
  Username,
  Email,
  Passwords,
  Submitting,
}

interface State {
  step: Steps
  username: string
  email: string
  password: string
  repeatPassword: string
}

const initialState: State = {
  step: Steps.Username,
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
}

type Action =
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'set'; field: keyof State; value: string }

const reducer = (state: State, action: Action, router: AppRouterInstance): State => {
  switch (action.type) {
    case 'next':
      switch (state.step) {
        case Steps.Passwords: {
          // TODO add validation
          setTimeout(() => {
            router.push(`/login?email=${encodeURIComponent(state.email)}`)
          }, 1000)
          return { ...state, step: state.step + 1 }
        }
        default:
          return { ...state, step: state.step + 1 }
      }
    case 'back':
      return { ...state, step: state.step - 1 }
    case 'set':
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

const MotionComponent: React.FC<React.PropsWithChildren<{ direction: number }>> = ({
  children,
  direction,
}) => (
  <motion.div
    initial={{ x: 100 * direction, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -100 * direction, opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
)

const SignUp: React.FC = () => {
  const router = useRouter()
  const [state, dispatch] = useReducer((s: State, a: Action) => reducer(s, a, router), initialState)
  const [direction, setDirection] = useState<number>(1)

  const handleNext = useCallback(() => {
    setDirection(1)
    dispatch({ type: 'next' })
  }, [])

  const handleBack = useCallback(() => {
    setDirection(-1)
    dispatch({ type: 'back' })
  }, [])

  const handleInputChange = useCallback(
    (field: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'set', field, value: e.target.value })
    },
    [],
  )

  return (
    <CredentialsContainer>
      {state.step === Steps.Username && (
        <MotionComponent direction={direction} key={'hui1'}>
          <TextField
            fullWidth
            type="username"
            label="Username"
            variant="outlined"
            value={state.username}
            onChange={handleInputChange('username')}
          />
        </MotionComponent>
      )}

      {state.step === Steps.Email && (
        <MotionComponent direction={direction} key={'hui2'}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={state.email}
            onChange={handleInputChange('email')}
          />
        </MotionComponent>
      )}

      {state.step === Steps.Passwords && (
        <MotionComponent direction={direction} key={'hui3'}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={state.password}
              onChange={handleInputChange('password')}
            />
            <TextField
              fullWidth
              label="Repeat Password"
              variant="outlined"
              type="password"
              value={state.repeatPassword}
              onChange={handleInputChange('repeatPassword')}
            />
          </Stack>
        </MotionComponent>
      )}

      {state.step !== Steps.Submitting && (
        <Box display="flex" justifyContent="space-between" marginTop={2} width="100%" gap={4}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleBack}
            disabled={state.step === Steps.Username}
          >
            Back
          </Button>
          <Button fullWidth variant="contained" color="primary" onClick={handleNext}>
            {state.step === Steps.Passwords ? 'Submit' : 'Next'}
          </Button>
        </Box>
      )}

      {state.step === Steps.Submitting && (
        <CenterChild>
          <Typography variant="h6">Submitting...</Typography>
        </CenterChild>
      )}
    </CredentialsContainer>
  )
}

const CenterChild = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default SignUp
