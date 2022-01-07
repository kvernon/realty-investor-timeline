import { IUser } from '../account/user';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';

/**
 * a way to determine if the loop should end based on the user's rules
 */
export type HasMetGoalOrMaxTime = (
  start: Date,
  today: Date,
  user: IUser,
  rentals: IRentalPropertyEntity[],
  maxYears: number
) => boolean;
