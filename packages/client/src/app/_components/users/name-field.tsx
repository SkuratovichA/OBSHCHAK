import React from 'react'
import type { Loadable } from 'app-common'
import { Skeleton, Typography } from '@mui/material'


const NameFieldSkeleton: React.FC = () => <Skeleton variant="text" width="20ch" height="3rem" />

export const NameField: React.FC<Loadable<{ name: string }>> = ({ isLoading, name }) =>
  isLoading ? (
    <NameFieldSkeleton />
  ) : (
    <Typography variant="h4">{name}</Typography>
  )
