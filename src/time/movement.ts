import { ITimeline } from './i-timeline';
import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { defaultHasMetGoalOrMaxTime } from './default-has-met-goal-or-max-time';
import { RentalSingleFamily } from '../properties/rental-single-family';
import { IRentalGenerator } from '../generators/rental-generator';
import { IUser } from '../account/i-user';
import cloneDeep from 'lodash.clonedeep';
import { LedgerItemType } from '../ledger/ledger-item-type';
import { LedgerItem } from '../ledger/ledger-item';
import propertySort from '../properties/property-sort';

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

  if (!options.startDate) {
    const setupDate = new Date();
    options.startDate = new Date(Date.UTC(setupDate.getUTCFullYear(), setupDate.getUTCMonth(), 1));
  }

  let today = new Date(Date.UTC(options.startDate.getUTCFullYear(), options.startDate.getUTCMonth(), 1));

  const result: ITimeline = {
    startDate: new Date(today.getTime()),
    endDate: new Date(today.getTime()),
    rentals: [],
    user: Object.assign({}, cloneDeep(user)),
  };

  const lastDate = new Date(
    Date.UTC(options.startDate.getUTCFullYear() + options.maxYears, options.startDate.getUTCMonth(), 1)
  );

  do {
    today = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 1));
    result.endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));

    //step 1: get savings
    if (result.user.monthlySavedAmount > 0) {
      const ledgerItem = new LedgerItem();
      ledgerItem.amount = result.user.monthlySavedAmount;
      ledgerItem.type = LedgerItemType.Salary;
      ledgerItem.created = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
      ledgerItem.note = 'saved for month';
      result.user.ledger.add(ledgerItem);
    }

    if (result.rentals.length === 0) {
      result.rentals = options.propertyGeneratorSingleFamily
        .getRentals(RentalSingleFamily, user.loanSettings)
        .map((p) => ({
          property: p,
          reasons: [],
        }));
    } else {
      options.propertyGeneratorSingleFamily.getRentals(RentalSingleFamily, result.user.loanSettings).forEach((x) => {
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
        cashFlow.created = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
        cashFlow.note = `for: ${pr.property.address}, id: ${pr.property.id}`;
        result.user.ledger.add(cashFlow);
      });

    //step 3: sell properties
    result.rentals
      .filter((r) => r.property.canSell(today))
      .forEach((pr) => {
        const equityFromSell = new LedgerItem();
        equityFromSell.amount = pr.property.getEquityFromSell(today);
        equityFromSell.type = LedgerItemType.Equity;
        equityFromSell.created = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
        equityFromSell.note = `for: ${pr.property.address}, id: ${pr.property.id}`;
        result.user.ledger.add(equityFromSell);
        pr.property.soldDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
      });

    if (!result.user.hasMoneyToInvest(today)) {
      continue;
    }

    //step 4: buy new properties
    result.rentals
      .filter(
        (r) =>
          r.property.isAvailableByDate(today) &&
          r.property.canInvestByUser(
            user,
            today,
            result.rentals.map((h) => h.property)
          ).canInvest
      )
      .sort((a, b) => propertySort(a.property, b.property, user.purchaseRules))
      .forEach((pr) => {
        // check cash
        if (user.hasMoneyToInvest(today)) {
          // buy
          const purchase = new LedgerItem();
          purchase.amount = pr.property.costDownPrice;
          purchase.type = LedgerItemType.Purchase;
          purchase.created = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
          purchase.note = `for: ${pr.property.address}, id: ${pr.property.id}`;
          result.user.ledger.add(purchase);

          // set to purchase
          pr.property.purchaseDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
        }
      });
  } while (!options.hasMetGoalOrMaxTime(today, lastDate, result.user, options.maxYears));

  return result;
}
