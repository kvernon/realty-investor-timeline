import { ILoanSetting } from './i-loan-settings';
import { IUserGoal } from './i-user-goal';

export interface IUser {
  loanSettings: ILoanSetting[];
  goals: IUserGoal;
}
