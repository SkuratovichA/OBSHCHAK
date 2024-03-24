'use client'
import React, { useCallback, useMemo } from 'react'
import type { Group, Loadable, Pendable } from 'app-common'
import { CurrencyType, getDebtsAmount } from 'app-common'
import {
  Column,
  ConfirmationModal,
  ListItemContainer,
  Row,
  TiltedContainer,
} from '@OBSHCHAK-UI/app/_components'
import { DebtAmount } from '@OBSHCHAK-UI/app/_components/debts/debt-amount'
import { useRouter } from 'next/navigation'
import { GroupCardHeader } from '@OBSHCHAK-UI/app/_components/groups/group-card-header'
import { UserAvatarsRow } from '@OBSHCHAK-UI/app/_components/groups/user-avatar-row'
import { GroupActions } from '@OBSHCHAK-UI/app/_components/groups/group-actions'
import { match, P } from 'ts-pattern'

type GroupItemProps = Pendable<{
  group: Group
  leaveGroup: () => void
}>
export const GroupItemBase: React.FC<GroupItemProps> = ({ group }) => {
  const defaultAccountCurrency = CurrencyType.USD // TODO: useAccountCurrency()
  const [isLeaveGroupModalOpen, setIsLeaveGroupModalOpen] = React.useState(false)

  const router = useRouter()

  const toggleLeaveGroupModal = useCallback(() => {
    setIsLeaveGroupModalOpen((s) => !s)
  }, [])

  const handleGroupLeave = useCallback(() => {
    toggleLeaveGroupModal()
  }, [toggleLeaveGroupModal])

  const handleGroupRedirect = useCallback(() => {
    router.push(`/groups/${group.id}`)
  }, [group.id, router])

  const confirmationModal = useMemo(
    () => (
      <ConfirmationModal
        key={`leave-group-${group.id}`}
        isOpen={isLeaveGroupModalOpen}
        title="Confirm group leave"
        content="Are you sure you want to leave this group?"
        confirmButtonText="Leave"
        onConfirm={handleGroupLeave}
        onCancel={toggleLeaveGroupModal}
      />
    ),
    [group.id, isLeaveGroupModalOpen, handleGroupLeave, toggleLeaveGroupModal],
  )

  return (
    <>
      <Row
        style={{
          justifyContent: 'space-between',
        }}
      >
        <GroupCardHeader
          name={group.name}
          description={group.description}
          creationDate={group.creationDate}
        />

        <DebtAmount
          amount={getDebtsAmount(group.debts, defaultAccountCurrency)}
          currency={defaultAccountCurrency}
        />
      </Row>

      <Row
        style={{
          justifyContent: 'space-between',
        }}
      >
        <UserAvatarsRow users={group.members} />

        <GroupActions
          id={group.id}
          isAdmin={group.isAdmin}
          handleGroupLeave={handleGroupLeave}
          handleGroupRedirect={handleGroupRedirect}
        />
      </Row>

      {confirmationModal}
    </>
  )
}

const GroupItemSkeleton = () => {
  return (
    <>
      <Row
        style={{
          justifyContent: 'space-between',
        }}
      >
        <GroupCardHeader isLoading />
        <DebtAmount isLoading />
      </Row>
      <Row
        style={{
          justifyContent: 'space-between',
        }}
      >
        <UserAvatarsRow isLoading />
      </Row>
    </>
  )
}
export const GroupItem: React.FC<Loadable<GroupItemProps>> = ({ isLoading, ...props }) => {
  return (
    <TiltedContainer>
      <ListItemContainer>
        <Column sx={{ gap: '20px' }}>
          {match([isLoading, props])
            .returnType<React.ReactNode>()
            .with(
              [
                P.nullish,
                P.select('props', {
                  group: P.not(P.nullish),
                  leaveGroup: P.not(P.nullish),
                  // TODO: do something with `pending`
                }),
              ],
              ({ props }) => <GroupItemBase {...props}></GroupItemBase>,
            )
            .otherwise(() => (
              <GroupItemSkeleton />
            ))}
        </Column>
      </ListItemContainer>
    </TiltedContainer>
  )
}
