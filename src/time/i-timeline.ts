import { IHistoricalProperty } from './i-historical-property';
import { IUser } from '../account/user';

export interface ITimeline {
  startDate: Date;
  endDate: Date;
  rentals: IHistoricalProperty[];
  user: IUser;
}
