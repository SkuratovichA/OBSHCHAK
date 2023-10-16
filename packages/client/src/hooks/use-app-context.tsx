'use client'
import React, { createContext, useContext, useState } from 'react'

interface AppContextType {
  username: string;
  setUsername: (username: string) => void;
  // Add other values as needed
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [ username, setUsername ] = useState('')

  // Provide initial values for the context
  const contextValue = {
    username,
    setUsername,
    // Initialize other values here as needed
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }

  return context
}
