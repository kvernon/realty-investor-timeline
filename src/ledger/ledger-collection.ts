import { LedgerItem } from './ledger-item';
import itiriri, { IterableQuery } from 'itiriri';
import { ILedgerSummary } from './i-ledger-summary';
import { LedgerItemType } from './ledger-item-type';
import { IRentalPropertyEntity, PropertyType } from '../properties';
import currency from '../formatters/currency';
import { cloneDateUtc } from '../utils/data-clone-date';
import { differenceInMonths } from 'date-fns';

export interface ILedgerCollection {
  /**
   * the total balance in the ledger collection
   * @param date
   */
  getBalance(date?: Date): number;

  filter(pred?: LedgerItemPredicate): LedgerItem[];

  add(item: LedgerItem | Iterable<LedgerItem>): void;

  getCashFlowMonth(date?: Date): number;

  /**
   * This method gets the total of savings needed for all properties by x amount of months.
   * @example
   * Example, you typically need 6 months of month per single family home, so if you had 3 homes at 6 months and mortgage was $1000. It would be doing the following: `getMinimumSavings = 3 (SF) * $1000 (mort) * 6 (months) = $18,000`
   * @example
   * totals all properties getExpensesByDate * amount needed to save by month, so properties[].getExpensesByDate() * minMonthsRequired.
   * @param properties
   * @param date
   * @param minMonthsRequired
   */
  getMinimumSavings(properties: IRentalPropertyEntity[], date: Date, minMonthsRequired?: number): number;

  /**
   * determines if there is enough money in the account while forcing a hold on the {@link getMinimumSavings} amount.
   * @example
   * ```
   * hasMinimumSavings = getBalance >= getMinimumSavings
   * ```
   * @param properties
   * @param date
   * @param minMonthsRequired
   */
  hasMinimumSavings(properties: IRentalPropertyEntity[], date: Date, minMonthsRequired?: number): boolean;

  /**
   * used to get the cashFlow of all 12 months
   * @param year
   */
  getMonthlyCashFlowByYear(year?: number): number[];

  /**
   * used to get the average cash flow for the year.
   * @param date
   */
  getCashFlowYearAverage(date?: Date): number;

  getSummaryMonth(date: Date): ILedgerSummary;

  getSummaryAnnual(year?: number): ILedgerSummary;

  getSummariesAnnual(year?: number): ILedgerSummary[];

  /**
   * should be the total balance - savings for single family
   * @param date
   * @param properties
   * @param minMonthsRequired
   */
  getAvailableSavings(date: Date, properties: IRentalPropertyEntity[], minMonthsRequired?: number): number;

  getLatestLedgerItem(): LedgerItem | null;

  getLastLedgerMonth(): LedgerItem[];

  clone(): ILedgerCollection;
}

export type LedgerItemPredicate = (x: LedgerItem, index: number) => boolean;

export class LedgerCollection implements ILedgerCollection {
  private collection: IterableQuery<LedgerItem>;

  private getSummaryByType(collection: LedgerItem[], type: LedgerItemType): number {
    if (!collection) {
      return 0;
    }

    return collection
      .filter((x) => x.typeMatches(type))
      .reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0);
  }

  constructor() {
    this.collection = itiriri([]);
  }

  filter(pred?: LedgerItemPredicate): LedgerItem[] {
    const dateTypeSort = (element1: LedgerItem, element2: LedgerItem) => {
      return element1.created.getTime() - element2.created.getTime();
    };

    if (pred) {
      return itiriri(this.collection).filter(pred).sort(dateTypeSort).toArray();
    }

    return itiriri(this.collection).sort(dateTypeSort).toArray();
  }

  /**
   * the total balance in the ledger collection
   * @param date
   */
  getBalance(date?: Date): number {
    if (this.isEmpty()) {
      return 0;
    }
    return this.filter((i) => (date ? i.created.getTime() <= date.getTime() : !!i)).reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0
    );
  }

  add(item: LedgerItem | Iterable<LedgerItem>): void {
    this.collection = itiriri(this.collection.prepend(item).toArray());
  }

  /**
   * is the collection empty?
   */
  isEmpty(): boolean {
    return this.collection.length() === 0;
  }

  /**
   * This method gets the total of savings needed for all properties by x amount of months.
   * @example
   * Example, you typically need 6 months of month per single family home, so if you had 3 homes at 6 months and mortgage was $1000. It would be doing the following: `getMinimumSavings = 3 (SF) * $1000 (mort) * 6 (months) = $18,000`
   * @example
   * totals all properties getExpensesByDate * amount needed to save by month, so properties[].getExpensesByDate() * minMonthsRequired.
   * @param properties
   * @param date
   * @param minMonthsRequired
   */
  getMinimumSavings(properties: IRentalPropertyEntity[], date: Date, minMonthsRequired = 6): number {
    if (!date) {
      throw new Error('no date supplied');
    }

    if (!properties || !properties.length) {
      return 0;
    }

    return (
      itiriri(properties.filter((p) => p.propertyType === PropertyType.SingleFamily)).sum((r) =>
        r.getExpensesByDate(date ?? this.collection.last().created)
      ) * minMonthsRequired || 0
    );
  }

  /**
   * determines if there is enough money in the account while forcing a hold on the {@link getMinimumSavings} amount.
   * @example
   * ```
   * hasMinimumSavings = getBalance >= getMinimumSavings
   * ```
   * @param properties
   * @param date
   * @param minMonthsRequired
   */
  hasMinimumSavings(properties: IRentalPropertyEntity[], date: Date, minMonthsRequired = 6): boolean {
    return this.getBalance(date) >= this.getMinimumSavings(properties, date, minMonthsRequired);
  }

  getAverageByType(collection: LedgerItem[], type: LedgerItemType): number {
    return this.getSummaryByType(collection, type) / collection.filter((x) => x.typeMatches(type)).length;
  }

  getMonthlyCashFlowByYear(year?: number): number[] {
    const cashFlowByMonthForYear = new Array<number>(12).fill(0);

    if (this.isEmpty()) {
      return cashFlowByMonthForYear;
    }

    return cashFlowByMonthForYear.map((x, i) => {
      const date = new Date(Date.UTC(year, i, 1));
      return this.getCashFlowMonth(date);
    });
  }

  /**
   * used to get the average cash flow for the year.
   * @param date
   */
  getCashFlowYearAverage(date?: Date): number {
    if (this.isEmpty()) {
      return 0;
    }

    if (!date) {
      date = this.collection.last().created;
    }

    const boundary = this.filter((li) => li.dateMatchesYear(date.getUTCFullYear()));

    if (boundary.length === 0) {
      return 0;
    }

    return this.getAverageByType(boundary, LedgerItemType.CashFlow);
  }

  getCashFlowMonth(date?: Date): number {
    if (this.isEmpty()) {
      return 0;
    }

    if (!date) {
      date = this.collection.last().created;
    }

    const boundary = this.filter((li) => li.dateMatchesYearAndMonth(date));

    if (boundary.length === 0) {
      return 0;
    }

    return this.getSummaryByType(boundary, LedgerItemType.CashFlow);
  }

  getSummaryMonth(date: Date): ILedgerSummary {
    if (!date) {
      throw new Error('no date supplied');
    }

    const result: ILedgerSummary = {
      date: cloneDateUtc(date),
      balance: 0,
      cashFlow: 0,
      averageCashFlow: 0,
      equity: 0,
      purchases: 0,
    };

    if (this.isEmpty()) {
      return result;
    }

    const boundary = this.filter((li) => li.dateMatchesYearAndMonth(date ?? this.collection.last().created));

    if (!boundary) {
      return result;
    }

    const ledgerItemsCashFlow = boundary.filter((x) => x.type === LedgerItemType.CashFlow);

    result.cashFlow = this.getSummaryByType(boundary, LedgerItemType.CashFlow);
    result.averageCashFlow = currency(
      ledgerItemsCashFlow.length > 0 ? result.cashFlow / ledgerItemsCashFlow.length : 0
    );
    result.equity = this.getSummaryByType(boundary, LedgerItemType.Equity);
    result.purchases = this.getSummaryByType(boundary, LedgerItemType.Purchase);
    result.balance = this.filter((li) => li.dateNotGreaterThan(date)).reduce(
      (previousValue, currentValue) => previousValue + currentValue.amount,
      0
    );

    return result;
  }

  getSummaryAnnual(year?: number): ILedgerSummary {
    const summaries = this.getSummariesAnnual(year);

    if (summaries.length === 0) {
      return {
        date: null,
        balance: 0,
        cashFlow: 0,
        averageCashFlow: 0,
        equity: 0,
        purchases: 0,
      };
    }

    const cashFlowSum = summaries.reduce((accumulator, current) => accumulator + current.cashFlow, 0);

    return {
      date: summaries[0].date,
      balance: summaries[summaries.length - 1].balance,
      equity: summaries.reduce((accumulator, current) => accumulator + current.equity, 0),
      cashFlow: cashFlowSum,
      averageCashFlow: currency(cashFlowSum / summaries.length),
      purchases: summaries.reduce((accumulator, current) => accumulator + current.purchases, 0),
    };
  }

  getSummariesAnnual(year?: number): ILedgerSummary[] {
    if (!year && this.collection.length() === 0) {
      throw new Error('year is missing');
    }

    if (this.isEmpty()) {
      return [];
    }

    const boundary = year ? this.filter((li) => li.dateMatchesYear(year)) : this.filter();

    if (!boundary) {
      return [];
    }

    const collection = [];
    const lastLedgerItem = boundary[boundary.length - 1];
    //need to determine monthDiff between boundary
    const totalMonths = differenceInMonths(boundary[0].created, lastLedgerItem.created);

    if (totalMonths === 0) {
      collection.push(this.getSummaryMonth(boundary[0].created));
    } else {
      for (let month = boundary[0].created.getUTCMonth(); month < 12; month++) {
        const expectedDate = new Date(Date.UTC(year, month, 1));
        if (
          !boundary.some((x) => x.dateMatchesYearAndMonth(expectedDate)) &&
          expectedDate.getTime() >= lastLedgerItem.created.getTime()
        ) {
          const summaryMonth = this.getSummaryMonth(lastLedgerItem.created);
          summaryMonth.date = cloneDateUtc(expectedDate);
          collection.push(summaryMonth);
        } else {
          collection.push(this.getSummaryMonth(expectedDate));
        }
      }
    }

    return collection;
  }

  /**
   * should be the total balance - savings for single family
   * @param date
   * @param properties
   * @param minMonthsRequired
   */
  getAvailableSavings(date: Date, properties: IRentalPropertyEntity[], minMonthsRequired = 6): number {
    return this.getBalance(date) - this.getMinimumSavings(properties, date, minMonthsRequired);
  }

  getLatestLedgerItem(): LedgerItem | null {
    if (this.isEmpty()) {
      return null;
    }

    return this.collection.first();
  }

  getLastLedgerMonth(): LedgerItem[] {
    const last = this.getLatestLedgerItem();

    if (!last) {
      return [];
    }

    return this.filter((li) => li.dateMatchesYearAndMonth(last.created));
  }

  clone(): ILedgerCollection {
    const ledgerCollection = new LedgerCollection();
    ledgerCollection.add(this.collection.map((x) => x.clone()));
    return ledgerCollection;
  }
}
