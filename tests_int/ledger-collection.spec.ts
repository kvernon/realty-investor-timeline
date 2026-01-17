import { cloneDateUtc, LedgerCollection, LedgerItem, LedgerItemType } from '../src';

describe('LedgerCollection', () => {
  const year = 2026;
  const started = new Date(Date.UTC(2026, 0, 1));
  let ended = new Date();
  const months = 12;
  const amountMisc = 10;
  const amountCashFlow = 100;
  const amountEquity = 1000;
  const amountPurchase = 10000;
  const amountSaved = 100000;

  let collection: LedgerCollection;

  beforeEach(() => {
    collection = new LedgerCollection();
    const maxYears = [2025, year];

    for (let y = 0; y < maxYears.length; y++) {
      for (let i = 0; i < months; i++) {
        ended = cloneDateUtc(started, (date) => {
          date.setUTCFullYear(maxYears[y]);
          date.setUTCMonth(date.getUTCMonth() + i);
        });

        collection.add([
          new LedgerItem(amountMisc, LedgerItemType.Misc, ended),
          new LedgerItem(amountCashFlow, LedgerItemType.CashFlow, ended),
          new LedgerItem(amountEquity, LedgerItemType.Equity, ended),
          new LedgerItem(amountPurchase, LedgerItemType.Purchase, ended),
          new LedgerItem(amountSaved, LedgerItemType.Saved, ended),
        ]);
      }
    }
  });

  test('should have summary data', () => {
    expect(collection.getSummaryAnnual(ended.getUTCFullYear())).toEqual({
      date: started,
      averageCashFlow: amountCashFlow,
      averageQuarterlyCashFlow: amountCashFlow,
      balance: (amountMisc + amountCashFlow + amountEquity + amountPurchase + amountSaved) * months * 2,
      cashFlow: amountCashFlow * months,
      equity: amountEquity * months,
      purchases: amountPurchase * months,
    });
  });
});
