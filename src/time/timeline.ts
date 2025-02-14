import { IHistoricalProperty } from './i-historical-property';
import { IUser } from '../account/user';
import { ILedgerSummary } from '../ledger/i-ledger-summary';
import { cloneDateUtc } from '../utils';

export interface ITimeline {
  startDate: Date;
  endDate: Date;
  rentals: IHistoricalProperty[];
  user: IUser;

  getEstimatedMonthlyCashFlow(): number;

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

  getEstimatedMonthlyCashFlow(): number {
    return this.user.getEstimatedMonthlyCashFlow(
      this.endDate,
      this.rentals.map((x) => x.property).filter((x) => x.isOwned)
    );
  }

  getBalance(date?: Date): number {
    return this.user.ledgerCollection.getBalance(date ?? this.endDate);
  }

  getSummariesAnnualByYear(year?: number): ILedgerSummary[] {
    return this.user.ledgerCollection.getSummariesAnnual(year ?? this.endDate.getUTCFullYear());
  }

  getAllSummariesAnnual(): ILedgerSummary[] {
    let result: ILedgerSummary[] = [];

    for (
      let startYear: number = this.startDate.getUTCFullYear();
      startYear < this.endDate.getUTCFullYear();
      startYear++
    ) {
      result = result.concat(this.getSummariesAnnualByYear(startYear));
    }

    return result;
  }

  clone(): ITimeline {
    return new Timeline(
      cloneDateUtc(this.startDate),
      cloneDateUtc(this.endDate),
      (this.rentals || []).map((x) => ({
        property: x.property.clone(),
        reasons: x.reasons.map((x) => ({ ...x })),
      })),
      this.user.clone()
    );
  }
}
