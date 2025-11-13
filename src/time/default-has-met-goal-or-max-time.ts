import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { isEqual, differenceInMonths } from 'date-fns';
import { IUser } from '../account/user';
import { cloneDateUtc } from '../utils/data-clone-date';

/**
 * Method will compare basic dates w/ null user and all rentals
 * @param start
 * @param today
 * @param user
 * @param maxYears
 */
export const defaultHasMetGoalOrMaxTime: HasMetGoalOrMaxTime = (start: Date, today: Date, user: IUser, maxYears: number): boolean => {
  if (isEqual(start, today) && !user) {
    return false;
  }

  if (user && user.metMonthlyGoal(today)) {
    return true;
  }

  const maxDate = cloneDateUtc(start, (date) => {
    date.setUTCFullYear(date.getUTCFullYear() + maxYears);
  });

  return differenceInMonths(maxDate, today) <= 0;
};
