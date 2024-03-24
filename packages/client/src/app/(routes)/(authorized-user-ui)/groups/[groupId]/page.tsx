'use client'

import React from 'react'
import { nextEndpointsMap } from 'app-common'
import { useSwr } from '@OBSHCHAK-UI/app/_client-hooks'
import type { GroupsRequestBody, GroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { deserializeGroup } from '@OBSHCHAK-UI/app/api/groups/utils'
import {
  GroupView,
  GroupViewSkeleton,
  ScrollableBarlessList,
} from '@OBSHCHAK-UI/app/_components'
import { match, P } from 'ts-pattern'

type PageProps = {
  params: {
    groupId: string
  }
}
const Page: React.FC<PageProps> = ({ params: { groupId } }) => {

  const { data: groups, isLoading } = useSwr<GroupsRequestBody, GroupsResponse>(
    nextEndpointsMap.GROUPS(),
    { groupId, usernames: [] },
  )

  return (
    <ScrollableBarlessList>
      {match([isLoading, groups])
        .returnType<React.ReactNode>()
        .with([false, P.select('groups', P.not(P.nullish))], ({ groups }) =>
          <GroupView group={
            deserializeGroup(groups[groupId])
          } />,
        )
        .otherwise(() =>
          <GroupViewSkeleton />,
        )
      }
    </ScrollableBarlessList>
  )
}

export default Page
