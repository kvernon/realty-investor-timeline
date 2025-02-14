import { HasMetGoalOrMaxTime } from './has-met-goal-or-max-time';
import { ILoopRecursiveOptions } from './i-loop-recursive-options';

export interface ILoopOptions extends ILoopRecursiveOptions {
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
}
