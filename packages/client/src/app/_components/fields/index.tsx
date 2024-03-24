import React from 'react'
import type { TypographyProps } from '@mui/material'
import { Skeleton, Typography } from '@mui/material'
import type { Loadable } from 'app-common'

// TODO: refactor

const NameFieldSkeleton: React.FC = () => <Skeleton variant="text" width="20ch" height="3rem" />

type NameFieldProps = Loadable<
  {
    name: string
  } & TypographyProps
>
export const NameField: React.FC<NameFieldProps> = ({ isLoading, name, ...props }) =>
  isLoading ? (
    <NameFieldSkeleton />
  ) : (
    <Typography variant="h4" {...props}>
      {name}
    </Typography>
  )

const DescriptionFieldSkeleton: React.FC = () => (
  <Skeleton variant="text" width="20ch" height="3rem" />
)

type DescriptionFieldProps = Loadable<
  {
    description: string
  } & TypographyProps
>

export const DescriptionField: React.FC<DescriptionFieldProps> = ({
  isLoading,
  description,
  ...props
}) =>
  isLoading ? (
    <DescriptionFieldSkeleton />
  ) : (
    <Typography variant="caption" {...props}>
      {description}
    </Typography>
  )
