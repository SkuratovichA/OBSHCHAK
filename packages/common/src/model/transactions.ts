export enum TransactionStatusType {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  DELETED = 'DELETED',
}

export enum DebtGroupStatusType {
  ACTIVE = 'ACTIVE',
  PARTIALLY_RESOLVED = 'PARTIALLY_RESOLVED',
  RESOLVED = 'RESOLVED',
}

export enum ParticipationRoleType {
  DEBTOR = 'DEBTOR',
  DEBTEE = 'DEBTEE',
}

export enum ParticipationStatusType {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
