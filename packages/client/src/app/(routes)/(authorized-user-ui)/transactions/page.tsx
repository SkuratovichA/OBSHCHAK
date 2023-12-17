'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import ProfileIcon from '@mui/icons-material/AccountCircle'
import TransactionIcon from '@mui/icons-material/AccountBalanceWallet'
import GroupsIcon from '@mui/icons-material/GroupWork'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

import {
  TransactionDirectionType,
  TransactionStatusType,
  CreateTransactionData,
  Transaction,
  Notification,
  UserProfile,
} from 'app-common'

const Layout: React.FC = () => {
  const { data: session } = useSession()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSaveTransaction = useCallback(async () => {
    const transactionDummyData: CreateTransactionData = {
      name: 'Test transaction',
      currency: 'USD',
      participants: [],
      direction: TransactionDirectionType.PAID,
      transactionDate: new Date(),
      description: 'Test transaction description',
      groups: ['1', '2'],
      categories: ['1', '2'],
      status: TransactionStatusType.PENDING,
    }
    let response: any | undefined
    try {
      response = (
        await fetch('/api/transactions/create-transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transactionDummyData),
        })
      ).json()
    } catch (err: any) {
      console.error(err)
      alert('CANT CREARTE TRANSACTION')
      setOpen(false)
      return
    }
    console.log(response)
    setOpen(false)
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    // Mock fetching data, you can replace this with your API calls.
    const fetchData = async () => {
      const response = await fetch('/api/getTransactions')
      const data: Transaction[] = await response.json()
      setTransactions(data)
    }

    fetchData()
  }, [])

  return (
    <Container component="main">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            хуй знает, что тут будет. Но это будет...
          </Typography>
        </Toolbar>
      </AppBar>

      <SearchSection>
        <TextField
          label="Search Transactions"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </SearchSection>

      {/* TODO: refactor. dunno how transactions look as fow now */}
      <TransactionList style={{ height: '50vh', border: '1px solid black' }}>
        {transactions
          .filter((t) => t.name.includes(filter))
          .map((transaction) => (
            <motion.div key={transaction.debtId}>{/* Render transaction */}</motion.div>
          ))}
      </TransactionList>

      {/* TODO: refactor. this button looks shitty */}
      <Button color="primary" aria-label="add" onClick={handleClickOpen}>
        <AskForMoneyContent>
          <a>Create Transaction</a>
        </AskForMoneyContent>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Transaction</DialogTitle>

        <DialogContent>
          <TextField id="name" label="Name" variant="outlined" fullWidth />
          <TextField id="amount" label="Amount" variant="outlined" fullWidth />
          {/*look up participants*/}
          <TextField id="participants" label="Participants" variant="outlined" fullWidth />
          <ParticipantsDistribution />
          <TextField id="description" label="Description" variant="outlined" fullWidth />
          <TextField id="groups" label="Groups" variant="outlined" fullWidth />
          <TextField id="categories" label="Categories" variant="outlined" fullWidth />
          <TextField id="direction" label="Direction" variant="outlined" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveTransaction} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

const ParticipantsDistribution = styled.div`
  width: 80%;
  display: flex;
  height: 40px;
  background: white;
  color: black;
`

const SearchSection = styled.div`
  margin: 20px 0;
`

const TransactionList = styled.div`
  margin: 20px 0;
  flex-grow: 1; // to occupy the main screen real estate
`

const AskForMoneyContent = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`

export default Layout
