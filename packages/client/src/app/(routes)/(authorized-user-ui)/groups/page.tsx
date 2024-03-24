'use client'

import React, { useMemo } from 'react'
import { GroupListSkeleton, GroupsList } from '@OBSHCHAK-UI/app/_components'
import { useSwr } from '@OBSHCHAK-UI/app/_client-hooks'
import type { GroupsRequestBody, GroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { deserializeGroupsResponse } from '@OBSHCHAK-UI/app/api/groups/utils'
import { nextEndpointsMap } from 'app-common'

const Page: React.FC = () => {
  const { data, isLoading, isValidating, error } = useSwr<GroupsRequestBody, GroupsResponse>(
    nextEndpointsMap.GROUPS(),
    { usernames: null, groupId: null },
  )

  const groups = useMemo(() => (data ? deserializeGroupsResponse(data) : data), [data])

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (isLoading || isValidating || !groups) {
    return <GroupListSkeleton />
  }

  if (error) {
    return <div>GROUPS FETCHING ERROR</div>
  }

  return <GroupsList groups={groups} />
}
export default Page
