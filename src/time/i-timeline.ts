import { IHistoricalProperty } from './i-historical-property';
import { IUser } from '../account/i-user';

export interface ITimeline {
  startDate: Date;
  endDate: Date;
  rentals: IHistoricalProperty[];
  user: IUser;
}

/**
 * What's the lightest timeline model?
 *
 * 1. start date
 * 2. end date
 * 3. collection of all properties that were in rotation
 *    a. would need to updated available dates
 *    b. would need to update purchase dates
 *    c. would need to update sold dates
 *
 *
 *
 */
