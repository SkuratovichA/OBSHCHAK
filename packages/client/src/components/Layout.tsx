'use client'

import React, { useEffect, useState } from 'react'
import { Filters } from './Filters'
import { TransactionList } from './TransactionList'

import { Balance } from './Balance'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { RequestMoneyPortal } from './RequestMoneyPortal'
import { Button } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { FilterTypes } from '@OBSHCHAK-UI/types'
import { COLORS, ThemeType } from '@OBSHCHAK-UI/styles'
import { useAppContext, useTheme, useWebsockets } from '@OBSHCHAK-UI/hooks'
import { Currencies } from 'app-common'
import Link from 'next/link'


export const Layout: React.FC = () => {

  const { theme } = useTheme()

  return (
    <div> da pizda </div>
  )
}


// export const Layout: React.FC = () => {
//   const { theme } = useTheme()
//   const { setUsername } = useAppContext()
//
//   // TODO: actually use websockets
//   // const { transactions, username } = useWebsockets()
//   const transactions: any = []
//   const username = 'test'
//   // const [ filteredTransactions, setFilteredTransactions ] = useState<Transaction[]>([])
//   const [ activeFilters, setActiveFilters ] = useState<FilterTypes[]>([])
//
//
//   // const balance = transactions.reduce((acc, transaction) => {
//   //   if (activeFilters.includes(FilterTypes.MY_DUES) && transaction.target === username) {
//   //     return acc - transaction.amount
//   //   }
//   //   if (activeFilters.includes(FilterTypes.DEBTORS) && transaction.target !== username) {
//   //     return acc + transaction.amount
//   //   }
//   //   return acc
//   // }, 0)
//
//
//   useEffect(() => {
//     if (!username) {
//       return
//     }
//     setUsername(username)
//   }, [ setUsername, username ])
//
//   // useEffect(() => {
//   //   const filtered = transactions.filter((transaction) => {
//   //     if (activeFilters.includes(FilterTypes.PENDING) && transaction.status !== TransactionStatus.ACTIVE) {
//   //       return false
//   //     }
//   //     if (activeFilters.includes(FilterTypes.PAID) && transaction.status !== TransactionStatus.APPROVED) {
//   //       return false
//   //     }
//   //     return true
//   //   })
//   //   setFilteredTransactions(filtered)
//   // }, [ transactions, activeFilters ])
//   //
//
//   const [ showingRequestMoney, setShowingRequestMoney ] = useState(false)
//
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(
//         '/api/test',
//         { method: 'POST', body: JSON.stringify({ test: 'test' }) },
//       )
//       return res.json()
//     }
//     fetchData().catch((e) => console.error('error', JSON.stringify(e))).then((res) => alert(JSON.stringify(res)))
//   }, [])
//
//
//   return (
//     <TWAContainer
//       theme={theme}
//     >
//       <AnimatePresence>
//         {showingRequestMoney &&
//             <RequestMoneyPortalMot
//                 initial={{opacity: 0, x: '-100px'}}
//                 animate={{opacity: 1, x: '0px'}}
//                 exit={{opacity: 0, x: '-100px'}}
//                 // specify duration and easing function
//                 transition={{duration: 0.4}}
//                 toggleClose={() => setShowingRequestMoney(false)}
//             />}
//       </AnimatePresence>
//
//       {!showingRequestMoney && <>
//           {/*<Balance*/}
//           {/*    balance={balance}*/}
//           {/*    currency={Currencies.USD}*/}
//           {/*    setCurrency={() => {*/}
//           {/*    }}*/}
//           {/*>*/}
//           {/*    <Button*/}
//           {/*        onClick={() => {*/}
//           {/*          setShowingRequestMoney(true)*/}
//           {/*        }}*/}
//           {/*        variant="contained"*/}
//           {/*    >*/}
//           {/*        Request*/}
//           {/*    </Button>*/}
//           {/*</Balance>*/}
//           <Filters
//               activeFilters={activeFilters}
//               setActiveFilters={setActiveFilters}
//           />
//           <TransactionList
//               transactions={[]}
//           />
//       </>}
//
//     </TWAContainer>
//   )
// }
//
// const RequestMoneyPortalMot = motion(RequestMoneyPortal)
