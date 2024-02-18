import React, { useState } from 'react'
import { green, grey, purple } from '@mui/material/colors'
import { Box, Modal, Skeleton, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'

import { TiltedContainer, ListItemContainer } from '../../index'

import { TransactionView } from '../transaction-view'
import type { Loadable, Transaction } from 'app-common'
import { TransactionStatusType } from 'app-common'

const getColorByStatus = (status: TransactionStatusType): string => {
  switch (status) {
    case TransactionStatusType.Paid:
      return green[500]
    case TransactionStatusType.Pending:
      return purple[800]
    case TransactionStatusType.Active:
      return grey[500]
    default:
      return grey[300]
  }
}


enum TransactionParticipantsType {
  from = 'from',
  to = 'to'
}

enum TransactionNameType {
  name = 'name'
}

type TransactionParticipantsProps = Loadable<Pick<Transaction, keyof typeof TransactionParticipantsType>>
const TransactionParticipantsText: React.FC<TransactionParticipantsProps> = ({ from, to, isLoading }) => {

  if (isLoading) {
    return <Stack direction="row">
      <Skeleton variant="text" width={'4ch'} />
      <Skeleton variant="text" width={'6ch'} />
      <Skeleton variant="text" width={'2ch'} />
      <Skeleton variant="text" width={'10ch'} />
    </Stack>
  }

  return <Typography variant="body2" color="textSecondary">
    From <UnderlinedText>{from}</UnderlinedText>
    {' '}to{' '}
    {to
      .map(({ username }) => username)
      .map((username, idx) =>
        <UnderlinedText key={idx}>{username}</UnderlinedText>,
      )
    }
  </Typography>
}

const NowrapText = styled.div`
  //white-space: nowrap;
  //overflow: hidden;
  //text-overflow: ellipsis;
`


type TransactionNameAndParticipantsType = keyof typeof TransactionNameType | keyof typeof TransactionParticipantsType
type TransactionNameAndParticipantsProps = Loadable<Pick<Transaction, TransactionNameAndParticipantsType>>
const TransactionNameAndParticipants: React.FC<TransactionNameAndParticipantsProps>
  = ({ name, from, to, isLoading }) => {

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
      <TransactionParticipantsText from={from} to={to} />
    </Box>
  )
}

const TransactionItemSkeleton: React.FC = () => {
  return (
    <TiltedContainer>
      <ListItemContainer elevation={1}>

        <TransactionNameAndParticipantsContainer>
          <TransactionNameAndParticipants isLoading={true} />
        </TransactionNameAndParticipantsContainer>

        <TransactionAmountContainer>
          <TransactionAmount isLoading={true} />
        </TransactionAmountContainer>

        <TransactionStatusContainer>
          <TransactionStatus isLoading={true} />
        </TransactionStatusContainer>

      </ListItemContainer>
    </TiltedContainer>
  )
}


type TransactionAmountProps = Loadable<Pick<Transaction, 'amount' | 'currency'>>
const TransactionAmount: React.FC<TransactionAmountProps> = ({ amount, currency, isLoading }) => {

  if (isLoading) {
    return <Skeleton variant="text" width={'6ch'} />
  }

  return (
    <Typography variant="body1">
      {`${currency} ${amount}`}
    </Typography>
  )
}

type TransactionStatusProps = Loadable<Pick<Transaction, 'status'>>
const TransactionStatus: React.FC<TransactionStatusProps> = ({ status, isLoading }) => {

  if (isLoading) {
    return <Skeleton variant="text" width={'5ch'} />
  }

  return (
    <Typography variant="body2" style={{ color: getColorByStatus(status) }}>
      {TransactionStatusType[status]}
    </Typography>
  )
}

type TransactionItemProps = Loadable<{
  transaction: Transaction
}>
export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, isLoading }) => {

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  if (isLoading) {
    return <TransactionItemSkeleton />
  }

  if (transaction === undefined) {
    return <div>PROBABLY AN UNHANDLED ERROR</div>
  }

  return (
    <>
      <TiltedContainer>
        <ListItemContainer elevation={1} onClick={handleOpen}>
          <TransactionNameAndParticipantsContainer>
            <TransactionNameAndParticipants
              name={transaction.name}
              from={transaction.from}
              to={transaction.to}
            />
          </TransactionNameAndParticipantsContainer>

          <TransactionAmountContainer>
            <TransactionAmount
              amount={transaction.amount}
              currency={transaction.currency}
            />
          </TransactionAmountContainer>

          <TransactionStatusContainer>
            <TransactionStatus status={transaction.status} />
          </TransactionStatusContainer>
        </ListItemContainer>
      </TiltedContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transaction-modal-title"
        aria-describedby="transaction-modal-description"
      >
        <ModalBox>
          <TransactionView transaction={transaction} />
        </ModalBox>
      </Modal>
    </>
  )
}

const TransactionNameAndParticipantsContainer = styled.div`
    flex: 6;
`

const TransactionAmountContainer = styled.div`
    flex: 4;
    text-align: right;
`

const TransactionStatusContainer = styled.div`
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
