import type { Loadable } from 'app-common'
import React from 'react'
import { Skeleton, Typography } from '@mui/material'

type ContactInfoLineProps = Loadable<{
  text: string
}>
export const ContactInfoLine: React.FC<ContactInfoLineProps> = ({ text, isLoading }) => {
  if (isLoading) {
    return <Skeleton variant="text" width="10ch" height="1.5rem" />
  }

  return <Typography variant="body2">{text}</Typography>
}
