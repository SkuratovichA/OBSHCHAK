import type { PropsWithChildren } from 'react'
import React, { createContext, useContext } from 'react'


interface LoadingContext {
  isLoading: boolean
}

const LoadingContext = createContext<LoadingContext | undefined>(undefined)

export const LoadingProvider: React.FC<PropsWithChildren<LoadingContext>> = ({ children, isLoading }) =>
  <LoadingContext.Provider value={{ isLoading }}>
    {children}
  </LoadingContext.Provider>

export const useLoading = () => {
  const context = useContext(LoadingContext)

  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }

  return context
}
