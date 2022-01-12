import { Event, Suite } from 'benchmark';
import { LedgerCollection } from '../src/ledger/ledger-collection';
import { LedgerItemType } from '../src/ledger/ledger-item-type';
import { LedgerItem } from '../src/ledger/ledger-item';
import { cloneDateUtc } from '../src/utils/data-clone-date';

describe('ledger collection performance tests', () => {
  let suite: Suite;
  let ledgerCollection: LedgerCollection;

  beforeEach(() => {
    suite = new Suite();
    ledgerCollection = new LedgerCollection();
  });

  afterEach(() => {
    suite.off();
    suite = null;
    ledgerCollection = null;
  });

  describe('and filter', () => {
    describe('and no ledger items', () => {
      test('should resolve fast', (done) => {
        suite
          .add('and no ledger items, should resolve fast', function () {
            ledgerCollection.filter();
          })
          .on('cycle', function (event: Event) {
            console.log(String(event.target));
            expect(event.target.hz).toBeGreaterThanOrEqual(200000);
            done();
          })
          .run();
      }, 7000);
    });
    describe('and 600 ledger items', () => {
      test('should resolve high', (done) => {
        for (let i = 0; i < 100; i++) {
          ledgerCollection.add(new LedgerItem(i + 1, LedgerItemType.Misc, cloneDateUtc(new Date())));
          ledgerCollection.add(new LedgerItem(i + 1, LedgerItemType.CashFlow, cloneDateUtc(new Date())));
          ledgerCollection.add(new LedgerItem(i + 1, LedgerItemType.Salary, cloneDateUtc(new Date())));
          ledgerCollection.add(new LedgerItem(i + 1, LedgerItemType.Saved, cloneDateUtc(new Date())));
          ledgerCollection.add(new LedgerItem(i + 1, LedgerItemType.Purchase, cloneDateUtc(new Date())));
          ledgerCollection.add(new LedgerItem(i + 1, LedgerItemType.Equity, cloneDateUtc(new Date())));
        }

        suite
          .add('and 600 ledger items, should resolve high', function () {
            ledgerCollection.filter();
          })
          .on('cycle', function (event: Event) {
            console.log(String(event.target));
            expect(event.target.hz).toBeGreaterThanOrEqual(9000);
            done();
          })
          .run();
      }, 7000);
    });
  });
});
