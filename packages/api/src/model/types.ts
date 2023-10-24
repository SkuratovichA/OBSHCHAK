export enum ParticipationRoleType {
  DEBTOR = 'DEBTOR',
  DEBTEE = 'DEBTEE',
}

export enum ParticipationStatusType {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum DebtGroupStatusType {
  ACTIVE = 'ACTIVE',
  PARTIALLY_RESOLVED = 'PARTIALLY_RESOLVED',
  RESOLVED = 'RESOLVED',
}

export enum DebtStatusType {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}

export enum PaymentStatusType {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export enum PaymentMethodType {
  DIRECT = 'DIRECT',
  CASH = 'CASH',
}