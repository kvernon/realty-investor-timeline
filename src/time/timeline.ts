import { IHistoricalProperty } from './i-historical-property';
import { IUser } from '../account/user';

export interface ITimeline {
  startDate: Date;
  endDate: Date;
  rentals: IHistoricalProperty[];
  user: IUser;

  getEstimatedMonthlyCashFlow(): number;

  getBalance(date?: Date): number;
}

export class Timeline implements ITimeline {
  constructor(startDate: Date, endDate: Date, rentals: IHistoricalProperty[], user: IUser) {
    this.startDate = startDate;
    this.rentals = rentals;
    this.endDate = endDate;
    this.user = user;
  }

  endDate: Date;
  rentals: IHistoricalProperty[];
  startDate: Date;
  user: IUser;

  getEstimatedMonthlyCashFlow(): number {
    return this.user.getEstimatedMonthlyCashFlow(
      this.endDate,
      this.rentals.map((x) => x.property)
    );
  }

  getBalance(date?: Date): number {
    return this.user.ledgerCollection.getBalance(date ?? this.endDate);
  }
}
