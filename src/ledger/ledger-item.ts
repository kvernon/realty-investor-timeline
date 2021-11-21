import { LedgerItemType } from './ledger-item-type';
import compareDates from '../utils/data-compare-date';

/**
 * this is an entry into the account. Think of it as a checking account, and it's simply a transaction line.
 */
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

  dateLessThanOrEqualTo(today: Date): boolean {
    if (!today || !this.created) {
      return false;
    }

    return compareDates(this.created, today) >= 0;
  }

  dateNotGreaterThan(today: Date): boolean {
    if (!today || !this.created) {
      return false;
    }

    return compareDates(this.created, today) !== 1;
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

  clone(): LedgerItem {
    return Object.assign(new LedgerItem(), this);
  }
}
