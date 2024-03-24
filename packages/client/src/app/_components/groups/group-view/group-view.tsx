import type { Group} from 'app-common'
import { nextEndpointsMap } from 'app-common'
import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSwr } from '@OBSHCHAK-UI/app/_client-hooks'
import type { DebtsResponse, DebtsSearchParams } from '@OBSHCHAK-UI/app/api/debts/utils'
import { Edit } from '@mui/icons-material'
import { Avatar, Column, DebtsPage, DebtsPageSkeleton, DescriptionField, NameField } from '@OBSHCHAK-UI/app/_components'
import { centered } from '@OBSHCHAK-UI/app/_components/atoms/mixins'
import { grey } from '@mui/material/colors'
import { UserAvatarsRow } from '@OBSHCHAK-UI/app/_components/groups/user-avatar-row'
import { match, P } from 'ts-pattern'
import styled from '@emotion/styled'
import { IconButton } from '@mui/material'

type GroupViewProps = {
  group: Group
}
export const GroupView: React.FC<GroupViewProps> = ({ group }) => {
  const router = useRouter()

  const handleEdit = useCallback(() => {
    router.push(`/groups/${group.id}/edit`)
  }, [group.id, router])

  const { data: debts, isLoading } = useSwr<DebtsSearchParams, DebtsResponse>(
    nextEndpointsMap.DEBTS(),
    {
      groups: [group.id],
      usernames: [],
    },
  )

  return <>
    {/*// TODO: make header sticky, only scroll the debts*/}
    <EditButtonContainer onClick={handleEdit}>
      <Edit />
    </EditButtonContainer>
    <Column>
      <Column
        style={{
          ...centered,
          gap: '20px',
        }}
      >
        <Column>
          <Avatar
            width={150}
            height={150}
            src={group.iconUrl}
            alt={group.name}
          />

          <NameField name={group.name} />
          <DescriptionField description={group.description} />
          <DescriptionField description={group.creationDate.toLocaleDateString()} color={grey[500]} />
        </Column>
        <UserAvatarsRow max={6} users={group.members} />
      </Column>

      <Column>
        {match([isLoading, debts])
          .returnType<React.ReactNode>()
          .with([P._, P.select('debts', P.not(P.nullish))], ({ debts }) =>
            <DebtsPage debts={debts} />,
          )
          .otherwise(() =>
            <DebtsPageSkeleton />,
          )
        }
      </Column>

    </Column>
  </>
}

const EditButtonContainer = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`
