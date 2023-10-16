import { DebtGroup } from './debt-group'
import { Debt } from './debt'

export interface DebtGroupParticipation {
  debtGroupId: DebtGroup['debtGroupId']; // Refer to DebtGroup
  debtId: Debt['debtId']; // Refer to Debt
}
