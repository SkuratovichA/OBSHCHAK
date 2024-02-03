'use client'

import React, { useState } from 'react'
import { Tilt } from 'react-tilt'
import {
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  InputAdornment,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { green, grey, purple } from '@mui/material/colors'
import styled from '@emotion/styled'

import type { Function } from 'app-common'
import { deSpacify } from 'app-common'

type NamedCallbacks<T extends string | number | symbol = string, X = void, Y = void> = Record<
  T,
  Function<X, Y>
>

interface TogglerConfiguratorProps {
  name: string
  values: NamedCallbacks
  handler: Function<SelectChangeEvent<string>, void>
  selectedValue: string
}

const TogglerConfigurtaor: React.FC<TogglerConfiguratorProps> = ({
  name,
  values,
  handler,
  selectedValue,
}) => (
  <FormControl key={name} variant="standard" sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id={`input-label-${deSpacify(name)}`}>{name}</InputLabel>
    <Select
      labelId={`label-${deSpacify(name)}`}
      id={`select-${deSpacify(name)}`}
      value={selectedValue}
      onChange={handler}
      label={name}
    >
      {Object.entries(values).map(([displayName, _], idx) => (
        <MenuItem key={idx} id={`${idx}-${displayName}`} value={displayName}>
          {displayName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

type TransactionFilterBarProps = {
  filters: NamedCallbacks
  groupBy: NamedCallbacks
  search: Function<string>
}
const TransactionsFilterBar: React.FC<TransactionFilterBarProps> = ({
  filters,
  groupBy,
  search,
}) => {
  const [dateFilter, setDateFilter] = useState('')
  const [userGrouping, setUserGrouping] = useState('')
  const [searchValue, setSearchValue] = useState('')

  // Handler functions for filter and group-by and search
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setDateFilter(event.target.value as string)
    filters[event.target.value as string]?.()
  }

  const handleGroupingChange = (event: SelectChangeEvent<string>) => {
    setUserGrouping(event.target.value as string)
    groupBy[event.target.value as string]?.()
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(event.target.value)
    search(event.target.value)
  }

  // TODO: we can go generic here and have an object with the specifications but we aren't going to.
  // maybe somewhere in the future whenever we'll need it
  const configurations: TogglerConfiguratorProps[] = [
    {
      name: 'Filter by',
      values: filters,
      handler: handleFilterChange,
      selectedValue: dateFilter, // Assuming dateFilter is the state for the selected filter
    },
    {
      name: 'Group by',
      values: groupBy,
      handler: handleGroupingChange,
      selectedValue: userGrouping,
    },
  ]
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      {configurations.map((config, idx) => (
        <TogglerConfigurtaor key={idx} {...config} />
      ))}

      <TextField
        id="search-by-value"
        label="Search"
        variant="standard"
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

enum TransactionStatus {
  Paid = 'Paid',
  Pending = 'Pending',
  Active = 'Active',
}

interface Transaction {
  name: string
  from: string
  to: string
  amount: number
  currency: string
  status: TransactionStatus
  description?: string
  id: string
}

const transactionsMock: Transaction[] = [
  // Example transactions - please replace with real data
  {
    name: 'Transaction 1',
    from: 'you',
    to: 'username',
    amount: 200,
    currency: 'USD',
    status: TransactionStatus.Paid,
    id: 'txn1',
  },
  {
    name: 'Transaction 2',
    from: 'username',
    to: 'you',
    amount: 200,
    currency: 'USD',
    status: TransactionStatus.Active,
    id: 'txn2',
  },
  {
    name: 'Transaction 3',
    from: 'username',
    to: 'you',
    amount: 400,
    currency: 'USD',
    status: TransactionStatus.Pending,
    id: 'txn3',
  },
  // ... more transactions
]

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
`
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <Tilt
      style={{ width: '100%' }}
      options={{ max: 1.2, scale: 1.0, speed: 10, glare: true, 'max-glare': 0.5 }}
    >
      <TransactionBody elevation={1}>
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
    </Tilt>
  )
}

const withNone = (obj: Object) => ({ ...obj, None: 'None' })

const TransactionsList: React.FC = () => {
  // State for filter and group-by
  const [filterBy, setFilterBy] = useState(withNone({}).None)
  const [groupBy, setGroupBy] = useState(withNone({}).None)

  // Handler functions for filter and group-by
  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterBy(event.target.value as string)
  }

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    setGroupBy(event.target.value as string)
  }

  // Filter function for transactions
  const filteredTransactions = transactionsMock.filter((transaction) => {
    // Implement filtering logic here based on the filterBy state
    return true // Currently, it returns true for all transactions
  })

  const filterValues = Object.fromEntries(
    Object.keys(withNone(TransactionStatus)).map((key) => [
      key,
      () => console.log(`filtering by ${key}`),
    ]),
  ) as NamedCallbacks<keyof typeof TransactionStatus, void, void>

  const groupByValues = Object.fromEntries(
    Object.keys(
      withNone({
        Users: 1,
        Labels: 2,
        Direction: 3,
      }),
    ).map((key) => [key, () => console.log(`grouping by ${key}`)]),
  )

  // TODO: Implement grouping logic based on the groupBy state
  return (
    <Container>
      <TransactionsFilterBar
        filters={filterValues}
        groupBy={groupByValues}
        search={(value: string) => {
          console.log(`searching ${value}`)
        }}
      />

      <List>
        {filteredTransactions.map((transaction) => (
          <ListItem
            key={transaction.id}
            style={{ borderRadius: 8, marginBottom: 8, height: 100, perspective: 10000 }}
          >
            <TransactionItem transaction={transaction} />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default TransactionsList
