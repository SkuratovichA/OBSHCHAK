import React, { createContext, useContext, ReactNode, PropsWithChildren } from 'react'


interface LoadingContext {
  isLoading: boolean
}
const LoadingContext = createContext<LoadingContext | undefined>(undefined)

export const LoadingProvider: React.FC<PropsWithChildren<LoadingContext>> = ({ children, isLoading }) => {

  return <LoadingContext.Provider value={{ isLoading }}>
    {children}
  </LoadingContext.Provider>
}

export const useLoading = () => {
  const context = useContext(LoadingContext)

  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }

  return context
}
