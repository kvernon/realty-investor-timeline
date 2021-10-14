import { ITimeline } from './i-timeline';
import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { defaultHasMetGoalOrMaxTime } from './default-has-met-goal-or-max-time';
import { RentalSingleFamily } from '../properties/rental-single-family';
import { IRentalGenerator } from '../generators/rental-generator';
import { IUser } from '../account/i-user';
import cloneDeep from 'lodash.clonedeep';
import { LedgerItemType } from '../ledger/ledger-item-type';
import { LedgerItem } from '../ledger/ledger-item';

export interface ILoopOptions {
  startDate: Date;
  maxYears?: number;
  hasMetGoalOrMaxTime?: HasMetGoalOrMaxTime;
  propertyGeneratorSingleFamily: IRentalGenerator<RentalSingleFamily>;
}

export function loop(options: ILoopOptions, user: IUser): ITimeline {
  if (!options.hasMetGoalOrMaxTime) {
    options.hasMetGoalOrMaxTime = defaultHasMetGoalOrMaxTime;
  }

  let today = new Date(options.startDate.getUTCFullYear(), options.startDate.getUTCMonth(), 1);

  const result: ITimeline = {
    startDate: new Date(today.getTime()),
    endDate: new Date(today.getTime()),
    rentals: [],
    user: Object.assign({}, cloneDeep(user)),
  };

  const lastDate = new Date(options.startDate.getUTCFullYear() + options.maxYears, options.startDate.getUTCMonth(), 1);

  do {
    today = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 1);
    result.endDate = new Date(today.getTime());

    //step 1: get savings
    if (result.user.monthlySavedAmount > 0) {
      const ledgerItem = new LedgerItem();
      ledgerItem.amount = result.user.monthlySavedAmount;
      ledgerItem.type = LedgerItemType.Salary;
      ledgerItem.created = new Date(today.getTime());
      ledgerItem.note = 'saved for month';
      result.user.ledger.add(ledgerItem);
    }

    //step 2: get cash flow
    //step 3: sell properties
    //step 4: buy new properties

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
  } while (!options.hasMetGoalOrMaxTime(today, lastDate, result.user, options.maxYears));

  return result;
}
