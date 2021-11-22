import { ILoanSetting } from './i-loan-settings';
import { IUserInvestorCheck } from './i-user-investor-check';
import { ILedgerCollection } from '../ledger/ledger-collection';
import { LedgerItem } from '../ledger/ledger-item';
import { IRentalSavings } from '../properties/i-rental-savings';
import { LoanSettings } from './loan-settings';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import cloneDeep from 'lodash.clonedeep';
import { ILedgerSummary } from '../ledger/i-ledger-summary';

/**
 * It's the user... as an interface!
 */
export interface IUser extends IUserInvestorCheck {
  /**
   * an amount which the user can save per month after expenses, like, after my pay check I could put this amount into savings
   */
  monthlySavedAmount: number;

  addLedgerItem(item: LedgerItem | Iterable<LedgerItem>): void;

  getCashFlowMonth(date: Date): number;

  getSummaryMonth(date: Date): ILedgerSummary;

  getSummaryAnnual(year: number): ILedgerSummary;

  getSummariesAnnual(year: number): ILedgerSummary[];

  /**
   * a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule
   */
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[];

  clone(): IUser;
}

export class User implements IUser {
  private readonly ledgerCollection: ILedgerCollection;

  /**
   * a collection of loan settings for how to get a loan for single family or some other kind of property
   */
  loanSettings: ILoanSetting[];

  /**
   * used to determine how much you need want for monthly expenses
   */
  monthlyIncomeAmountGoal: number;

  /**
   * method used to help determine if you have met your expenses
   * @param today
   */
  metMonthlyGoal(today: Date): boolean {
    return this.ledgerCollection.getCashFlowMonth(today) >= this.monthlyIncomeAmountGoal;
  }

  /**
   * an amount which the user can save per month after expenses, like, after my pay check I could put this amount into savings
   */
  monthlySavedAmount: number;

  constructor(ledgerCollection: ILedgerCollection) {
    this.ledgerCollection = ledgerCollection;
  }

  /**
   * a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule
   */
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[];

  getBalance(date: Date): number {
    return this.ledgerCollection.getBalance(date);
  }

  getCashFlowMonth(date: Date): number {
    return this.ledgerCollection.getCashFlowMonth(date);
  }

  addLedgerItem(item: LedgerItem | Iterable<LedgerItem>): void {
    this.ledgerCollection.add(item);
  }

  hasMoneyToInvest(date: Date): boolean {
    return this.getBalance(date) > 0;
  }

  hasMinimumSavings(date: Date, properties: IRentalSavings[]): boolean {
    let minMonthsRequired = 0;
    if (this.loanSettings && this.loanSettings.length > 0) {
      const found = this.loanSettings.find((ls) => ls.name === LoanSettings.minimumReservesSingleFamily);
      minMonthsRequired = found?.value ?? 0;
    }

    return this.ledgerCollection.hasMinimumSavings(date, properties, minMonthsRequired);
  }

  getMinimumSavings(date: Date, properties: IRentalSavings[]): number {
    let minMonthsRequired = 0;
    if (this.loanSettings && this.loanSettings.length > 0) {
      const found = this.loanSettings.find((ls) => ls.name === LoanSettings.minimumReservesSingleFamily);
      minMonthsRequired = found?.value ?? 0;
    }

    return this.ledgerCollection.getMinimumSavings(date, properties, minMonthsRequired);
  }

  getSummaryMonth(date: Date): ILedgerSummary {
    return this.ledgerCollection.getSummaryMonth(date);
  }

  getSummaryAnnual(year: number): ILedgerSummary {
    return this.ledgerCollection.getSummaryAnnual(year);
  }

  getSummariesAnnual(year: number): ILedgerSummary[] {
    return this.ledgerCollection.getSummariesAnnual(year);
  }

  clone(): IUser {
    return Object.assign(new User(this.ledgerCollection.clone()), cloneDeep(this));
  }
}
