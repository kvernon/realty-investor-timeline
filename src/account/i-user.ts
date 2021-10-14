import { ILoanSetting } from './i-loan-settings';
import { IUserGoal } from './i-user-goal';
import { ILedgerCollection } from '../ledger/ledger-collection';

export interface IUser {
  loanSettings: ILoanSetting[];

  goals: IUserGoal;

  monthlySavedAmount: number;

  ledger: ILedgerCollection;

  getLedgerBalance(): number;

  hasMoneyToInvest(): boolean;
}
