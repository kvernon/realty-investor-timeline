import { ILoanSetting } from '../loans/i-loan-settings';
import { IUserInvestorCheck } from './i-user-investor-check';
import { ILedgerCollection } from '../ledger/ledger-collection';
import { LoanSettings } from '../loans/loan-settings';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import cloneDeep from 'lodash.clonedeep';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { PropertyType } from '../properties/property-type';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import currency from '../formatters/currency';

/**
 * It's the user... as an interface!
 */
export interface IUser extends IUserInvestorCheck {
  /**
   * an amount which the user can save per month after expenses, like, after my pay check I could put this amount into savings
   */
  monthlySavedAmount: number;

  /**
   * method used to help determine if you have met your expenses
   * @param today
   * @param properties
   */
  getEstimatedMonthlyCashFlow(today: Date, properties: IRentalPropertyEntity[]): number;

  clone(): IUser;
}

export class User implements IUser {
  /**
   * the collection which is used to keep a balance sheet.
   */
  public readonly ledgerCollection: ILedgerCollection;

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
   * @param properties
   */
  metMonthlyGoal(today: Date, properties: IRentalPropertyEntity[]): boolean {
    return this.getEstimatedMonthlyCashFlow(today, properties) >= this.monthlyIncomeAmountGoal;
  }

  getEstimatedMonthlyCashFlow(today: Date, properties: IRentalPropertyEntity[]): number {
    if (!properties || properties.length === 0) {
      return 0;
    }

    return currency(
      properties.reduce(
        (previousValue, currentValue) => previousValue + currentValue.getEstimatedMonthlyCashFlow(today),
        0
      )
    );
  }

  /**
   * an amount which the user can save per month after expenses, like, after my pay check I could put this amount into savings
   */
  monthlySavedAmount: number;

  constructor(ledgerCollection: ILedgerCollection) {
    this.ledgerCollection = ledgerCollection;
  }

  /**
   * a system to determine how to hold onto the properties the longest. This scenario says as long as it meets 1 rule
   */
  holdRules: IRuleEvaluation<HoldRuleTypes>[];

  /**
   * a system to weed out the properties you don't want. This scenario says as long as it meets 1 rule
   */
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[];

  hasMoneyToInvest(date: Date, properties: IRentalPropertyEntity[], contribution?: number): boolean {
    const availableSavings = this.getAvailableSavings(date, properties);

    if (availableSavings < 0) {
      return false;
    }

    if (contribution === undefined || contribution === null) {
      return availableSavings >= 0;
    }

    const total = availableSavings - contribution;

    return total >= 0;
  }

  hasMinimumSavings(date: Date, properties: IRentalPropertyEntity[]): boolean {
    let minMonthsRequired = 0;
    if (this.loanSettings && this.loanSettings.length > 0) {
      const found = this.loanSettings.find(
        (ls) =>
          ls.name === LoanSettings.MinimumMonthlyReservesForRental && ls.propertyType === PropertyType.SingleFamily
      );
      minMonthsRequired = found?.value ?? 0;
    }

    return this.ledgerCollection.hasMinimumSavings(properties, date, minMonthsRequired);
  }

  getMinimumSavings(date: Date, properties: IRentalPropertyEntity[]): number {
    let minMonthsRequired = 0;
    if (this.loanSettings && this.loanSettings.length > 0) {
      const found = this.loanSettings.find(
        (ls) =>
          ls.name === LoanSettings.MinimumMonthlyReservesForRental && ls.propertyType === PropertyType.SingleFamily
      );
      minMonthsRequired = found?.value ?? 0;
    }

    return this.ledgerCollection.getMinimumSavings(properties, date, minMonthsRequired);
  }

  /**
   * should be the total balance - savings for single family
   * @param date
   * @param properties
   */
  getAvailableSavings(date: Date, properties: IRentalPropertyEntity[]): number {
    let minMonthsRequired = 0;
    if (this.loanSettings && this.loanSettings.length > 0) {
      const found = this.loanSettings.find(
        (ls) =>
          ls.name === LoanSettings.MinimumMonthlyReservesForRental && ls.propertyType === PropertyType.SingleFamily
      );
      minMonthsRequired = found?.value ?? 0;
    }

    return (
      this.ledgerCollection.getBalance(date) -
      this.ledgerCollection.getMinimumSavings(properties, date, minMonthsRequired)
    );
  }

  clone(): IUser {
    return Object.assign(new User(this.ledgerCollection.clone()), {
      loanSettings: this.loanSettings.map((x) => cloneDeep(x)),
      holdRules: this.holdRules.map((x) => cloneDeep(x)),
      purchaseRules: this.purchaseRules.map((x) => cloneDeep(x)),
      monthlySavedAmount: this.monthlySavedAmount,
      monthlyIncomeAmountGoal: this.monthlyIncomeAmountGoal,
    });
  }
}
