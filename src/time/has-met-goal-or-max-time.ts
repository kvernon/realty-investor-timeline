import { IUserGoal } from '../account/i-user-goal';

/**
 * a way to determine if the loop should end based on the user's goals
 */
export type HasMetGoalOrMaxTime = (start: Date, today: Date, user: IUserGoal, maxYears: number) => boolean;
