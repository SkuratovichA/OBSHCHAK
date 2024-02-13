'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AppBar, BottomNavigation } from '@mui/material'
import { AddCircleOutline, Group, Groups } from '@mui/icons-material'
import ListIcon from '@mui/icons-material/List'
import ProfileIcon from '@mui/icons-material/AccountCircle'

import { BottomNavActionHighlighted } from './bottom-nav-action-highlighted'

const linkify = (text: string): string => `/${text.toLowerCase()}`

export const BottomBar: React.FC<{}> = () => {
  const pathname = usePathname()
  const router = useRouter()

  const shouldHl = (text: string): boolean => pathname === linkify(text)
  const handleRedirect = (path: string) => {
    console.log('redirecting to', path)
    try {
      router.push(path)
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation showLabels style={{ justifyContent: 'center' }}>
        {[
          { Friends: { icon: <Group /> } },
          { Groups: { icon: <Groups /> } },
          { '': { icon: <AddCircleOutline fontSize="large" color="primary" /> } },
          { Transactions: { icon: <ListIcon /> } },
          { Account: { icon: <ProfileIcon /> } },
        ]
          .map((a) => Object.entries(a)[0])
          .map(([text, props]) => ({ ...props, label: text }))
          .map((props, idx) => (
            <BottomNavActionHighlighted
              onClick={() => handleRedirect(linkify(props.label))}
              // TODO: fucked up constants
              shouldHighlight={shouldHl(props.label)}
              highlightColor={'rgba(151,71,255,0.43)'}
              key={idx}
              icon={props.icon}
              label={props.label}
            />
          ))}
      </BottomNavigation>
    </AppBar>

  )
}
