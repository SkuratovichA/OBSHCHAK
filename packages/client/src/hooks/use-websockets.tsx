'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { API_ORIGIN } from 'app-common'

// FIXME: add types
interface WebsocketsContextProps {
  // transactions: any[];
  // username: string | null;
  // addTransaction: (transaction: any) => void;
  // changeTransaction: (transaction: any) => void;
  // requestMoney: (transaction: Omit<any, 'timestamp' | 'status'>) => void;
  // answerOnRequestMoney: (transaction: any) => void;
  // pay: (transaction: any) => void;
}

const WebsocketsContext = createContext<WebsocketsContextProps | undefined>(undefined)

export const WebsocketsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // const [ transactions, setTransactions ] = useState<any[]>([])
  // const [username, setUsername] = useState<string | null>(null)
  //
  // const [socket, setSocket] = useState<Socket | null>(null)
  //
  // const connectSocket = useCallback(() => {
  //   if (socket) {
  //     return
  //   }
  //   const username = new URLSearchParams(window.location.search).get('username')
  //   const query = username ? { username } : {}
  //   const newSocket = io(
  //     API_ORIGIN, {
  //       transports: ['websocket'],
  //       query
  //     }
  //   )
  //   setSocket(newSocket)
  // }, [socket])
  //
  // const disconnectSocket = useCallback(() => {
  //   if (socket) {
  //     socket.disconnect()
  //     setSocket(null)
  //   }
  // }, [socket])
  //
  // useEffect(() => {
  //   connectSocket()
  //   return disconnectSocket
  // }, [connectSocket, disconnectSocket])
  //
  //
  // useEffect(() => {
  //   if (!socket){
  //     return
  //   }
  //
  //   socket.on('connect', () => {
  //     console.log('Connected to the server')
  //   })
  //
  //   socket.on('initialData', ({transactions, username}: {transactions: any[], username: string}) => {
  //     setTransactions(transactions)
  //     setUsername(username)
  //   })
  //
  //   socket.on('addTransaction', (transaction: any) => {
  //     setTransactions(prev => [ ...prev, transaction ])
  //   })
  //
  //   socket.on('changeTransaction', (transaction: Transaction) => {
  //     setTransactions(prev => prev.map(prevTransaction =>
  //       prevTransaction.target === transaction.target ? transaction: prevTransaction,
  //     ))
  //   })
  //
  //   socket.on('error', ({message}) => {
  //     console.error(`WebSocket error Handled: `, message)
  //   })
  //
  // }, [socket])
  //
  // const addTransaction = (transaction: Transaction) => {
  //   setTransactions(prev => [ ...prev, transaction ])
  // }
  //
  // const changeTransaction = (updatedTransaction: Transaction) => {
  //   setTransactions(prev => prev.map(transaction =>
  //     transaction.target === updatedTransaction.target ? updatedTransaction : transaction,
  //   ))
  // }
  //
  // const requestMoney: WebsocketsContextProps['requestMoney'] = (transaction) => {
  //   if (!socket) {
  //     return
  //   }
  //   socket.emit('requestMoney', transaction)
  // }
  // const answerOnRequestMoney: WebsocketsContextProps['answerOnRequestMoney'] = (transaction) => {
  //   if (!socket) {
  //     return
  //   }
  //   socket.emit('answerOnRequestMoney', transaction)
  // }
  // const pay: WebsocketsContextProps['pay'] = (transaction) => {
  //   if (!socket) {
  //     return
  //   }
  //   socket.emit('pay', transaction)
  // }
  //
  return (
    <WebsocketsContext.Provider
      value={
        {
          // requestMoney,
          // answerOnRequestMoney,
          // pay,
          // username,
          // transactions,
          // addTransaction,
          // changeTransaction
        }
      }
    >
      {children}
    </WebsocketsContext.Provider>
  )
}

export const useWebsockets = () => {
  const context = useContext(WebsocketsContext)
  if (context === undefined)
    throw new Error('useTransactions must be used within WebsocketProvider')
  return context
}
