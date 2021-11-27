import { ITimeline, Timeline } from './timeline';
import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { defaultHasMetGoalOrMaxTime } from './default-has-met-goal-or-max-time';
import { RentalSingleFamily } from '../properties/rental-single-family';
import { IRentalGenerator } from '../generators/rental-generator';
import { IUser } from '../account/user';
import { LedgerItemType } from '../ledger/ledger-item-type';
import { LedgerItem } from '../ledger/ledger-item';
import propertySort from '../properties/property-sort';
import { cloneDateUtc } from '../utils/data-clone-date';
import { ensureArray } from '../utils/ensure';
import { ILoanSetting } from '../loans/i-loan-settings';
import { PropertyType } from '../properties/property-type';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { RentalPassiveApartment } from '../properties/rental-passive-apartment';
import { UpdateHistoricalRentals } from './update-historical-rentals';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { getMinCostDownByRule } from '../calculations/get-min-cost-down-by-rule';

export interface ILoopOptions {
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
   * How the system generates single family properties
   */
  propertyGeneratorSingleFamily?: IRentalGenerator<RentalSingleFamily>;

  /**
   * How the system generates passive apartment properties
   */
  propertyGeneratorPassiveApartment?: IRentalGenerator<RentalPassiveApartment>;
}

/**
 * This is where the magic happens. You provide the options, and you let this calculate the rest.
 * @param options
 * @param user
 */
export function loop(options: ILoopOptions, user: IUser): ITimeline {
  if (!options.hasMetGoalOrMaxTime) {
    options.hasMetGoalOrMaxTime = defaultHasMetGoalOrMaxTime;
  }

  if (!options.maxYears) {
    options.maxYears = 10;
  }

  if (!options.startDate) {
    const setupDate = new Date();
    options.startDate = cloneDateUtc(setupDate);
  }

  if (!options.propertyGeneratorPassiveApartment && !options.propertyGeneratorSingleFamily) {
    throw new Error(
      'Invalid Argument: must declare at least 1, either propertyGeneratorSingleFamily or propertyGeneratorPassiveApartment'
    );
  }

  ensureArray<ILoanSetting>(user.loanSettings, {
    predicate: (item) => item.propertyType === PropertyType.SingleFamily,
    message: 'no single family loan settings for user: loanSettings',
    ignoreError: !options.propertyGeneratorSingleFamily && !!options.propertyGeneratorPassiveApartment,
  });
  ensureArray<IRuleEvaluation<PurchaseRuleTypes>>(user.purchaseRules, {
    predicate: (item) => item.propertyType !== PropertyType.None,
    message: 'no single family or passive apartment purchase rules for user: purchaseRules',
  });
  ensureArray<IRuleEvaluation<HoldRuleTypes>>(user.holdRules, {
    predicate: (item) => item.propertyType === PropertyType.SingleFamily,
    message: 'no single family hold rules for user: holdRules',
    ignoreError: !options.propertyGeneratorSingleFamily && !!options.propertyGeneratorPassiveApartment,
  });

  let today = cloneDateUtc(options.startDate);

  const result: Timeline = new Timeline(cloneDateUtc(today), cloneDateUtc(today), [], user.clone());

  do {
    today = cloneDateUtc(today, (date) => date.setUTCMonth(date.getUTCMonth() + 1));
    result.endDate = cloneDateUtc(today);

    //step 1: get savings
    if (result.user.monthlySavedAmount > 0) {
      const salary = new LedgerItem();
      salary.amount = result.user.monthlySavedAmount;
      salary.type = LedgerItemType.Salary;
      salary.created = cloneDateUtc(today);
      salary.note = 'saved for month';
      result.user.addLedgerItem(salary);
    }

    result.rentals = UpdateHistoricalRentals(
      RentalSingleFamily,
      options.propertyGeneratorSingleFamily,
      result.rentals,
      today,
      result.user
    );

    result.rentals = UpdateHistoricalRentals(
      RentalPassiveApartment,
      options.propertyGeneratorPassiveApartment,
      result.rentals,
      today,
      result.user
    );

    //step 2: get cash flow
    result.rentals
      .filter((r) => r.property && r.property.isOwned)
      .forEach((pr) => {
        const cashFlow = new LedgerItem();
        cashFlow.amount = pr.property.getCashFlowByDate(today);
        cashFlow.type = LedgerItemType.CashFlow;
        cashFlow.created = cloneDateUtc(today);
        cashFlow.note = `for: ${pr.property.address}, id: ${pr.property.id} (${
          PropertyType[pr.property.propertyType]
        })`;

        if (cashFlow.isAmountGreaterThanZero()) {
          result.user.addLedgerItem(cashFlow);
        }
      });

    //step 3: sell properties
    result.rentals
      .filter((r) => r.property && r.property.canSell(today))
      .sort((a, b) => propertySort<HoldRuleTypes>(a.property, b.property, result.user.holdRules))
      .forEach((pr) => {
        pr.property.soldDate = cloneDateUtc(today);

        const equityFromSell = new LedgerItem();
        equityFromSell.amount = pr.property.getEquityFromSell(today);
        equityFromSell.type = LedgerItemType.Equity;
        equityFromSell.created = cloneDateUtc(today);
        equityFromSell.note = `for: ${pr.property.address}, id: ${pr.property.id} (${
          PropertyType[pr.property.propertyType]
        })`;
        result.user.addLedgerItem(equityFromSell);
      });

    if (
      !result.user.hasMoneyToInvest(
        today,
        result.rentals.map((x) => x.property)
      )
    ) {
      continue;
    }

    //step 4: buy new properties
    result.rentals
      .filter((r) => r.property && r.property.isAvailableByDate(today))
      .map((r) => {
        const validator = r.property.canInvestByUser(
          result.user,
          today,
          result.rentals.map((h) => h.property)
        );

        if (!validator.canInvest) {
          r.reasons = r.reasons.concat(
            validator.results.map((reasons) => ({
              reason: reasons.message,
              date: cloneDateUtc(today),
            }))
          );
        }

        return {
          historical: r,
          validator: validator,
        };
      })
      .filter((r) => r.validator.canInvest)
      .map((r) => r.historical)
      .sort((a, b) => propertySort<PurchaseRuleTypes>(a.property, b.property, result.user.purchaseRules))
      .forEach((pr) => {
        // check cash
        const minCostDownByRule = getMinCostDownByRule(pr.property, result.user.purchaseRules);
        if (
          minCostDownByRule > 0 &&
          result.user.hasMoneyToInvest(
            today,
            result.rentals.map((x) => x.property),
            minCostDownByRule
          )
        ) {
          // buy
          const purchase = new LedgerItem();
          purchase.amount = minCostDownByRule * -1;
          purchase.type = LedgerItemType.Purchase;
          purchase.created = cloneDateUtc(today);
          purchase.note = `for: ${pr.property.address}, id: ${pr.property.id} (${
            PropertyType[pr.property.propertyType]
          })`;

          if (!purchase.isAmountGreaterThanZero()) {
            result.user.addLedgerItem(purchase);

            // set to purchase
            pr.property.purchaseDate = cloneDateUtc(today);

            if (pr.property.propertyType === PropertyType.PassiveApartment) {
              pr.property.costDownPrice = minCostDownByRule;
            }
          }
        }
      });
  } while (
    !options.hasMetGoalOrMaxTime(
      result.startDate,
      today,
      result.user,
      result.rentals.map((x) => x.property),
      options.maxYears
    )
  );

  return result;
}
