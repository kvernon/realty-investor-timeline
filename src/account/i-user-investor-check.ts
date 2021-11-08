import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import { IRentalSavings } from '../properties/i-rental-savings';
import { ILoanSetting } from './i-loan-settings';
import { IUserGoal } from './i-user-goal';

export interface IUserInvestorCheck extends IUserGoal {
  /**
   * a collection of loan settings for how to get a loan for single family or some other kind of property
   */
  loanSettings: ILoanSetting[];

  hasMoneyToInvest(date: Date): boolean;

  /**
   * a way to attain the current balance a user has by date
   * @param date
   */
  getBalance(date: Date): number;

  /**
   * a way to determine if the user has enough money. This is different than {@link IUser.getLedgerBalance} because with
   * single family homes, you would have to save a certain amount of monthly mortgage
   * @param date
   * @param properties
   */
  hasMinimumSavings(date: Date, properties: IRentalSavings[]): boolean;

  getMinimumSavings(date: Date, properties: IRentalSavings[]): number;

  /**
   * a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule
   */
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[];
}
