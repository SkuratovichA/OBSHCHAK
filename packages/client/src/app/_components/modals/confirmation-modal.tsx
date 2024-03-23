import React from 'react'
import { Box, Button, Modal, Typography, styled } from '@mui/material'

const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  borderRadius: theme.shape.borderRadius,
}))

type ConfirmationModalProps = {
  isOpen: boolean
  title: string
  content: string
  confirmButtonText: string
  onConfirm: () => void
  onCancel: () => void
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  content,
  confirmButtonText,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <StyledModalBox>
        <Typography variant="h6" id="confirmation-modal-title" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" id="confirmation-modal-description">
          {content}
        </Typography>
        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={4}>
          <Button variant="outlined" onClick={onCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </Box>
      </StyledModalBox>
    </Modal>
  )
}
