export enum PaymentStatusType {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum PaymentMethodType {
  DIRECT = 'DIRECT',
  CASH = 'CASH',
}

export interface Payment {
  paymentId: string
  debtParticipationId: string // Refer to DebtParticipation
  amount: number
  method: PaymentMethodType
  status: PaymentStatusType
  timestamp: string
}
