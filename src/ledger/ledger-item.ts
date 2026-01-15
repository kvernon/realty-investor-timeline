import { LedgerItemType } from './ledger-item-type';
import compareDates from '../utils/data-compare-date';
import { getDateQuarter, QuarterType } from '../utils/get-date-quarter';

/**
 * this is an entry into the account. Think of it as a checking account, and it's simply a transaction line.
 */
export class LedgerItem {
  public type: LedgerItemType;
  public created?: Date;
  public amount = 0;
  public note?: string;

  constructor(amount?: number, type?: LedgerItemType, created?: Date, note?: string) {
    this.amount = amount ?? 0;
    this.type = type ?? LedgerItemType.Misc;

    if (created) {
      this.created = created;
    }

    if (note) {
      this.note = note;
    }
  }

  getMonth(): number {
    if (!this.created) {
      return -1;
    }

    return this.created.getUTCMonth();
  }

  /**
   * if one is found, a zero based quarter number, otherwise you'll get -1
   */
  getQuarter(): -1 | QuarterType {
    if (!this.created) {
      return -1;
    }

    return getDateQuarter(this.created);
  }

  isAmountGreaterThanZero(): boolean {
    return this.amount > 0;
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

  /**
   * returns true if the date is less than or equal to the date passed in and the quarter matches
   * @param date
   * @param quarter
   */
  dateLessThanOrEqualToAndQuarter(date: Date, quarter: QuarterType): boolean {
    if (!this.created) {
      return false;
    }

    if (!this.dateLessThanOrEqualTo(date) || !this.dateMatchesYear(date.getUTCFullYear())) {
      return false;
    }

    return this.getQuarter() === quarter;
  }

  /**
   * @deprecated, use {@link dateLessThanOrEqualToAndQuarter}
   * @param year
   * @param quarter
   */
  dateMatchesYearAndQuarter(year: number, quarter: number): boolean {
    if (!this.created) {
      return false;
    }

    if (!this.dateMatchesYear(year)) {
      return false;
    }

    return this.getQuarter() === quarter;
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
