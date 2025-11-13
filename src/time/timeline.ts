import { IHistoricalProperty } from './i-historical-property';
import { IUser } from '../account/user';
import { cloneDateUtc } from '../utils';

export interface ITimeline {
  startDate: Date;
  endDate: Date;
  rentals: IHistoricalProperty[];
  user: IUser;

  getCashFlowMonthByEndDate(): number;

  getBalance(date?: Date): number;

  clone(): ITimeline;
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

  getCashFlowMonthByEndDate(): number {
    return this.user.getCashFlowMonth(cloneDateUtc(this.endDate));
  }

  getBalance(date?: Date): number {
    return this.user.ledgerCollection.getBalance(date ?? this.endDate);
  }

  clone(): ITimeline {
    return new Timeline(
      cloneDateUtc(this.startDate),
      cloneDateUtc(this.endDate),
      (this.rentals || []).map((x) => ({
        property: x.property.clone(),
        reasons: x.reasons.map((x) => ({ ...x })),
      })),
      this.user.clone(),
    );
  }
}
