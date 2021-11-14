import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { isEqual, differenceInMonths } from 'date-fns';
import { IUser } from '../account/user';

/**
 * Method will compare basic dates w/ null user, then move on to check if the user's goal is met. Finally it'll
 * check if there is any more time allowed.
 * @param start
 * @param today
 * @param user
 * @param maxYears
 */
export const defaultHasMetGoalOrMaxTime: HasMetGoalOrMaxTime = (
  start: Date,
  today: Date,
  user: IUser,
  maxYears: number
): boolean => {
  if (isEqual(start, today) && !user) {
    return false;
  }

  if (user && user.metMonthlyGoal(today)) {
    return true;
  }

  const maxDate = new Date(Date.UTC(start.getUTCFullYear() + maxYears, start.getUTCMonth(), 1));
  const months = differenceInMonths(maxDate, today);

  return months <= 0;
};
