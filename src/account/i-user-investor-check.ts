import { ILedgerCollection } from '../ledger/ledger-collection';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { IRuleEvaluation } from '../rules/rule-evaluation';

export interface IUserInvestorCheck {
  /**
   * a way to determine if the user has enough money. This is different than {@link IUser.getLedgerBalance} because with
   * single family homes, you would have to save a certain amount of monthly mortgage
   * @param date
   */
  hasMoneyToInvest(date: Date): boolean;

  /**
   * your ledger collection
   */
  ledger: ILedgerCollection;

  /**
   * a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule
   */
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[];
}
