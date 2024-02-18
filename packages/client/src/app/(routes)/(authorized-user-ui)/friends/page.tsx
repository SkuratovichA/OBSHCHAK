'use client'

import React from 'react'
import { usersMock } from 'app-common'
import { FiltersProvider } from '@OBSHCHAK-UI/app/_client-hooks'
import { FriendsList } from '@OBSHCHAK-UI/app/_components'

const Page: React.FC = () => {
  // TODO: we need to have another layer of abstraction (xD) here and
  //  fetch the data first based on the username
  //  and then pass the friends to the component.
  //  component should be suspended while fetching the data btw.
  return (
    <FiltersProvider>
      <FriendsList friends={usersMock} />
    </FiltersProvider>
  )
}
export default Page
