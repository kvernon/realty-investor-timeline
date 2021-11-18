import { generateSingleFamily } from '../generators/factory-single-family';
import { IPropertyEntityOptions } from '../generators/i-property-entity-options';
import { RentalGenerator } from '../generators/rental-generator';
import { User } from '../account/user';
import { ILoanSetting } from '../account/i-loan-settings';
import { RuleEvaluation } from '../rules/rule-evaluation';
import { IRule } from '../rules/i-rule';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { ITimeline } from './i-timeline';
import { RentalSingleFamily } from '../properties';
import { LedgerCollection, LedgerItem, LedgerItemType } from '../ledger';
import { ValueCache } from '../caching/value-cache';
import { loop } from './movement';
import cloneDateUtc from '../utils/data-clone-date';

export interface ISimulateOptions extends IPropertyEntityOptions {
  /**
   * this is what you have saved up currently to invest in
   */
  amountInSavings: number;

  /**
   * What you want to get to for cash flow. This has been monthly expenses for many.
   */
  monthlyIncomeAmountGoal: number;

  /**
   * After your paycheck you would take your excess and save it. Here is that amount.
   */
  monthlySavedAmount: number;

  /**
   * loan basics about you. For example, if you have a great credit, you'll probably have a low interest rate. so that's 3%. With rentals, you are 1% higher, so make it 4%.
   */
  loanSettings: ILoanSetting[];

  /**
   * This is how to prioritize the properties that come up. Use one, or use all rules! The order you put them in here, is the order it evaluates them as. {@link PurchaseRuleTypes} for possible rules
   */
  purchaseRules: IRule<PurchaseRuleTypes>[];

  /**
   * when does this start?
   */
  startDate?: Date;

  /**
   * how long should this run in years? A common number is 25 to 30 years before giving up.
   */
  maxYears?: number;

  /**
   * This is how the system knows when to quit. If no value is supplied, it will use {@link defaultHasMetGoalOrMaxTime}.
   */
  hasMetGoalOrMaxTime?: HasMetGoalOrMaxTime;

  /**
   * Used to provide an amount of Random properties
   */
  maxRentalOpportunitiesSingleFamily: number;
}

/**
 * Easy entry method to get anyone going on simulating a property, or properties acquisition.
 * @param options
 */
export function simulate(options: ISimulateOptions): ITimeline {
  const formattedUtcDate = cloneDateUtc(options.startDate ?? new Date());
  const valueCache = new ValueCache(cloneDateUtc(formattedUtcDate), [], options.maxRentalOpportunitiesSingleFamily);

  const propertyGeneratorSingleFamily = Object.assign(
    new RentalGenerator<RentalSingleFamily>(valueCache, generateSingleFamily),
    options
  );

  const totalSavings = new LedgerItem();
  totalSavings.amount = options.amountInSavings;
  totalSavings.note = 'money saved up before you start';
  totalSavings.type = LedgerItemType.Saved;
  totalSavings.created = cloneDateUtc(formattedUtcDate);

  const ledgerCollection = new LedgerCollection();
  ledgerCollection.add(totalSavings);

  const user = new User(ledgerCollection);
  user.monthlySavedAmount = options.monthlySavedAmount;
  user.monthlyIncomeAmountGoal = options.monthlyIncomeAmountGoal;
  user.loanSettings = options.loanSettings;
  user.purchaseRules = (options.purchaseRules || []).map((r) => new RuleEvaluation(r.value, r.type));

  return loop(
    {
      propertyGeneratorSingleFamily,
      maxYears: options.maxYears,
      startDate: formattedUtcDate,
      hasMetGoalOrMaxTime: options.hasMetGoalOrMaxTime,
    },
    user
  );
}
