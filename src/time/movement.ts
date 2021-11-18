import { ITimeline } from './i-timeline';
import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { defaultHasMetGoalOrMaxTime } from './default-has-met-goal-or-max-time';
import { RentalSingleFamily } from '../properties/rental-single-family';
import { IRentalGenerator } from '../generators/rental-generator';
import { IUser } from '../account/user';
import { LedgerItemType } from '../ledger/ledger-item-type';
import { LedgerItem } from '../ledger/ledger-item';
import propertySort from '../properties/property-sort';
import cloneDateUtc from '../utils/data-clone-date';

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
  propertyGeneratorSingleFamily: IRentalGenerator<RentalSingleFamily>;
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
    options.startDate = new Date(Date.UTC(setupDate.getUTCFullYear(), setupDate.getUTCMonth(), 1));
  }

  let today = cloneDateUtc(options.startDate);

  const result: ITimeline = {
    startDate: cloneDateUtc(today),
    endDate: cloneDateUtc(today),
    rentals: [],
    user: user.clone(),
  };

  do {
    today = cloneDateUtc(today);
    today.setUTCMonth(today.getUTCMonth() + 1);

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

    if (result.rentals.length === 0) {
      result.rentals = options.propertyGeneratorSingleFamily
        .getRentals(RentalSingleFamily, today, user.loanSettings)
        .map((p) => ({
          property: p,
          reasons: [],
        }));
    } else {
      options.propertyGeneratorSingleFamily
        .getRentals(RentalSingleFamily, today, result.user.loanSettings)
        .forEach((x) => {
          if (!result.rentals.some((historicalProps) => historicalProps.property.id === x.id)) {
            result.rentals.push({ property: x, reasons: [] });
          }
        });
    }

    //step 2: get cash flow
    result.rentals
      .filter((r) => r.property.isOwned)
      .forEach((pr) => {
        const cashFlow = new LedgerItem();
        cashFlow.amount = pr.property.getMonthlyCashFlowByDate(today);
        cashFlow.type = LedgerItemType.CashFlow;
        cashFlow.created = cloneDateUtc(today);
        cashFlow.note = `for: ${pr.property.address}, id: ${pr.property.id}`;
        result.user.addLedgerItem(cashFlow);
      });

    //step 3: sell properties
    result.rentals
      .filter((r) => r.property.canSell(today))
      .forEach((pr) => {
        pr.property.soldDate = cloneDateUtc(today);

        const equityFromSell = new LedgerItem();
        equityFromSell.amount = pr.property.getEquityFromSell(today);
        equityFromSell.type = LedgerItemType.Equity;
        equityFromSell.created = cloneDateUtc(today);
        equityFromSell.note = `for: ${pr.property.address}, id: ${pr.property.id}`;
        result.user.addLedgerItem(equityFromSell);
      });

    if (!result.user.hasMoneyToInvest(today)) {
      continue;
    }

    //step 4: buy new properties
    result.rentals
      .filter((r) => r.property.isAvailableByDate(today))
      .map((r) => {
        const validator = r.property.canInvestByUser(
          user,
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
      .sort((a, b) => propertySort(a.property, b.property, user.purchaseRules))
      .forEach((pr) => {
        // check cash
        if (user.hasMoneyToInvest(today)) {
          // buy
          const purchase = new LedgerItem();
          purchase.amount = pr.property.costDownPrice;
          purchase.type = LedgerItemType.Purchase;
          purchase.created = cloneDateUtc(today);
          purchase.note = `for: ${pr.property.address}, id: ${pr.property.id}`;
          result.user.addLedgerItem(purchase);

          // set to purchase
          pr.property.purchaseDate = cloneDateUtc(today);
        }
      });
  } while (!options.hasMetGoalOrMaxTime(result.startDate, today, result.user, options.maxYears));

  return result;
}
