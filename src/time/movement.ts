import { ITimeline } from './i-timeline';
import { IUserGoal } from '../account/i-user-goal';
import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { defaultHasMetGoalOrMaxTime } from './default-has-met-goal-or-max-time';
import { RentalSingleFamily } from '../properties/rental-single-family';
import { IRentalGenerator } from '../generators/rental-generator';
import { IUser } from '../account/i-user';

export interface ILoopOptions {
  startDate: Date;
  goal: IUserGoal;
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
  };

  const lastDate = new Date(options.startDate.getUTCFullYear() + options.maxYears, options.startDate.getUTCMonth(), 1);

  do {
    today = new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 1);
    result.endDate = new Date(today.getTime());

    if (result.rentals.length === 0) {
      result.rentals = options.propertyGeneratorSingleFamily
        .getRentals(RentalSingleFamily, user.loanSettings)
        .map((p) => ({
          property: p,
          reasons: [],
        }));
    } else {
      options.propertyGeneratorSingleFamily.getRentals(RentalSingleFamily, user.loanSettings).forEach((x) => {
        if (!result.rentals.some((historicalProps) => historicalProps.property.id === x.id)) {
          result.rentals.push({ property: x, reasons: [] });
        }
      });
    }
  } while (!options.hasMetGoalOrMaxTime(today, lastDate, options.goal, options.maxYears));

  return result;
}
