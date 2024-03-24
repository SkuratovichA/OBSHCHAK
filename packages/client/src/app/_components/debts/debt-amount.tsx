import React from 'react'
import type { Debt, Loadable } from 'app-common'
import { Skeleton, Typography } from '@mui/material'
import { match, P } from 'ts-pattern'
import { green, grey, red } from '@mui/material/colors'

const getColorByAmount = (amount: number): string =>
  match(amount)
    .returnType<string>()
    .with(
      P.when((x) => x < 0),
      () => red[500],
    )
    .with(
      P.when((x) => x > 0),
      () => green[500],
    )
    .otherwise(() => grey[500])

const appendSign = (amount: number): string =>
  match(amount)
    .returnType<string>()
    .with(
      P.when((x) => x < 0),
      () => `-${amount}`,
    )
    .otherwise(() => `+${amount}`)

type DebtAmountProps = Loadable<Pick<Debt, 'amount' | 'currency'>>
export const DebtAmount: React.FC<DebtAmountProps> = ({ amount, currency, isLoading }) => {
  if (isLoading) {
    return <Skeleton variant="text" width={'8ch'} height={'2.5rem'} />
  }

  return (
    <>
      <Typography
        variant="body1"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {currency}
        &nbsp;
        <a
          style={{
            color: getColorByAmount(amount),
          }}
        >
          {appendSign(amount)}
        </a>
      </Typography>
    </>
  )
}
