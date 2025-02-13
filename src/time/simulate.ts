import { generateRentalPassiveApartment } from '../generators/factory-passive-apartment';
import { generateSingleFamily } from '../generators/factory-single-family';
import { IPropertyEntityOptions } from '../generators/i-property-entity-options';
import { RentalGenerator } from '../generators/rental-generator';
import { User } from '../account/user';
import { ILoanSetting } from '../loans/i-loan-settings';
import { RuleEvaluation } from '../rules/rule-evaluation';
import { IRule } from '../rules/i-rule';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { ITimeline } from './timeline';
import { PropertyType, RentalPassiveApartment, RentalSingleFamily } from '../properties';
import { LedgerCollection, LedgerItem, LedgerItemType } from '../ledger';
import { ValueCache } from '../caching/value-cache';
import { movement } from './movement';
import { cloneDateUtc } from '../utils/data-clone-date';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { LoanSettings } from '../loans/loan-settings';

export interface IGenOptions extends IPropertyEntityOptions {
  /**
   * Used to provide an amount of Random properties
   */
  maxRentalOpportunities: number;
}

export interface ISimulateOptions {
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
   * a system to determine how to hold onto the properties the longest. This scenario says as long as it meets 1 rule
   */
  holdRules: IRule<HoldRuleTypes>[];

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
   * This is how the system knows when to quit. If no value is supplied, it will use `defaultHasMetGoalOrMaxTime`.
   */
  hasMetGoalOrMaxTime?: HasMetGoalOrMaxTime;

  generatorOptionsSingleFamily?: IGenOptions;

  generatorOptionsPassiveApartment?: IGenOptions;
}

/**
 * Easy entry method to get anyone going on simulating a property, or properties acquisition.
 * @param options
 */
export function simulate(
  options: ISimulateOptions = {
    amountInSavings: 100000,
    monthlyIncomeAmountGoal: 10000,
    monthlySavedAmount: 10000,
    holdRules: [
      {
        value: 5,
        type: HoldRuleTypes.MinSellIfHighEquityPercent,
        propertyType: PropertyType.SingleFamily,
      },
    ],
    purchaseRules: [
      {
        value: 50000,
        type: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
        propertyType: PropertyType.SingleFamily,
      },
      {
        value: 7000,
        type: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
        propertyType: PropertyType.SingleFamily,
      },
      {
        value: 200,
        type: PurchaseRuleTypes.MinEstimatedAnnualCashFlow,
        propertyType: PropertyType.SingleFamily,
      },
    ],
    loanSettings: [
      {
        propertyType: PropertyType.SingleFamily,
        name: LoanSettings.MinimumMonthlyReservesForRental,
        value: 6,
      },
      {
        name: LoanSettings.LoanRatePercent,
        value: 4,
        propertyType: PropertyType.SingleFamily,
      },
      {
        name: LoanSettings.LoanTermInYears,
        value: 30,
        propertyType: PropertyType.SingleFamily,
      },
    ],
    maxYears: 7,
    generatorOptionsSingleFamily: {
      lowestMinSellInYears: 1,
      highestMinSellInYears: 1,
      lowestPurchasePrice: 150000,
      highestPurchasePrice: 250000,
      lowestSellAppreciationPercent: 5,
      highestSellAppreciationPercent: 7,
      lowestCashFlow: 200,
      highestCashFlow: 550,
      lowestEquityCapturePercent: 7,
      highestEquityCapturePercent: 15,
      maxRentalOpportunities: 4,
    },
  }
): ITimeline {
  const formattedUtcDate = cloneDateUtc(options.startDate ?? new Date());

  if (!options.generatorOptionsPassiveApartment && !options.generatorOptionsSingleFamily) {
    throw new Error(
      'Invalid Argument: must declare at least 1, either generatorOptionsSingleFamily or generatorOptionsPassiveApartment'
    );
  }

  const propertyGeneratorSingleFamily = Object.assign(
    new RentalGenerator<RentalSingleFamily>(
      new ValueCache(cloneDateUtc(formattedUtcDate), [], 2),
      generateSingleFamily
    ),
    options.generatorOptionsSingleFamily
  );

  const propertyGeneratorPassiveApartment = Object.assign(
    new RentalGenerator<RentalPassiveApartment>(
      new ValueCache(cloneDateUtc(formattedUtcDate), [], 2),
      generateRentalPassiveApartment
    ),
    options.generatorOptionsPassiveApartment
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
  user.holdRules = (options.holdRules || []).map((r) => new RuleEvaluation(r.value, r.type, r.propertyType));
  user.purchaseRules = (options.purchaseRules || []).map((r) => new RuleEvaluation(r.value, r.type, r.propertyType));

  return movement(
    {
      propertyGeneratorSingleFamily,
      propertyGeneratorPassiveApartment,
      maxYears: options.maxYears,
      startDate: formattedUtcDate,
      hasMetGoalOrMaxTime: options.hasMetGoalOrMaxTime,
    },
    user
  );
}
