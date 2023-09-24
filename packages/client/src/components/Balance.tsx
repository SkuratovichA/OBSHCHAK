import styled from '@emotion/styled'
import { COLORS, ThemeType } from '../styles'
import { useTheme } from '../hooks/use-theme'
import { css } from '@emotion/react'
import { currencyMapping, Currencies } from '../common'


interface BalanceProps {
  balance: number
  currency: Currencies
  setCurrency: (currency: Currencies) => void
}

export const Balance: React.FC<React.PropsWithChildren<BalanceProps>> = ({ balance, currency, setCurrency, children }) => {

  const { theme } = useTheme()

  return (
    <BalanceContainer theme={theme}>
      <BalanceMoney>
        <BalanceHeader
          theme={theme}
        >My Balance</BalanceHeader>
        <BalanceValue
          theme={theme}
        >{currencyMapping[currency]}{' '}{balance}</BalanceValue>
      </BalanceMoney>
      {children}
    </BalanceContainer>
  )
}

const BalanceContainer = styled.div<{ theme: ThemeType }>`
  height: 40px;
  
  border-radius: 12px;
  padding: 8px;
  
  ${({ theme }) => css`
    border: 2px solid ${COLORS.text(theme).primary}
  `}
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`

// balance has header above and value below
const BalanceMoney = styled.div`
  //display: flex;
  //flex-direction: row;
  //justify-content: left; 
`

const BalanceHeader = styled.div<{ theme: ThemeType }>`
  font-size: 12px;
  font-weight: 600;
  ${({ theme }) => css`
    color: grey;
  `}
`

const BalanceValue = styled.div<{ theme: ThemeType }>`
  font-size: 20px;
  font-weight: 800;


  ${({ theme }) => css`
    color: ${COLORS.text(theme).primary};
  `}
  
`
