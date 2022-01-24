import { HoldRuleTypes } from '../rules/hold-rule-types';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import { ILoanSetting } from '../loans/i-loan-settings';
import { IUserGoal } from './i-user-goal';
import { ILedgerCollection } from '../ledger/ledger-collection';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';

export interface IUserInvestorCheck extends IUserGoal {
  /**
   * the collection which is used to keep a balance sheet.
   */
  readonly ledgerCollection: ILedgerCollection;

  /**
   * a collection of loan settings for how to get a loan for single family or some other kind of property
   */
  loanSettings: ILoanSetting[];

  /**
   * a system to determine how to hold onto the properties the longest. This scenario says as long as it meets 1 rule
   */
  holdRules: IRuleEvaluation<HoldRuleTypes>[];

  /**
   * based upon {@link getMinimumSavings}, it checks to see if there is an amount remaining that can be used.
   * @param date
   * @param properties
   * @param contribution
   */
  hasMoneyToInvest(date: Date, properties: IRentalPropertyEntity[], contribution?: number): boolean;

  /**
   * a way to determine if the user has enough money. This is different because with
   * single family homes, you would have to save a certain amount of monthly mortgage
   * @param date
   * @param properties
   */
  hasMinimumSavings(date: Date, properties: IRentalPropertyEntity[]): boolean;

  /**
   * used to retrieve the amount required to keep in savings
   * @param date
   * @param properties
   */
  getMinimumSavings(date: Date, properties: IRentalPropertyEntity[]): number;

  /**
   * should be the total balance - savings, using {@link getMinimumSavings}, for determining monthly cash to save for single family properties
   * @param date
   * @param properties
   */
  getAvailableSavings(date: Date, properties: IRentalPropertyEntity[]): number;

  /**
   * a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule
   */
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[];
}
