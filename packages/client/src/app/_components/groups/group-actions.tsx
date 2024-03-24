import React from 'react'
import { IconButton, Skeleton } from '@mui/material'
import { match } from 'ts-pattern'
import { Delete, Launch, Logout } from '@mui/icons-material'
import type { Loadable } from 'app-common'
import { Row } from '@OBSHCHAK-UI/app/_components'


const GroupActionsSkeleton = () => {
  return (
    <>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
    </>
  )
}

type GroupActionsProps = Loadable<{
  id: string | number
  isAdmin: boolean
  handleGroupLeave: () => void
  handleGroupRedirect: () => void
}>
export const GroupActions: React.FC<GroupActionsProps> = ({
  isLoading,
  id,
  isAdmin,
  handleGroupLeave,
  handleGroupRedirect,
}) => {

  return (
    <Row
      style={{
        justifyContent: 'end',
      }}
    >
      {isLoading && <GroupActionsSkeleton />}
      {!isLoading && (
        <>
          <IconButton
            aria-label={`group-leave-action-${id}`}
            id={`group-leave-${id}`}
            onClick={handleGroupLeave}
          >{match(isAdmin)
            .with(true, () => <Delete fontSize="small" />)
            .with(false, () => <Logout fontSize="small" />)
            .exhaustive()
          }
          </IconButton>

          <IconButton>
            <Launch
              fontSize="small"
              aria-label={`group-redirect-${id}`}
              onClick={handleGroupRedirect}
            />
          </IconButton>
        </>
      )}
    </Row>
  )
}
