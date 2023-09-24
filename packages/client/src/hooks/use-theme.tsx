import React, { createContext, useCallback, useContext, useState } from 'react'
import { ThemeType } from '../styles'


interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
}

export const UseTheme = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [ theme, setTheme ] = useState(ThemeType.LIGHT)

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT))
  }, [])

  return (
    <UseTheme.Provider value={{ theme, toggleTheme }}>
      {children}
    </UseTheme.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(UseTheme)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
