import React from 'react'

import { FriendPage } from '@OBSHCHAK-UI/app/_components'

interface PageProps {
  params: {
    username: string
  }
}

const Page: React.FC<PageProps> = ({ params: { username } }) => {
  return (
    <FriendPage username={username} />
  )
}

export default Page
