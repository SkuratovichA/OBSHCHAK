export enum DebtGroupStatusType {
  ACTIVE = 'ACTIVE',
  PARTIALLY_RESOLVED = 'PARTIALLY_RESOLVED',
  RESOLVED = 'RESOLVED',
}

export interface DebtGroup {
  debtGroupId: string;
  name: string;
  description: string;
  status: DebtGroupStatusType;
  createdTimestamp: string;
  resolvedTimestamp: string | null;
}
