import { Debt } from './debt'
import { User } from './user'

export enum ParticipationRoleType {
  DEBTOR = 'DEBTOR',
  DEBTEE = 'DEBTEE',
}

export enum ParticipationStatusType {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface DebtParticipation {
  debtParticipationId: string;
  debtId: Debt['debtId']; // Refer to Debt
  userId: User['userId']; // Refer to User
  role: ParticipationRoleType;
  amount: number;
  status: ParticipationStatusType;
}
