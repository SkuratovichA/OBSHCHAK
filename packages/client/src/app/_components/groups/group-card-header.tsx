import styled from '@emotion/styled'
import type { Loadable } from 'app-common'
import React from 'react'
import { Skeleton, Typography } from '@mui/material'

const GroupCardHeaderSkeleton = () => {
  return (
    <>
      <Typography variant={'h6'}>
        <Skeleton variant={'text'} width={'15ch'} />
      </Typography>

      <GroupCardHeaderDescriptionContainer>
        <Typography variant={'caption'}>
          <Skeleton variant={'text'} width={'30ch'} />
        </Typography>

        <Typography variant={'caption'} color={'rgba(47,47,47,0.5)'}>
          <Skeleton variant={'text'} width={'15ch'} />
        </Typography>
      </GroupCardHeaderDescriptionContainer>
    </>
  )
}


type GroupCardHeaderProps = Loadable<{
  name: string
  description: string
  creationDate: Date
}>
export const GroupCardHeader: React.FC<GroupCardHeaderProps> = ({ isLoading, name, description, creationDate }) => {

  return (
    <div>
      {isLoading
        ? <GroupCardHeaderSkeleton />
        : <>
          <Typography variant={'h6'}>
            {name}
          </Typography>

          <GroupCardHeaderDescriptionContainer>
            <Typography variant={'caption'}>
              {description}
            </Typography>

            <Typography variant={'caption'} color={'rgba(47,47,47,0.5)'}>
              {creationDate.toLocaleDateString()}
            </Typography>
          </GroupCardHeaderDescriptionContainer>
        </>
      }
    </div>
  )
}

const GroupCardHeaderDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
`
