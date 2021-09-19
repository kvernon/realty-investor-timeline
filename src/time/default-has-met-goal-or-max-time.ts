import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { isEqual } from 'date-fns';

/**
 * only compares @{link start} and @{link today}
 * @param start
 * @param today
 * @param _user
 * @param _maxYears
 */
export const defaultHasMetGoalOrMaxTime: HasMetGoalOrMaxTime = (start, today, _user, _maxYears) => {
  return isEqual(start, today);
};
