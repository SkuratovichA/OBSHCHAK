import React, { useState } from 'react'
import { green, grey, purple } from '@mui/material/colors'
import { Box, Modal, Skeleton, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'

import { TiltedContainer, ListItemContainerBase } from '../../index'

import { DebtView } from '../debt-view'
import type { Loadable, Debt } from 'app-common'
import { DebtStatusType } from 'app-common'
import { match } from 'ts-pattern'
import { DebtAmount } from '@OBSHCHAK-UI/app/_components/debts/debt-amount'

const getColorByStatus = (status: DebtStatusType): string =>
  match(status)
    .with(DebtStatusType.Paid, () => green[500])
    .with(DebtStatusType.Pending, () => grey[500])
    .with(DebtStatusType.Active, () => purple[500])
    .otherwise(() => grey[300])

enum DebtParticipantsType {
  from = 'from',
  to = 'to',
}

enum DebtNameType {
  name = 'name',
}

type DebtParticipantsProps = Loadable<Pick<Debt, keyof typeof DebtParticipantsType>>
const DebtParticipantsText: React.FC<DebtParticipantsProps> = ({ from, to, isLoading }) => {
  if (isLoading) {
    return (
      <Stack direction="row">
        <Skeleton variant="text" width={'4ch'} />
        <Skeleton variant="text" width={'6ch'} />
        <Skeleton variant="text" width={'2ch'} />
        <Skeleton variant="text" width={'10ch'} />
      </Stack>
    )
  }

  return (
    <Typography variant="body2" color="textSecondary">
      From <UnderlinedText>{from}</UnderlinedText> to{' '}
      {to
        .map(({ username }) => username)
        .map((username, idx) => (
          <UnderlinedText key={idx}>{username}</UnderlinedText>
        ))}
    </Typography>
  )
}

type DebtNameAndParticipantsType = keyof typeof DebtNameType | keyof typeof DebtParticipantsType
type DebtNameAndParticipantsProps = Loadable<Pick<Debt, DebtNameAndParticipantsType>>
const DebtNameAndParticipants: React.FC<DebtNameAndParticipantsProps> = ({
  name,
  from,
  to,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="text" width={'20ch'} />
        <Skeleton variant="text" width={'20ch'} />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="body1">{name}</Typography>
      <DebtParticipantsText from={from} to={to} />
    </Box>
  )
}

const DebtItemSkeleton: React.FC = () => {
  return (
    <TiltedContainer>
      <ListItemContainerBase elevation={1}>
        <DebtNameAndParticipantsContainer>
          <DebtNameAndParticipants isLoading={true} />
        </DebtNameAndParticipantsContainer>

        <DebtAmountContainer>
          <DebtAmount isLoading={true} />
        </DebtAmountContainer>

        <DebtStatusContainer>
          <DebtStatus isLoading={true} />
        </DebtStatusContainer>
      </ListItemContainerBase>
    </TiltedContainer>
  )
}

type DebtStatusProps = Loadable<Pick<Debt, 'status'>>
const DebtStatus: React.FC<DebtStatusProps> = ({ status, isLoading }) => {
  if (isLoading) {
    return <Skeleton variant="text" width={'5ch'} />
  }

  return (
    <Typography variant="body2" style={{ color: getColorByStatus(status) }}>
      {DebtStatusType[status]}
    </Typography>
  )
}

type DebtItemProps = Loadable<{
  item: Debt
}>
export const DebtItem: React.FC<DebtItemProps> = ({ item, isLoading }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  if (isLoading) {
    return <DebtItemSkeleton />
  }

  if (item === undefined) {
    return <div>PROBABLY AN UNHANDLED ERROR</div>
  }

  const modalId = 'debt-modal-title'
  const modalDescriptionId = 'debt-modal-description'

  return (
    <>
      <TiltedContainer>
        <ListItemContainerBase elevation={1} onClick={handleOpen}>
          <DebtNameAndParticipantsContainer>
            <DebtNameAndParticipants name={item.name} from={item.from} to={item.to} />
          </DebtNameAndParticipantsContainer>

          <DebtAmountContainer>
            <DebtAmount amount={item.amount} currency={item.currency} />
          </DebtAmountContainer>

          <DebtStatusContainer>
            <DebtStatus status={item.status} />
          </DebtStatusContainer>
        </ListItemContainerBase>
      </TiltedContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={modalId}
        aria-describedby={modalDescriptionId}
      >
        <ModalBox>
          <DebtView item={item} modalId={modalId} modalDescriptionId={modalDescriptionId} />
        </ModalBox>
      </Modal>
    </>
  )
}

const DebtNameAndParticipantsContainer = styled.div`
  flex: 6;
`

const DebtAmountContainer = styled.div`
  flex: 4;
  text-align: right;
`

const DebtStatusContainer = styled.div`
  flex: 2;
  text-align: right;
`

const UnderlinedText = styled.span`
  text-decoration: underline;
`

const ModalBox = styled(Box)`
  position: absolute;
  width: 75vw;
  height: 75vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fefefe;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
`
