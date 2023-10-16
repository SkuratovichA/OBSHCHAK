import { Currencies } from '@OBSHCHAK/common'

export const currencyMapping: Record<Currencies, string> = {
  [Currencies.USD]: '$',
  [Currencies.EUR]: '€',
  [Currencies.CZK]: 'Kč',
}

export enum FilterTypes {
  MY_DUES = 'my dues',
  DEBTORS = 'debtors',
  PENDING = 'pending',
  PAID = 'paid',
}
