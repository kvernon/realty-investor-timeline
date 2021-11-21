import { LedgerItem } from './ledger-item';
import itiriri, { IterableQuery } from 'itiriri';
import { ILedgerSummary } from './i-ledger-summary';
import { LedgerItemType } from './ledger-item-type';
import { IRentalSavings, RentalSingleFamily } from '../properties';
import currency from '../formatters/currency';
import { cloneDateUtc } from '../utils/data-clone-date';
import { differenceInMonths } from 'date-fns';

export interface ILedgerCollection {
  getBalance(date: Date): number;

  add(item: LedgerItem | Iterable<LedgerItem>): void;

  getCashFlowMonth(date: Date): number;

  getMinimumSavings(date: Date, properties: IRentalSavings[], minMonthsRequired?: number): number;

  hasMinimumSavings(date: Date, properties: IRentalSavings[], minMonthsRequired?: number): boolean;

  getSummaryMonth(date: Date): ILedgerSummary;

  getSummaryAnnual(year: number): ILedgerSummary;

  getSummariesAnnual(year: number): ILedgerSummary[];

  clone(): ILedgerCollection;
}

export type LedgerItemPredicate = (x: LedgerItem, index: number) => boolean;

export class LedgerCollection implements ILedgerCollection {
  private collection: IterableQuery<LedgerItem>;

  private getSummaryByType(collection: IterableQuery<LedgerItem>, type: LedgerItemType): number {
    if (!collection) {
      return 0;
    }

    return collection.filter((x) => x.typeMatches(type)).sum((x) => x.amount) || 0;
  }

  constructor() {
    this.collection = itiriri([]);
  }

  filter(pred: LedgerItemPredicate): LedgerItem[] {
    return this.collection.filter(pred).toArray();
  }

  getBalance(date: Date): number {
    return this.isEmpty()
      ? 0
      : this.collection.filter((i) => i.created.getTime() <= date.getTime()).sum((x) => x.amount);
  }

  add(item: LedgerItem | Iterable<LedgerItem>): void {
    this.collection = itiriri(this.collection.prepend(item).toArray());
  }

  first?(): LedgerItem {
    if (this.isEmpty()) {
      return null;
    }

    return this.collection.first();
  }

  last?(): LedgerItem {
    if (this.isEmpty()) {
      return null;
    }

    return this.collection.last();
  }

  isEmpty(): boolean {
    return this.collection.length() === 0;
  }

  getMinimumSavings(date: Date, properties: IRentalSavings[], minMonthsRequired = 6): number {
    if (!date) {
      throw new Error('no date supplied');
    }

    if (!properties || !properties.length) {
      return 0;
    }

    return (
      itiriri(properties.filter((p) => p instanceof RentalSingleFamily)).sum((r) =>
        (<RentalSingleFamily>r).getMonthlyPrincipalInterestTaxInterestByDate(date)
      ) * minMonthsRequired
    );
  }

  hasMinimumSavings(date: Date, properties: IRentalSavings[], minMonthsRequired = 6): boolean {
    return this.getBalance(date) >= this.getMinimumSavings(date, properties, minMonthsRequired);
  }

  getCashFlowMonth(date: Date): number {
    if (!date) {
      throw new Error('no date supplied');
    }

    if (this.isEmpty()) {
      return 0;
    }

    const boundary = this.collection.filter((li) => li.dateMatchesYearAndMonth(date));

    if (boundary.length() === 0) {
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

    const boundary = this.collection.filter((li) => li.dateMatchesYearAndMonth(date));

    if (!boundary) {
      return result;
    }

    result.cashFlow = this.getSummaryByType(boundary, LedgerItemType.CashFlow);
    result.averageCashFlow = currency(
      boundary.filter((x) => x.type === LedgerItemType.CashFlow).average((x) => x.amount) || 0
    );
    result.equity = this.getSummaryByType(boundary, LedgerItemType.Equity);
    result.purchases = this.getSummaryByType(boundary, LedgerItemType.Purchase);
    result.purchases = this.getSummaryByType(boundary, LedgerItemType.Purchase);
    result.balance = this.collection.filter((li) => li.dateNotGreaterThan(date)).sum((x) => x.amount) || 0;

    return result;
  }

  getSummaryAnnual(year: number): ILedgerSummary {
    const summaries = itiriri(this.getSummariesAnnual(year));

    if (summaries.length() === 0) {
      return {
        date: null,
        balance: 0,
        cashFlow: 0,
        averageCashFlow: 0,
        equity: 0,
        purchases: 0,
      };
    }

    const cashFlowSum = summaries.sum((x) => x.cashFlow || 0);

    return {
      date: summaries.first().date,
      balance: summaries.last().balance,
      equity: summaries.sum((x) => x.equity || 0),
      cashFlow: cashFlowSum,
      averageCashFlow: currency(cashFlowSum / summaries.length()),
      purchases: summaries.sum((x) => x.purchases || 0),
    };
  }

  getSummariesAnnual(year: number): ILedgerSummary[] {
    if (!year) {
      throw new Error('year is missing');
    }

    if (this.isEmpty()) {
      return [];
    }

    const boundary = this.collection.filter((li) => li.dateMatchesYear(year));

    if (!boundary) {
      return [];
    }

    const collection = [];

    //need to determine monthDiff between boundary
    const totalMonths = differenceInMonths(boundary.first().created, boundary.last().created);

    if (totalMonths === 0) {
      collection.push(this.getSummaryMonth(boundary.first().created));
    } else {
      for (let month = boundary.first().created.getUTCMonth(); month < 12; month++) {
        collection.push(this.getSummaryMonth(new Date(Date.UTC(year, month, 1))));
      }
    }

    return collection; //?
  }

  clone(): ILedgerCollection {
    const ledgerCollection = new LedgerCollection();
    ledgerCollection.add(this.collection.map((x) => x.clone()));
    return ledgerCollection;
  }
}
