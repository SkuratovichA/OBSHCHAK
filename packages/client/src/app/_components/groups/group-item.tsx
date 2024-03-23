'use client'
import React, { useCallback } from 'react'
import type { Group, Pendable } from 'app-common'
import { CurrencyType, getDebtsAmount } from 'app-common'
import type { DropdownMenuProps } from '@OBSHCHAK-UI/app/_components/dropdown-menu'
import { Avatar, AvatarGroup, Container, IconButton, Modal, Typography } from '@mui/material'
import { ListItemContainerPointless, TiltedContainer } from '@OBSHCHAK-UI/app/_components'
import styled from '@emotion/styled'
import { DebtAmount } from '@OBSHCHAK-UI/app/_components/debts/debt-amount'
import { Delete, Launch, Logout } from '@mui/icons-material'
import { match } from 'ts-pattern'
import { useRouter } from 'next/navigation'

const Row = styled(Container)`
    padding: 0 !important;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`

const Column = styled(Container)`
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    height: 100%;
    width: 100%;
`

type GroupItemProps = Pendable<{
  group: Group
  actions: DropdownMenuProps['namedCallbacks']
}>
export const GroupItem: React.FC<GroupItemProps> = ({ group, pending }) => {
  const defaultAccountCurrency = CurrencyType.USD // TODO: useAccountCurrency()
  const [isLeaveGroupModalOpen, setIsLeaveGroupModalOpen] = React.useState(false)

  const router = useRouter()

  const toggleLeaveGroupModal = useCallback(() => {
    setIsLeaveGroupModalOpen(s => !s)
  }, [])

  const handleGroupLeave = useCallback(() => {
    toggleLeaveGroupModal()
  }, [toggleLeaveGroupModal])


  const handleGroupRedirect = useCallback(() => {
    // do next js redirect via router
    router.push(`/groups/${group.id}`)
  }, [group.id, router])


  return (
    <>
      <TiltedContainer>
        <ListItemContainerPointless>

          <Column sx={{ gap: '20px' }}>
            <Row>
              <div>
                <Typography variant={'h6'}>
                  {group.name}
                </Typography>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                }}>
                  <Typography variant={'caption'}>
                    {group.description}
                  </Typography>

                  <Typography variant={'caption'} color={'rgba(47,47,47,0.5)'}>
                    {group.creationDate.toDateString()}
                  </Typography>
                </div>
              </div>

              <DebtAmount
                amount={getDebtsAmount(group.debts, defaultAccountCurrency)}
                currency={defaultAccountCurrency}
              />
            </Row>

            <Row>
              <AvatarGroup max={3} sx={{ justifyContent: 'start', height: '40px' }}>
                {group.members.map((member, key) => (
                  <Avatar
                    key={key}
                    alt={member.username}
                    src={member.profileImage}
                  />
                ))}
              </AvatarGroup>

              <div>
                <IconButton
                  aria-label={`group-leave-action-${group.id}`}
                  id={`group-leave-${group.id}`}
                  onClick={handleGroupLeave}
                >{match(group.isAdmin)
                  .with(true, () => <Delete fontSize="small" />)
                  .with(false, () => <Logout fontSize="small" />)
                  .exhaustive()
                }
                </IconButton>

                <IconButton>
                  <Launch
                    fontSize="small"
                    aria-label={`group-redirect-${group.id}`}
                    onClick={handleGroupRedirect}
                  />
                </IconButton>
              </div>

            </Row>
          </Column>
        </ListItemContainerPointless>
      </TiltedContainer>

      <>{isLeaveGroupModalOpen && (
        <Modal
          open={isLeaveGroupModalOpen}
          onClose={toggleLeaveGroupModal}
          aria-labelledby="leave-group-modal-title"
          aria-describedby="leave-group-modal-description"
        >
          <div>
            Leaving group modal
            {/*<Typography variant='h6' id='leave-group-modal-title'>*/}
            {/*  Leave group*/}
            {/*</Typography>*/}
            {/*<Typography variant='body1' id='leave-group-modal-description'>*/}
            {/*  Are you sure you want to leave the group?*/}
            {/*</Typography>*/}
            {/*<IconButton*/}
            {/*  aria-label='leave-group'*/}
            {/*  id='leave-group'*/}
            {/*  onClick={handleGroupLeave}*/}
            {/*>*/}
            {/*  <Logout />*/}
            {/*</IconButton>*/}
          </div>
        </Modal>
      )
      }</>
    </>
  )
}
