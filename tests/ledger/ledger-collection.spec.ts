jest.mock('../../src/properties/rental-single-family');
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { LedgerCollection } from '../../src/ledger/ledger-collection';
import { LedgerItem } from '../../src/ledger/ledger-item';
import { LedgerItemType } from '../../src/ledger/ledger-item-type';

describe('LedgerCollection unit tests', () => {
  let instance: LedgerCollection;
  let date: Date;
  let dateUtc: Date;

  beforeEach(() => {
    instance = new LedgerCollection();
    date = new Date();
    dateUtc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
  });

  afterEach(() => {
    instance = null;
  });

  describe('and isEmpty', () => {
    test('should be true', () => {
      expect(instance.isEmpty()).toBeTruthy();
    });
    test('should be false', () => {
      instance.add(new LedgerItem());
      expect(instance.isEmpty()).toBeFalsy();
    });
  });
  describe('and first', () => {
    test('should be null', () => {
      expect(instance.first()).toBeNull();
    });
    test('should be false', () => {
      const expected = new LedgerItem();
      expected.amount = 3;

      const last = new LedgerItem();
      instance.add([expected, last]);

      expect(instance.first()).toEqual(expected);
    });
  });
  describe('and last', () => {
    test('should be null', () => {
      expect(instance.last()).toBeNull();
    });
    test('should be false', () => {
      const first = new LedgerItem();
      first.amount = 3;

      const expected = new LedgerItem();
      expected.amount = 33333;

      instance.add([first, expected]);

      expect(instance.last()).toEqual(expected);
    });
  });
  describe('and getBalance', () => {
    test('should be zero', () => {
      expect(instance.getBalance(new Date())).toEqual(0);
    });

    describe('and collection populated', () => {
      test('should be total', () => {
        const expected = 8;

        const item = new LedgerItem();
        item.created = new Date();
        item.amount = expected;
        instance.add(item);

        expect(instance.getBalance(item.created)).toEqual(expected);
      });
    });

    describe('and collection populated 2', () => {
      test('should be total', () => {
        const expected = 8;

        const item = new LedgerItem();
        item.created = new Date();
        item.amount = expected;

        const item2 = new LedgerItem();
        item2.created = new Date();
        item2.amount = expected;
        instance.add([item, item2]);

        expect(instance.getBalance(item.created)).toEqual(expected * 2);
      });
    });

    describe('and collection populated 3', () => {
      test('should be total', () => {
        const expected = 8;

        const item = new LedgerItem();
        item.created = new Date();
        item.amount = expected;

        const purchase = new LedgerItem();
        purchase.created = new Date();
        purchase.type = LedgerItemType.Purchase;
        purchase.amount = expected * -1;
        instance.add([item, purchase]);

        expect(instance.getBalance(item.created)).toEqual(0);
      });
    });
  });
  describe('and getSummaryMonth', () => {
    describe('and no date', () => {
      test('should throw', () => {
        expect(() => instance.getSummaryMonth(null)).toThrow('no date supplied');
      });
    });
    describe('and no ledgerItem', () => {
      test('should return empty data', () => {
        const dateUtc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

        expect(instance.getSummaryMonth(date)).toEqual({
          date: dateUtc,
          balance: 0,
          cashFlow: 0,
          averageCashFlow: 0,
          equity: 0,
          purchases: 0,
        });
      });
    });
    describe('and ledgerItems', () => {
      test('should return empty data', () => {
        const cashFlow = new LedgerItem();
        const createdDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

        cashFlow.created = createdDate;
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        const cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = createdDate;
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 2);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        const equity = new LedgerItem();
        equity.created = createdDate;
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        const purchase = new LedgerItem();
        purchase.created = createdDate;
        purchase.amount = 3;
        purchase.type = LedgerItemType.Purchase;

        const salary = new LedgerItem();
        salary.created = createdDate;
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;

        instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);

        expect(instance.getSummaryMonth(createdDate)).toEqual({
          date: createdDate,
          balance: cashFlow.amount + cashFlowTwo.amount + equity.amount + salary.amount - purchase.amount,
          cashFlow: cashFlow.amount + cashFlowTwo.amount,
          averageCashFlow: (cashFlow.amount + cashFlowTwo.amount) / 2,
          equity: equity.amount,
          purchases: purchase.amount,
        });
      });
    });
  });
  describe('and getCashFlowMonth', () => {
    describe('and no date', () => {
      test('should throw error', () => {
        expect(() => instance.getCashFlowMonth(null)).toThrow('no date supplied');
      });
    });
    describe('and no ledgerItem', () => {
      test('should return empty data', () => {
        expect(instance.getCashFlowMonth(dateUtc)).toEqual(0);
      });
    });
    describe('and ledgerItems', () => {
      test('should return empty data', () => {
        const createdDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

        const cashFlow = new LedgerItem();
        cashFlow.created = createdDate;
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        const cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = createdDate;
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 2);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        const equity = new LedgerItem();
        equity.created = createdDate;
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        const purchase = new LedgerItem();
        purchase.created = createdDate;
        purchase.amount = 3;
        purchase.type = LedgerItemType.Purchase;

        const salary = new LedgerItem();
        salary.created = createdDate;
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;

        instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);

        expect(instance.getCashFlowMonth(createdDate)).toEqual(cashFlow.amount + cashFlowTwo.amount);
      });

      test('and no matching dates', () => {
        const createdDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 2);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        instance.add([cashFlowOut]);

        expect(instance.getCashFlowMonth(createdDate)).toEqual(0);
      });
    });
  });
  describe('and getSummariesAnnual', () => {
    describe('and no date', () => {
      test('should throw error', () => {
        expect(() => instance.getSummariesAnnual(null)).toThrow('year is missing');
      });
    });
    describe('and no ledgerItem', () => {
      test('should return empty data', () => {
        expect(instance.getSummariesAnnual(date.getUTCFullYear())).toEqual([]);
      });
    });
    describe('and ledgerItem', () => {
      test('should return empty data', () => {
        const cashFlow = new LedgerItem();
        const createdDate = new Date();
        createdDate.setDate(1);

        cashFlow.created = createdDate;
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        const cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = createdDate;
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 2);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        const equity = new LedgerItem();
        equity.created = createdDate;
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        const purchase = new LedgerItem();
        purchase.created = createdDate;
        purchase.amount = 3;
        purchase.type = LedgerItemType.Purchase;

        const salary = new LedgerItem();
        salary.created = createdDate;
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;

        instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);

        expect(instance.getSummariesAnnual(createdDate.getUTCFullYear())).toEqual([
          {
            date: new Date(Date.UTC(createdDate.getUTCFullYear(), createdDate.getUTCMonth(), 1)),
            balance: cashFlow.amount + cashFlowTwo.amount + equity.amount + salary.amount - purchase.amount,
            cashFlow: cashFlow.amount + cashFlowTwo.amount,
            averageCashFlow: (cashFlow.amount + cashFlowTwo.amount) / 2,
            equity: equity.amount,
            purchases: purchase.amount,
          },
          {
            averageCashFlow: 0,
            balance: 0,
            cashFlow: 0,
            date: new Date(Date.UTC(createdDate.getUTCFullYear(), createdDate.getUTCMonth() + 1, 1)),
            equity: 0,
            purchases: 0,
          },
        ]);
      });
    });
  });
  describe('and hasMinimumSavings', () => {
    describe('and has no ledger items', () => {
      describe('and has no properties', () => {
        test('should be truthy', () => {
          expect(instance.hasMinimumSavings(dateUtc, [])).toBeTruthy();
        });
        describe('and has properties', () => {
          test('should be falsy', () => {
            const singleFamily: jest.Mocked<RentalSingleFamily> =
              new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
            singleFamily.getMonthlyPrincipalInterestTaxInterestByDate.mockReturnValueOnce(3);

            expect(instance.hasMinimumSavings(dateUtc, [singleFamily])).toBeFalsy();
          });
        });
      });
    });
    describe('and has ledger items', () => {
      let ledgerItem: LedgerItem;

      beforeEach(() => {
        ledgerItem = new LedgerItem();
        ledgerItem.created = dateUtc;
        ledgerItem.amount = 3;
        ledgerItem.type = LedgerItemType.CashFlow;

        instance.add(ledgerItem);
      });

      describe('and has no properties', () => {
        test('should be truthy', () => {
          expect(instance.hasMinimumSavings(dateUtc, [])).toBeTruthy();
        });
        describe('and has properties', () => {
          describe('balance less', () => {
            test('should be falsy', () => {
              const singleFamily: jest.Mocked<RentalSingleFamily> =
                new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
              singleFamily.getMonthlyPrincipalInterestTaxInterestByDate.mockReturnValueOnce(ledgerItem.amount * 2);

              expect(instance.hasMinimumSavings(dateUtc, [singleFamily])).toBeFalsy();
            });
          });
          describe('balance more', () => {
            test('should be truthy', () => {
              const singleFamily: jest.Mocked<RentalSingleFamily> =
                new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;

              const monthsToSave = 6;
              singleFamily.getMonthlyPrincipalInterestTaxInterestByDate.mockReturnValueOnce(
                ledgerItem.amount / 2 / monthsToSave
              );

              expect(instance.hasMinimumSavings(dateUtc, [singleFamily], monthsToSave)).toBeTruthy();
            });
          });
        });
      });
    });
  });
  describe('and getMinimumSavings', () => {
    describe('and no date', () => {
      test('should throw error', () => {
        expect(() => instance.getMinimumSavings(null, [])).toThrow('no date supplied');
      });
    });
    describe('and has no ledger items', () => {
      describe('and has no properties', () => {
        test('should be truthy', () => {
          expect(instance.getMinimumSavings(dateUtc, [])).toEqual(0);
        });
        describe('and has properties', () => {
          test('should be falsy', () => {
            const singleFamily: jest.Mocked<RentalSingleFamily> =
              new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
            singleFamily.getMonthlyPrincipalInterestTaxInterestByDate.mockReturnValueOnce(3);

            expect(instance.getMinimumSavings(dateUtc, [singleFamily])).toEqual(3 * 6);
          });
        });
      });
    });
    describe('and has ledger items', () => {
      let ledgerItem: LedgerItem;

      beforeEach(() => {
        ledgerItem = new LedgerItem();
        ledgerItem.created = dateUtc;
        ledgerItem.amount = 3;
        ledgerItem.type = LedgerItemType.CashFlow;

        instance.add(ledgerItem);
      });

      describe('and has no properties', () => {
        test('should be truthy', () => {
          expect(instance.getMinimumSavings(dateUtc, [])).toEqual(0);
        });
        describe('and has properties', () => {
          describe('balance less', () => {
            test('should be falsy', () => {
              const singleFamily: jest.Mocked<RentalSingleFamily> =
                new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
              const piti = ledgerItem.amount * 2;
              singleFamily.getMonthlyPrincipalInterestTaxInterestByDate.mockReturnValueOnce(piti);

              expect(instance.getMinimumSavings(dateUtc, [singleFamily])).toEqual(piti * 6);
            });
          });
        });
      });
    });
  });
  describe('and getSummaryAnnual', () => {
    describe('and no ledgerItem', () => {
      test('should return empty data', () => {
        expect(instance.getSummaryAnnual(date.getUTCFullYear())).toEqual({
          date: null,
          balance: 0,
          cashFlow: 0,
          averageCashFlow: 0,
          equity: 0,
          purchases: 0,
        });
      });
    });
    describe('and ledgerItem', () => {
      test('should return empty data', () => {
        const cashFlow = new LedgerItem();
        const createdDate = new Date();
        createdDate.setDate(1);

        cashFlow.created = createdDate;
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        const cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = createdDate;
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 2);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        const equity = new LedgerItem();
        equity.created = createdDate;
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        const purchase = new LedgerItem();
        purchase.created = createdDate;
        purchase.amount = 3;
        purchase.type = LedgerItemType.Purchase;

        const salary = new LedgerItem();
        salary.created = createdDate;
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;

        instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);

        expect(instance.getSummaryAnnual(createdDate.getUTCFullYear())).toEqual({
          date: new Date(Date.UTC(createdDate.getUTCFullYear(), createdDate.getUTCMonth(), 1)),
          balance: 7,
          cashFlow: 4,
          averageCashFlow: 2,
          equity: equity.amount,
          purchases: 3,
        });
      });
    });
  });
});
