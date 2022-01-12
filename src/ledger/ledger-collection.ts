import { LedgerItem } from './ledger-item';
import itiriri, { IterableQuery } from 'itiriri';
import { ILedgerSummary } from './i-ledger-summary';
import { LedgerItemType } from './ledger-item-type';
import { IRentalPropertyEntity, PropertyType } from '../properties';
import currency from '../formatters/currency';
import { cloneDateUtc } from '../utils/data-clone-date';
import { differenceInMonths } from 'date-fns';

export interface ILedgerCollection {
  getBalance(date?: Date): number;

  filter(pred?: LedgerItemPredicate): LedgerItem[];

  add(item: LedgerItem | Iterable<LedgerItem>): void;

  getCashFlowMonth(date: Date): number;

  getMinimumSavings(properties: IRentalPropertyEntity[], date: Date, minMonthsRequired?: number): number;

  hasMinimumSavings(properties: IRentalPropertyEntity[], date: Date, minMonthsRequired?: number): boolean;

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

  isEmpty(): boolean {
    return this.collection.length() === 0;
  }

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

  hasMinimumSavings(properties: IRentalPropertyEntity[], date: Date, minMonthsRequired = 6): boolean {
    return this.getBalance(date) >= this.getMinimumSavings(properties, date, minMonthsRequired);
  }

  getCashFlowMonth(date: Date): number {
    if (!date) {
      throw new Error('no date supplied');
    }

    if (this.isEmpty()) {
      return 0;
    }

    const boundary = this.filter((li) => li.dateMatchesYearAndMonth(date ?? this.collection.last().created));

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

  clone(): ILedgerCollection {
    const ledgerCollection = new LedgerCollection();
    ledgerCollection.add(this.collection.map((x) => x.clone()));
    return ledgerCollection;
  }
}
