import { type Transaction, TransactionStatus } from '@OBSHCHAK-UI/app/(routes)/(authorized-user-ui)/transactions/common-mocks'
import { green, grey, purple } from '@mui/material/colors'
import React, { useState } from 'react'
import { TiltedContainer } from '@OBSHCHAK-UI/components'
import { Box, Modal, Paper, Typography } from '@mui/material'
import { TransactionView } from '@OBSHCHAK-UI/app/(routes)/(authorized-user-ui)/transactions/transaction-view'
import styled from '@emotion/styled'

const getColorByStatus = (status: TransactionStatus): string => {
  switch (status) {
    case TransactionStatus.Paid:
      return green[500]
    case TransactionStatus.Pending:
      return purple[800]
    case TransactionStatus.Active:
      return grey[500]
    default:
      return grey[300]
  }
}

interface TransactionItemProps {
  transaction: Transaction
}
export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <TiltedContainer>
        <TransactionBody elevation={1} onClick={handleOpen}>
          <Box>
            <Typography variant="body1">{`${transaction.name}`}</Typography>
            <Typography variant="body2" color="textSecondary">
              From <UnderlinedText>{transaction.from}</UnderlinedText> to{' '}
              <UnderlinedText>{transaction.to}</UnderlinedText>
            </Typography>
          </Box>
          <Typography variant="body1">{`$${transaction.amount} ${transaction.currency}`}</Typography>
          <Typography variant="body2" style={{ color: getColorByStatus(transaction.status) }}>
            {TransactionStatus[transaction.status]}
          </Typography>
        </TransactionBody>
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

const UnderlinedText = styled.span`
    text-decoration: underline;
`

const TransactionBody = styled(Paper)`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    background-color: #fefefe;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
        background-color: #fcfcfc;
    }
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

