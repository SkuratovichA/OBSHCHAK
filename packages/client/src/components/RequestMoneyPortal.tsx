import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { Button, InputAdornment, TextField } from '@mui/material'
import { useAppContext, useWebsockets } from '@OBSHCHAK-UI/hooks'
import { COLORS, ThemeType } from '@OBSHCHAK-UI/styles'

interface RequestMoneyPortalProps {
  toggleClose: () => void
}

export const RequestMoneyPortal: React.FC<RequestMoneyPortalProps> = ({ toggleClose }) => {
  const { username } = useAppContext()
  //
  // const {
  //   requestMoney,
  // } = useWebsockets()

  const [account, setAccount] = useState<string | null>(null)
  const [amount, setAmount] = useState<number | null>(null)
  const [note, setNote] = useState<string | null>(null)

  const isRequestValid = account && amount

  // const handleSendRequest = useCallback(async () => {
  //   if (!isRequestValid) {
  //     return
  //   }
  //
  //   const requestBody = {
  //     owner: username,
  //     target: account,
  //     amount: amount,
  //     currency: 'USD', /// fuck meeee
  //     message: note,
  //   }
  //   await requestMoney(requestBody)
  //
  //   toggleClose()
  // }, [isRequestValid, username, account, amount, note, requestMoney, toggleClose])

  const handleBack = () => {
    toggleClose()
  }

  return (
    <RequestMoneyContainer>
      <TextField
        sx={{ width: '100%' }}
        label="Account"
        type="search"
        variant="outlined"
        onChange={(e) => {
          setAccount(e.target.value)
        }}
      />

      <TextField
        label="Amount"
        sx={{ m: 1, width: '100%' }}
        type={'number'}
        InputProps={{
          inputMode: 'numeric',
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        onChange={(e) => {
          setAmount(Number(e.target.value))
        }}
      />

      <TextField
        sx={{ width: '100%' }}
        label="Note"
        type="search"
        multiline
        rows={2}
        variant="outlined"
        onChange={(e) => {
          setNote(e.target.value)
        }}
      />

      <ButtonContainer>
        <Button variant="outlined" onClick={handleBack}>
          Back
        </Button>
        {/*<Button*/}
        {/*  onClick={handleSendRequest}*/}
        {/*  variant="contained"*/}
        {/*  disabled={!isRequestValid}*/}
        {/*>*/}
        {/*  Send Request*/}
        {/*</Button>*/}
      </ButtonContainer>
    </RequestMoneyContainer>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

const RequestMoneyContainer = styled.div`
  padding: 0;
  margin: 0;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  background: ${COLORS.background(ThemeType.LIGHT)};
`
