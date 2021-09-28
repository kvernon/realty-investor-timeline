import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { Chance } from 'chance';

describe('RentalSingleFamily unit tests', () => {
  let instance: RentalSingleFamily;
  let chance: Chance.Chance;

  beforeEach(() => {
    chance = new Chance();
    instance = new RentalSingleFamily();
  });

  afterEach(() => {
    instance = null;
    chance = null;
  });

  describe('and monthlyCashFlow', () => {
    test('should be positive amount', () => {
      instance.monthlyPrincipalInterestTaxInterest = chance.integer({
        min: 100,
        max: 300,
      });
      instance.monthlyRentAmount = chance.integer({ min: 400, max: 500 });
      expect(instance.monthlyCashFlow).toEqual(
        instance.monthlyRentAmount - instance.monthlyPrincipalInterestTaxInterest
      );
    });
    test('should be negative amount', () => {
      instance.monthlyPrincipalInterestTaxInterest = chance.integer({
        min: 250,
        max: 300,
      });
      instance.monthlyRentAmount = chance.integer({ min: 400, max: 500 });
      expect(instance.monthlyCashFlow).toEqual(
        instance.monthlyRentAmount - instance.monthlyPrincipalInterestTaxInterest
      );
    });
    test('should be zero', () => {
      expect(instance.monthlyCashFlow).toEqual(0);
    });
  });

  describe('and purchaseDate', () => {
    test('should make date be 1, and 0 out time', () => {
      const date = new Date(Date.now());
      const diff = chance.integer({ min: 2, max: 5 });

      date.setUTCFullYear(date.getUTCFullYear() - diff);

      instance.purchaseDate = date;

      expect(instance.purchaseDate).toEqual(new Date(date.getUTCFullYear(), date.getUTCMonth(), 1));
    });
    test('undefined, should be undefined', () => {
      instance.purchaseDate = undefined;

      expect(instance.purchaseDate).toBeUndefined();
    });
  });

  describe('and soldDate', () => {
    test('should make date be 1, and 0 out time', () => {
      const date = new Date(Date.now());
      const diff = chance.integer({ min: 2, max: 5 });

      date.setUTCFullYear(date.getUTCFullYear() - diff);

      instance.soldDate = date;

      expect(instance.soldDate).toEqual(new Date(date.getUTCFullYear(), date.getUTCMonth(), 1));
    });
    test('undefined, should be undefined', () => {
      instance.soldDate = undefined;

      expect(instance.soldDate).toBeUndefined();
    });
  });

  describe('and minSellDate', () => {
    test('should be x years after', () => {
      const date = new Date(Date.now());
      const diff = chance.integer({ min: 2, max: 5 });

      date.setUTCFullYear(date.getUTCFullYear() - diff);

      instance.purchaseDate = date;
      instance.minSellYears = 1;

      const expectedSellDate = new Date(date.getUTCFullYear() + 1, date.getUTCMonth(), 1);

      expect(instance.minSellDate).toEqual(expectedSellDate);
    });
  });

  describe('and sellPriceByDate', () => {
    beforeEach(() => {
      const date = new Date(Date.now());
      const diff = chance.integer({ min: 2, max: 5 });
      date.setUTCFullYear(date.getUTCFullYear() - diff);

      instance.purchaseDate = date;
      instance.purchasePrice = 100000;
    });

    test('should appreciate', () => {
      instance.sellPriceAppreciationPercent = 4;

      const yearDiff = 2;
      const today = new Date(instance.purchaseDate.getFullYear() + yearDiff, instance.purchaseDate.getMonth(), 1);

      let expected = instance.purchasePrice;
      for (let i = 0; i < yearDiff; i++) {
        expected = expected + (expected * instance.sellPriceAppreciationPercent) / 100;
      }

      expect(instance.sellPriceByDate(today)).toEqual(expected);
    });
  });

  describe('and equityFromSell', () => {
    describe('and soldDate', () => {
      beforeEach(() => {
        const date = new Date(Date.now());
        const diff = chance.integer({ min: 2, max: 5 });
        date.setUTCFullYear(date.getUTCFullYear() - diff);

        instance.purchaseDate = date;
        instance.purchasePrice = chance.integer({ min: 1, max: 1000000 });
        instance.minSellYears = 1;
        instance.soldDate = new Date(instance.purchaseDate.getFullYear() + 2, instance.purchaseDate.getMonth(), 1);
      });

      describe('and before soldDate', () => {
        test('should be 0', () => {
          const beforeSoldDate = new Date(instance.soldDate.getFullYear(), instance.soldDate.getMonth() - 1, 1);

          expect(instance.getEquityFromSell(beforeSoldDate)).toEqual(0);
        });
      });
      describe('and is soldDate', () => {
        test('should be rawEquity', () => {
          const expectedEquity = instance.purchasePrice + 30;
          instance.sellPriceByDate = jest.fn().mockReturnValue(expectedEquity);
          expect(instance.getEquityFromSell(instance.soldDate)).toEqual(expectedEquity);
        });
        test('and soldDate is soldDate should be rawEquity', () => {
          const expectedEquity = instance.purchasePrice + 30;
          instance.sellPriceByDate = jest.fn().mockReturnValue(expectedEquity);
          expect(instance.getEquityFromSell(instance.soldDate)).toEqual(expectedEquity);
        });
      });
      describe('and after soldDate', () => {
        test('should be 0', () => {
          const monthAfterCanSell = new Date(instance.soldDate.getFullYear(), instance.soldDate.getMonth() - 1, 1);

          expect(instance.getEquityFromSell(monthAfterCanSell)).toEqual(0);
        });
      });
      describe('and falsy soldDate', () => {
        test('should be 0', () => {
          instance.soldDate = undefined;

          const monthAfterCanSell = new Date(
            instance.purchaseDate.getFullYear() + instance.minSellYears,
            instance.purchaseDate.getMonth() - 1,
            1
          );

          expect(instance.getEquityFromSell(monthAfterCanSell)).toEqual(0);
        });
      });
    });
  });

  describe('and getMonthlyCashFlowByDate', () => {
    describe('and no purchaseDate', () => {
      test('should return 0', () => {
        expect(instance.getMonthlyCashFlowByDate(new Date(Date.now()))).toEqual(0);
      });
    });
    describe('and purchaseDate', () => {
      beforeEach(() => {
        const date = new Date(Date.now());
        const diff = chance.integer({ min: 2, max: 5 });

        date.setUTCFullYear(date.getUTCFullYear() - diff);

        instance.purchaseDate = date;
      });

      describe('and soldDate falsy', () => {
        beforeEach(() => {
          const date = new Date(Date.now());
          const diff = chance.integer({ min: 2, max: 5 });
          date.setUTCFullYear(date.getUTCFullYear() - diff);

          instance.purchaseDate = date;
          instance.minSellYears = 1;
        });
        describe('and soldDate truthy', () => {
          beforeEach(() => {
            instance.soldDate = new Date(
              instance.purchaseDate.getUTCFullYear() + instance.minSellYears,
              instance.purchaseDate.getUTCMonth(),
              1
            );
          });
          describe('and today is before', () => {
            test('should be 0', () => {
              const beforeSoldDate = new Date(
                instance.purchaseDate.getFullYear(),
                instance.purchaseDate.getMonth() - 1,
                1
              );

              expect(instance.getMonthlyCashFlowByDate(beforeSoldDate)).toEqual(0);
            });
          });
          describe('and today is soldDate', () => {
            test('should be rawEquity', () => {
              expect(instance.getMonthlyCashFlowByDate(instance.soldDate)).toEqual(0);
            });
          });
          describe('and today is after', () => {
            test('should be 0', () => {
              const monthAfterCanSell = new Date(instance.soldDate.getFullYear(), instance.soldDate.getMonth() - 1, 1);

              expect(instance.getMonthlyCashFlowByDate(monthAfterCanSell)).toEqual(0);
            });
          });
          describe('and falsy soldDate', () => {
            test('should be 0', () => {
              instance.soldDate = undefined;

              const monthAfterCanSell = new Date(
                instance.purchaseDate.getFullYear() + instance.minSellYears,
                instance.purchaseDate.getMonth() - 1,
                1
              );

              expect(instance.getMonthlyCashFlowByDate(monthAfterCanSell)).toEqual(0);
            });
          });
        });
      });
    });
  });
});
