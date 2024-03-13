import React from 'react'
import { Box, Typography } from '@mui/material'
import type { Loadable, Debt } from 'app-common'
import { DebtStatusType } from 'app-common'

interface DebtViewProps {
  item: Debt
  modalId: string
  modalDescriptionId: string
}

export const DebtView: React.FC<Loadable<DebtViewProps>> = ({
  item,
  isLoading,
  modalId,
  modalDescriptionId,
}) => {
  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <>
      <Typography id={modalId} variant="h6" component="h2">
        {item.name}
      </Typography>

      <Typography id={modalDescriptionId} variant="h6" component="h4">
        {item.description}
      </Typography>

      <Typography>From: {item.from}</Typography>

      <Box>
        <Typography>To:</Typography>
        <ul>
          {item.to.map((to, idx) => (
            <li key={idx}>{to.username}</li>
          ))}
        </ul>
      </Box>

      <Typography>
        Amount: {item.amount} {item.currency}
      </Typography>
      <Typography>Status: {DebtStatusType[item.status]}</Typography>
    </>
  )
}
