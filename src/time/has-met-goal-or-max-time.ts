import { IUser } from '../account/user';

/**
 * a way to determine if the loop should end based on the user's rules
 */
export type HasMetGoalOrMaxTime = (start: Date, today: Date, user: IUser, maxYears: number) => boolean;
