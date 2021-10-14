import { ILoanSetting } from './i-loan-settings';
import { IUserGoal } from './i-user-goal';
import { IUserInvestorCheck } from './i-user-investor-check';

/**
 * It's the user... as an interface!
 */
export interface IUser extends IUserInvestorCheck {
  /**
   * a collection of loan settings for how to get a loan for single family or some other kind of property
   */
  loanSettings: ILoanSetting[];

  /**
   * the goal for keeping or selling a property
   */
  goals: IUserGoal;

  /**
   * an amount which the user can save per month after expenses, like, after my pay check I could put this amount into savings
   */
  monthlySavedAmount: number;

  /**
   * a way to attain the current balance a user has by date
   * @param date
   */
  getLedgerBalance(date: Date): number;
}
