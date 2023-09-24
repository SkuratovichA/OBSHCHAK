import React, { useEffect, useState } from 'react'
import { Filters } from './Filters'
import { TransactionList } from './TransactionList'

import { Balance } from './Balance'
import { Currencies, FilterTypes, Transaction, TransactionStatus } from '../common'
import styled from '@emotion/styled'
import { useWebsockets } from '../hooks/use-websockets'
import { useTheme } from '../hooks/use-theme'
import { COLORS, ThemeType } from '../styles'
import { css } from '@emotion/react'
import { RequestMoneyPortal } from './RequestMoneyPortal'
import { Button } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppContext } from '../hooks/use-app-context'

export const Layout: React.FC = () => {
  const { theme } = useTheme()
  const { setUsername } = useAppContext()

  const { transactions, username } = useWebsockets()
  const [ filteredTransactions, setFilteredTransactions ] = useState<Transaction[]>([])
  const [ activeFilters, setActiveFilters ] = useState<FilterTypes[]>([])

  const balance = transactions.reduce((acc, transaction) => {
    if (activeFilters.includes(FilterTypes.MY_DUES) && transaction.target === username) {
      return acc - transaction.amount
    }
    if (activeFilters.includes(FilterTypes.DEBTORS) && transaction.target !== username) {
      return acc + transaction.amount
    }
    return acc
  }, 0)


  useEffect(() => {
    if (!username) {
      return
    }
    setUsername(username)
  }, [username])

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      if (activeFilters.includes(FilterTypes.PENDING) && transaction.status !== TransactionStatus.Active) {
        return false
      }
      if (activeFilters.includes(FilterTypes.PAID) && transaction.status !== TransactionStatus.Closed) {
        return false
      }
      return true
    })
    setFilteredTransactions(filtered)
  }, [ transactions, activeFilters ])


  const [ showingRequestMoney, setShowingRequestMoney ] = useState(false)


  return (
    <TWAContainer
      theme={theme}
    >
      <AnimatePresence>
        {showingRequestMoney &&
            <RequestMoneyPortalMot
                toggleClose={() => setShowingRequestMoney(false)}
            />}
      </AnimatePresence>

      {!showingRequestMoney && <>
          <Balance
              balance={balance}
              currency={Currencies.USD}
              setCurrency={() => {
              }}
          >
              <Button
                  onClick={() => {
                    setShowingRequestMoney(true)
                  }}
                  variant="contained"
              >
                  Request
              </Button>
          </Balance>
          <Filters
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
          />
          <TransactionList
              transactions={filteredTransactions}
          />
      </>}

    </TWAContainer>
  )
}

const RequestMoneyPortalMot = motion(RequestMoneyPortal)

const TWAContainer = styled.div<{ theme: ThemeType }>`
  width: 386px;
  margin: auto;
  padding: 12px;
  ${({ theme }) => css`
    background: ${COLORS.background(theme)};
  `}
  height: 100vh;

  > * {
    margin-bottom: 20px;
  }
`

