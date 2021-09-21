import { IUserGoal } from '../account/i-user-goal';

export type HasMetGoalOrMaxTime = (start: Date, today: Date, user: IUserGoal, maxYears: number) => boolean;
