import { LedgerItemType } from './ledger-item-type';

export class LedgerItem {
  public type: LedgerItemType;
  public created?: Date;
  public amount = 0;
  public note?: string;

  getMonth(): number {
    if (!this.created) {
      return -1;
    }

    return this.created.getUTCMonth();
  }

  dateMatchesYearAndMonth(today: Date): boolean {
    if (!today) {
      return false;
    }

    if (!this.dateMatchesYear(today.getUTCFullYear())) {
      return false;
    }

    return today.getUTCMonth() === this.created.getUTCMonth();
  }

  dateMatchesYear(year: number): boolean {
    if (!this.created) {
      return false;
    }

    return year === this.created.getUTCFullYear();
  }

  typeMatches(itemType: LedgerItemType): boolean {
    return this.type === itemType;
  }

  getYear(): number {
    if (!this.created) {
      return -1;
    }

    return this.created.getUTCFullYear();
  }
}