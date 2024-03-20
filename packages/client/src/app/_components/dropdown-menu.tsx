import type { Maybe } from 'app-common'
import React, { useCallback } from 'react'
import { Menu, MenuItem } from '@mui/material'

interface NamedCallback {
  name: string
  callback: () => Promise<void>
}

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  anchorEl: Maybe<HTMLElement>
  namedCallbacks: Record<string, NamedCallback>
  onClose: () => void
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  namedCallbacks,
  anchorEl,
  onClose,
  ...props
}) => {
  const open = Boolean(anchorEl)

  const handleMenuAction = useCallback(
    async (action: string, callback: NamedCallback['callback']) => {
      try {
        await callback()
      } catch (e: unknown) {
        console.error(`DROPDOWN MENU: failed to perform action ${action}`, e)
      }
      onClose()
    },
    [onClose],
  )

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      {...props}
    >
      {Object.entries(namedCallbacks).map(([actionName, { name: displayName, callback }]) => (
        <MenuItem key={actionName} onClick={() => handleMenuAction(actionName, callback)}>
          {displayName}
        </MenuItem>
      ))}
    </Menu>
  )
}
