import { PropertyType } from '../../src/properties/property-type';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { cloneDateUtc } from '../../src/utils/data-clone-date';
import { LedgerCollection } from '../../src/ledger/ledger-collection';
import { LedgerItem } from '../../src/ledger/ledger-item';
import { LedgerItemType } from '../../src/ledger/ledger-item-type';
import currency from '../../src/formatters/currency';

jest.mock('../../src/properties/rental-single-family');

describe('LedgerCollection unit tests', () => {
  let instance: LedgerCollection;
  let dateUtc: Date;

  beforeEach(() => {
    instance = new LedgerCollection();
    dateUtc = cloneDateUtc(new Date());
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

    describe('and collection populated 4 mixed dates', () => {
      test('should be total', () => {
        const expected = 8;

        const item = new LedgerItem();
        item.created = cloneDateUtc(new Date());
        item.amount = expected;

        const itemOld = new LedgerItem();
        itemOld.created = cloneDateUtc(item.created, (date) => date.setUTCFullYear(date.getUTCFullYear() - 1));
        itemOld.amount = expected;

        const purchase = new LedgerItem();
        purchase.created = cloneDateUtc(item.created);
        purchase.type = LedgerItemType.Purchase;
        purchase.amount = expected * -1;
        instance.add([item, purchase, itemOld]);

        expect(instance.getBalance(item.created)).toEqual(expected);
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
        expect(instance.getSummaryMonth(dateUtc)).toEqual({
          date: dateUtc,
          balance: 0,
          cashFlow: 0,
          averageCashFlow: 0,
          averageQuarterlyCashFlow: 0,
          equity: 0,
          purchases: 0,
        });
      });
    });
    describe('and ledgerItems', () => {
      test('should return matching data', () => {
        const createdDate = cloneDateUtc(dateUtc);

        const cashFlow = new LedgerItem();
        cashFlow.created = cloneDateUtc(createdDate);
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        const cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = cloneDateUtc(createdDate);
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = cloneDateUtc(createdDate);
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 3);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        const equity = new LedgerItem();
        equity.created = cloneDateUtc(createdDate);
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        const purchase = new LedgerItem();
        purchase.created = cloneDateUtc(createdDate);
        purchase.amount = -3;
        purchase.type = LedgerItemType.Purchase;

        const salary = new LedgerItem();
        salary.created = cloneDateUtc(createdDate);
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;

        instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);

        expect(instance.getSummaryMonth(createdDate)).toEqual({
          date: cloneDateUtc(dateUtc),
          balance: cashFlow.amount + cashFlowTwo.amount + equity.amount + salary.amount + purchase.amount,
          cashFlow: cashFlow.amount + cashFlowTwo.amount,
          averageCashFlow: (cashFlow.amount + cashFlowTwo.amount) / 2,
          equity: equity.amount,
          purchases: purchase.amount,
          averageQuarterlyCashFlow: 4,
        });
      });
    });
  });
  describe('and getCashFlowMonth', () => {
    describe('and no date', () => {
      test('should return 0', () => {
        expect(instance.getCashFlowMonth(null)).toEqual(0);
      });
    });
    describe('and no ledgerItem', () => {
      test('should return empty data', () => {
        expect(instance.getCashFlowMonth(dateUtc)).toEqual(0);
      });
    });
    describe('and ledgerItems', () => {
      test('should return empty data', () => {
        const createdDate = new Date(Date.UTC(dateUtc.getUTCFullYear(), dateUtc.getUTCMonth(), 1));

        const cashFlow = new LedgerItem();
        cashFlow.created = cloneDateUtc(createdDate);
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        const cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = cloneDateUtc(createdDate);
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = new Date(Date.UTC(dateUtc.getUTCFullYear(), dateUtc.getUTCMonth(), 1));
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 2);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        const equity = new LedgerItem();
        equity.created = cloneDateUtc(createdDate);
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        const purchase = new LedgerItem();
        purchase.created = cloneDateUtc(createdDate);
        purchase.amount = -3;
        purchase.type = LedgerItemType.Purchase;

        const salary = new LedgerItem();
        salary.created = cloneDateUtc(createdDate);
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;

        instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);

        expect(instance.getCashFlowMonth(createdDate)).toEqual(cashFlow.amount + cashFlowTwo.amount);
      });

      test('and no matching dates', () => {
        const createdDate = new Date(Date.UTC(dateUtc.getUTCFullYear(), dateUtc.getUTCMonth(), 1));

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = new Date(Date.UTC(dateUtc.getUTCFullYear(), dateUtc.getUTCMonth(), 1));
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 2);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        instance.add([cashFlowOut]);

        expect(instance.getCashFlowMonth(createdDate)).toEqual(0);
      });
    });
  });
  describe('and getCashFlowQuarter', () => {
    describe('and no date', () => {
      test('should return 0', () => {
        expect(instance.getCashFlowQuarter(null)).toEqual(0);
      });
    });
    describe('and no ledgerItem', () => {
      test('should return empty data', () => {
        expect(instance.getCashFlowQuarter(dateUtc)).toEqual(0);
      });
    });
    describe('and ledgerItems', () => {
      let createdDate: Date;
      let cashFlow: LedgerItem;
      let cashFlowTwo: LedgerItem;
      let cashFlowThree: LedgerItem;
      let equity: LedgerItem;
      let salary: LedgerItem;

      beforeEach(() => {
        createdDate = new Date(Date.UTC(dateUtc.getUTCFullYear(), 0, 1));
        cashFlow = new LedgerItem();
        cashFlow.created = cloneDateUtc(createdDate);
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = cloneDateUtc(createdDate);
        cashFlowTwo.created.setUTCMonth(cashFlowTwo.created.getUTCMonth() + 1);
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        cashFlowThree = new LedgerItem();
        cashFlowThree.created = cloneDateUtc(createdDate);
        cashFlowThree.created.setUTCMonth(cashFlowThree.created.getUTCMonth() + 2);
        cashFlowThree.amount = 4;
        cashFlowThree.type = LedgerItemType.CashFlow;

        equity = new LedgerItem();
        equity.created = cloneDateUtc(createdDate);
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        salary = new LedgerItem();
        salary.created = cloneDateUtc(createdDate);
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;
      });

      describe('and in quarter', () => {
        describe('with data in every month', () => {
          test('should return that data', () => {
            instance.add([cashFlow, cashFlowTwo, cashFlowThree, equity, salary]);

            expect(instance.getCashFlowQuarter(cashFlowThree.created)).toEqual(cashFlow.amount + cashFlowTwo.amount + cashFlowThree.amount);
          });
        });

        describe('with data in first month', () => {
          test('should return empty data', () => {
            const equity = new LedgerItem();
            equity.created = cloneDateUtc(createdDate);
            equity.amount = 2;
            equity.type = LedgerItemType.Equity;

            const salary = new LedgerItem();
            salary.created = cloneDateUtc(createdDate);
            salary.amount = 4;
            salary.type = LedgerItemType.Salary;

            instance.add([cashFlow, equity, salary]);

            expect(instance.getCashFlowQuarter(createdDate)).toEqual(cashFlow.amount);
          });
        });

        describe('with data in first and second month', () => {
          test('should return empty data', () => {
            instance.add([cashFlow, cashFlowTwo, equity, salary]);

            expect(instance.getCashFlowQuarter(cashFlowTwo.created)).toEqual(cashFlow.amount + cashFlowTwo.amount);
          });
        });
      });

      describe('and outside of quarter', () => {
        test('and no matching dates', () => {
          const cashFlowOut = new LedgerItem();
          cashFlowOut.created = cloneDateUtc(createdDate);
          cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 4);
          cashFlowOut.amount = 111111;
          cashFlowOut.type = LedgerItemType.CashFlow;

          instance.add([cashFlowOut]);

          expect(instance.getCashFlowQuarter(createdDate)).toEqual(0);
        });
      });
    });
  });
  describe('and getAverageCashFlowMonthByQuarter', () => {
    describe('and no date', () => {
      test('should return 0', () => {
        expect(instance.getAverageCashFlowMonthByQuarter(null)).toEqual(0);
      });
    });
    describe('and no ledgerItem', () => {
      test('should return empty data', () => {
        expect(instance.getAverageCashFlowMonthByQuarter(dateUtc)).toEqual(0);
      });
    });
    describe('and ledgerItems', () => {
      let createdDate: Date;
      let cashFlow: LedgerItem;
      let cashFlowTwo: LedgerItem;
      let cashFlowThree: LedgerItem;

      beforeEach(() => {
        createdDate = new Date(Date.UTC(dateUtc.getUTCFullYear(), 0, 1));

        cashFlow = new LedgerItem();
        cashFlow.created = cloneDateUtc(createdDate);
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = new Date(Date.UTC(createdDate.getUTCFullYear(), createdDate.getUTCMonth() + 1, 1));
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        cashFlowThree = new LedgerItem();
        cashFlowThree.created = new Date(Date.UTC(createdDate.getUTCFullYear(), createdDate.getUTCMonth() + 2, 1));
        cashFlowThree.amount = 4;
        cashFlowThree.type = LedgerItemType.CashFlow;
      });

      test('should return empty data', () => {
        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = cloneDateUtc(createdDate);
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 4);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        const equity = new LedgerItem();
        equity.created = cloneDateUtc(createdDate);
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        const purchase = new LedgerItem();
        purchase.created = cloneDateUtc(createdDate);
        purchase.amount = -3;
        purchase.type = LedgerItemType.Purchase;

        const salary = new LedgerItem();
        salary.created = cloneDateUtc(createdDate);
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;

        instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);

        expect(instance.getAverageCashFlowMonthByQuarter(cashFlowTwo.created)).toEqual((cashFlow.amount + cashFlowTwo.amount) / 2);
      });

      test('and no matching dates', () => {
        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = cloneDateUtc(createdDate);
        cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth() + 4);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        instance.add([cashFlowOut]);

        expect(instance.getAverageCashFlowMonthByQuarter(createdDate)).toEqual(0);
      });

      describe('and ledgerItems', () => {
        describe('and in quarter', () => {
          describe('with data in every month', () => {
            test('should return that data', () => {
              instance.add([cashFlow, cashFlowTwo, cashFlowThree]);

              const expected = currency((cashFlow.amount + cashFlowTwo.amount + cashFlowThree.amount) / 3);
              expect(instance.getAverageCashFlowMonthByQuarter(cashFlowThree.created)).toEqual(expected);
            });
          });
          describe('with data in first month', () => {
            test('should return empty data', () => {
              instance.add([cashFlow]);

              expect(instance.getAverageCashFlowMonthByQuarter(createdDate)).toEqual(cashFlow.amount);
            });
          });
          describe('with data in first and second month', () => {
            test('should return empty data', () => {
              instance.add([cashFlow, cashFlowTwo]);

              expect(instance.getAverageCashFlowMonthByQuarter(cashFlowTwo.created)).toEqual((cashFlow.amount + cashFlowTwo.amount) / 2);
            });
          });
        });
      });
    });
  });
  describe('and getCashFlowYearAverage', () => {
    describe('and no date', () => {
      test('should return 0', () => {
        expect(instance.getCashFlowYearAverage(null)).toEqual(0);
      });
    });
    describe('and no ledgerItem', () => {
      test('should return empty data', () => {
        expect(instance.getCashFlowYearAverage(dateUtc)).toEqual(0);
      });
    });
    describe('and ledgerItems', () => {
      describe('with matches', () => {
        let createdDate: Date;
        let cashFlow: LedgerItem;
        let cashFlowTwo: LedgerItem;

        beforeEach(() => {
          createdDate = new Date(Date.UTC(dateUtc.getUTCFullYear() + 1, 0, 1));

          cashFlow = new LedgerItem();
          cashFlow.created = cloneDateUtc(createdDate);
          cashFlow.amount = 1;
          cashFlow.type = LedgerItemType.CashFlow;

          cashFlowTwo = new LedgerItem();
          cashFlowTwo.created = cloneDateUtc(createdDate);
          cashFlowTwo.amount = 3;
          cashFlowTwo.type = LedgerItemType.CashFlow;

          const cashFlowOut = new LedgerItem();
          cashFlowOut.created = new Date(Date.UTC(createdDate.getUTCFullYear() + 4, createdDate.getUTCMonth(), 1));
          cashFlowOut.created.setUTCMonth(cashFlowOut.created.getUTCMonth());
          cashFlowOut.amount = 111111;
          cashFlowOut.type = LedgerItemType.CashFlow;

          const equity = new LedgerItem();
          equity.created = cloneDateUtc(createdDate);
          equity.amount = 2;
          equity.type = LedgerItemType.Equity;

          const purchase = new LedgerItem();
          purchase.created = cloneDateUtc(createdDate);
          purchase.amount = -3;
          purchase.type = LedgerItemType.Purchase;

          const salary = new LedgerItem();
          salary.created = cloneDateUtc(createdDate);
          salary.amount = 4;
          salary.type = LedgerItemType.Salary;

          instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);
        });

        describe('with date', () => {
          test('should return average result', () => {
            expect(instance.getCashFlowYearAverage()).toEqual((cashFlow.amount + cashFlowTwo.amount) / 2);
          });
        });
      });

      test('and no matching dates', () => {
        const createdDate = new Date(Date.UTC(dateUtc.getUTCFullYear() + 1, dateUtc.getUTCMonth(), 1));

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = new Date(Date.UTC(dateUtc.getUTCFullYear(), dateUtc.getUTCMonth(), 1));
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        instance.add([cashFlowOut]);

        expect(instance.getCashFlowYearAverage(createdDate)).toEqual(0);
      });
    });
  });
  describe('and getMonthlyCashFlowByYear', () => {
    describe('no data', () => {
      test('should be all zeros', () => {
        const ledger = new LedgerCollection();
        expect(ledger.getMonthlyCashFlowByYear()).toEqual(new Array(12).fill(0));
      });
    });

    describe('and partial data', () => {
      test('should be all zeros', () => {
        const date = new Date(2025, 0, 1);

        const ledger = new LedgerCollection();
        ledger.add(new LedgerItem(1, LedgerItemType.CashFlow, date));

        expect(ledger.getMonthlyCashFlowByYear(date.getFullYear())).toEqual([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      });
    });

    describe('and all data', () => {
      test('should be all zeros', () => {
        const date = new Date(2025, 0, 1);
        const expected = [];
        const ledger = new LedgerCollection();
        for (let i = 0; i < 12; i++) {
          expected.push(i + 1);
          ledger.add(new LedgerItem(i + 1, LedgerItemType.CashFlow, new Date(date.getFullYear(), i, 1)));
        }

        expect(ledger.getMonthlyCashFlowByYear(date.getFullYear())).toEqual(expected);
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
        expect(instance.getSummariesAnnual(dateUtc.getUTCFullYear())).toEqual([]);
      });
    });
    describe('and ledgerItems', () => {
      test('should be empty', () => {
        const createdDate = new Date();
        createdDate.setDate(1);
        createdDate.setUTCMonth(createdDate.getUTCMonth() + 1);

        const cashFlow = new LedgerItem();
        cashFlow.created = cloneDateUtc(dateUtc);
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;
        instance.add(cashFlow);

        expect(instance.getSummariesAnnual(createdDate.getUTCFullYear() + 1)).toEqual([]);
      });

      test('should return empty data', () => {
        const cashFlow = new LedgerItem();
        const createdDate = new Date();
        createdDate.setDate(1);

        cashFlow.created = cloneDateUtc(dateUtc);
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        const cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = cloneDateUtc(dateUtc);
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = cloneDateUtc(dateUtc);
        cashFlowOut.created.setUTCFullYear(cashFlowOut.created.getUTCFullYear() + 2);
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        const equity = new LedgerItem();
        equity.created = cloneDateUtc(dateUtc);
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        const purchase = new LedgerItem();
        purchase.created = cloneDateUtc(dateUtc);
        purchase.amount = -3;
        purchase.type = LedgerItemType.Purchase;

        const salary = new LedgerItem();
        salary.created = cloneDateUtc(dateUtc);
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;

        instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);

        expect(instance.getSummariesAnnual(createdDate.getUTCFullYear())).toEqual([
          {
            date: cloneDateUtc(dateUtc),
            balance: 7,
            cashFlow: cashFlow.amount + cashFlowTwo.amount,
            averageCashFlow: (cashFlow.amount + cashFlowTwo.amount) / 2,
            equity: equity.amount,
            purchases: purchase.amount,
            averageQuarterlyCashFlow: cashFlow.amount + cashFlowTwo.amount,
          },
        ]);
      });
    });
  });
  describe('and hasMinimumSavings', () => {
    describe('and has no ledger items', () => {
      describe('and has no properties', () => {
        test('should be truthy', () => {
          expect(instance.hasMinimumSavings([], dateUtc)).toBeTruthy();
        });
        describe('and has properties', () => {
          test('should be falsy', () => {
            const singleFamily: jest.Mocked<RentalSingleFamily> = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
            singleFamily.getExpensesByDate.mockReturnValueOnce(3);
            Object.defineProperty(singleFamily, 'propertyType', {
              value: PropertyType.SingleFamily,
            });
            expect(instance.hasMinimumSavings([singleFamily], dateUtc)).toBeFalsy();
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
          expect(instance.hasMinimumSavings([], dateUtc)).toBeTruthy();
        });
        describe('and has properties', () => {
          describe('balance less', () => {
            test('should be falsy', () => {
              const singleFamily: jest.Mocked<RentalSingleFamily> = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
              singleFamily.getExpensesByDate.mockReturnValueOnce(ledgerItem.amount * 2);

              Object.defineProperty(singleFamily, 'propertyType', {
                value: PropertyType.SingleFamily,
              });
              expect(instance.hasMinimumSavings([singleFamily], dateUtc)).toBeFalsy();
            });
          });
          describe('balance more', () => {
            test('should be truthy', () => {
              const singleFamily: jest.Mocked<RentalSingleFamily> = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;

              const monthsToSave = 6;
              singleFamily.getExpensesByDate.mockReturnValueOnce(ledgerItem.amount / 2 / monthsToSave);

              expect(instance.hasMinimumSavings([singleFamily], dateUtc, monthsToSave)).toBeTruthy();
            });
          });
        });
      });
    });
  });
  describe('and getMinimumSavings', () => {
    describe('and no date', () => {
      test('should throw error', () => {
        expect(() => instance.getMinimumSavings([], null)).toThrow('no date supplied');
      });
    });
    describe('and has no ledger items', () => {
      describe('and has no properties', () => {
        test('should be truthy', () => {
          expect(instance.getMinimumSavings([], dateUtc)).toEqual(0);
        });
        describe('and has properties', () => {
          test('should be falsy', () => {
            const singleFamily: jest.Mocked<RentalSingleFamily> = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
            singleFamily.getExpensesByDate.mockReturnValueOnce(3);
            Object.defineProperty(singleFamily, 'propertyType', {
              value: PropertyType.SingleFamily,
            });
            expect(instance.getMinimumSavings([singleFamily], dateUtc)).toEqual(3 * 6);
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
          expect(instance.getMinimumSavings([], dateUtc)).toEqual(0);
        });
        describe('and has properties', () => {
          describe('balance less', () => {
            test('should be falsy', () => {
              const singleFamily: jest.Mocked<RentalSingleFamily> = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
              const piti = ledgerItem.amount * 2;
              singleFamily.getExpensesByDate.mockReturnValueOnce(piti);
              Object.defineProperty(singleFamily, 'propertyType', {
                value: PropertyType.SingleFamily,
              });

              expect(instance.getMinimumSavings([singleFamily], dateUtc)).toEqual(piti * 6);
            });
          });
        });
      });
    });
  });
  describe('and getSummaryAnnual', () => {
    describe('and no ledgerItem', () => {
      test('should return empty data', () => {
        expect(instance.getSummaryAnnual(dateUtc.getUTCFullYear())).toEqual({
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
      test('should only return data for current year', () => {
        const cashFlow = new LedgerItem();
        const createdDate = cloneDateUtc(new Date());

        cashFlow.created = cloneDateUtc(createdDate);
        cashFlow.amount = 1;
        cashFlow.type = LedgerItemType.CashFlow;

        const cashFlowTwo = new LedgerItem();
        cashFlowTwo.created = cloneDateUtc(createdDate);
        cashFlowTwo.amount = 3;
        cashFlowTwo.type = LedgerItemType.CashFlow;

        const cashFlowOut = new LedgerItem();
        cashFlowOut.created = cloneDateUtc(dateUtc, (dateUtc) => {
          dateUtc.setUTCFullYear(dateUtc.getUTCFullYear() + 2);
        });
        cashFlowOut.amount = 111111;
        cashFlowOut.type = LedgerItemType.CashFlow;

        const equity = new LedgerItem();
        equity.created = cloneDateUtc(createdDate);
        equity.amount = 2;
        equity.type = LedgerItemType.Equity;

        const purchase = new LedgerItem();
        purchase.created = cloneDateUtc(createdDate);
        purchase.amount = -3;
        purchase.type = LedgerItemType.Purchase;

        const salary = new LedgerItem();
        salary.created = cloneDateUtc(createdDate);
        salary.amount = 4;
        salary.type = LedgerItemType.Salary;

        instance.add([cashFlow, cashFlowTwo, cashFlowOut, equity, purchase, salary]);

        expect(instance.getSummaryAnnual(createdDate.getUTCFullYear())).toEqual({
          date: cloneDateUtc(createdDate),
          balance: 7,
          cashFlow: 4,
          averageCashFlow: 4,
          equity: equity.amount,
          purchases: -3,
        });
      });
    });
  });
});
