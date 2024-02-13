'use client'
import React from 'react'


interface GroupItemProps {
  group: any // FIXME: tmp solution before types are in app-common
}

export const GroupItem: React.FC<GroupItemProps> = ({group}) => {

  return <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50px',
    background: '#ebebeb'
  }}>
    hello world from the group item
  </div>
}
