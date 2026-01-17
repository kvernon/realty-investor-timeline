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

  dateMatchesYearAndMonth(date: Date): boolean {
    if (!date) {
      return false;
    }

    if (!this.dateMatchesYear(date.getUTCFullYear())) {
      return false;
    }

    return date.getUTCMonth() === this.created.getUTCMonth();
  }

  /**
   * returns `true` if date's date is less than or equal to the created date
   * @param date
   */
  dateLessThanOrEqualTo(date: Date): boolean {
    if (!date || !this.created) {
      return false;
    }

    return compareDates(this.created, date) >= 0;
  }

  /**
   * returns `true` if date's date is grater than or equal to the created date
   * @param date
   */
  dateGreaterThanOrEqualTo(date: Date): boolean {
    if (!date || !this.created) {
      return false;
    }

    return compareDates(this.created, date) <= 0;
  }

  dateNotGreaterThan(date: Date): boolean {
    if (!date || !this.created) {
      return false;
    }

    return compareDates(this.created, date) !== 1;
  }

  dateMatchesYear(year: number): boolean {
    if (!this.created) {
      return false;
    }

    return year === this.created.getUTCFullYear();
  }

  /**
   * returns `true` if date's date is more recent than or equal to the created date and the quarter matches
   * @param date
   */
  dateLessThanOrEqualToAndQuarter(date: Date): boolean {
    if (!this.created) {
      return false;
    }

    if (!this.dateMatchesYear(date.getUTCFullYear())) {
      return false;
    }

    if (this.getQuarter() !== getDateQuarter(date)) {
      return false;
    }

    return this.dateGreaterThanOrEqualTo(date);
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
