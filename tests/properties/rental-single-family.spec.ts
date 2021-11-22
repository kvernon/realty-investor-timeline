import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { Chance } from 'chance';
import { cloneDateUtc } from '../../src/utils/data-clone-date';

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

  describe('and purchaseDate', () => {
    test('should make date be 1, and 0 out time', () => {
      const date = new Date(Date.now());
      const diff = chance.integer({ min: 2, max: 5 });

      date.setUTCFullYear(date.getUTCFullYear() - diff);

      instance.purchaseDate = date;

      expect(instance.purchaseDate).toEqual(cloneDateUtc(date));
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

      expect(instance.soldDate).toEqual(cloneDateUtc(date));
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

      const expectedSellDate = cloneDateUtc(date);
      expectedSellDate.setUTCFullYear(expectedSellDate.getUTCFullYear() + 1);

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
        instance.equityCapturePercent = 100;
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

  describe('and isAvailableByDate', () => {
    describe('and no availableStartDate', () => {
      test('should be false', () => {
        expect(instance.isAvailableByDate(new Date())).toBeFalsy();
      });
    });
    describe('and no availableEndDate', () => {
      test('should be false', () => {
        instance.availableStartDate = new Date();
        expect(instance.isAvailableByDate(new Date())).toBeFalsy();
      });
    });
    describe('and availableStartDate and availableEndDate', () => {
      describe('and today in range', () => {
        test('should be true', () => {
          instance.availableStartDate = new Date();
          instance.availableEndDate = new Date(instance.availableStartDate.getTime());
          instance.availableEndDate.setUTCFullYear(instance.availableStartDate.getUTCFullYear() + 1);

          const today = new Date(instance.availableStartDate);
          today.setUTCMonth(today.getUTCMonth() + 4);

          expect(instance.isAvailableByDate(today)).toBeTruthy();
        });
      });
      describe('and today out of range', () => {
        test('should be false', () => {
          instance.availableStartDate = new Date();
          instance.availableEndDate = new Date(instance.availableStartDate.getTime());
          instance.availableEndDate.setUTCFullYear(instance.availableStartDate.getUTCFullYear() + 1);

          const today = new Date(instance.availableEndDate);
          today.setUTCMonth(today.getUTCMonth() + 4);

          expect(instance.isAvailableByDate(today)).toBeFalsy();
        });
      });
    });
  });

  describe('and isOwned', () => {
    describe('and no purchaseDate and no soldDate', () => {
      test('should be false', () => {
        expect(instance.isOwned).toBeFalsy();
      });
    });

    describe('and no purchaseDate and soldDate', () => {
      test('should be false', () => {
        instance.soldDate = new Date();
        expect(instance.isOwned).toBeFalsy();
      });
    });

    describe('and purchaseDate and no soldDate', () => {
      test('should be true', () => {
        instance.purchaseDate = new Date();
        expect(instance.isOwned).toBeTruthy();
      });
    });
  });

  describe('and canSell', () => {
    describe('and not owned', () => {
      test('should return false', () => {
        expect(instance.canSell(null)).toBeFalsy();
      });
    });
    describe('and isOwned', () => {
      beforeEach(() => {
        instance.purchaseDate = cloneDateUtc(new Date());
      });

      describe('and today is null', () => {
        test('should return false', () => {
          expect(instance.canSell(null)).toBeFalsy();
        });
      });

      describe('and today is earlier than minDateSell', () => {
        test('should return false', () => {
          const today = cloneDateUtc(instance.minSellDate);
          today.setUTCMonth(today.getUTCMonth() - 2);

          expect(instance.canSell(today)).toBeFalsy();
        });
      });

      describe('and today is after minDateSell', () => {
        test('should return false', () => {
          const date = cloneDateUtc(new Date());
          expect(instance.canSell(date)).toBeTruthy();
        });
      });
    });
  });

  describe('and getMonthlyPrincipalInterestTaxInterestByDate', () => {
    describe('and no purchaseDate', () => {
      test('should be 0', () => {
        expect(instance.getMonthlyPrincipalInterestTaxInterestByDate(new Date())).toEqual(0);
      });
    });
    describe('and purchaseDate', () => {
      describe('and soldDate', () => {
        describe('and today after purchaseDate', () => {
          test('should be 0', () => {
            instance.purchaseDate = new Date();
            instance.soldDate = new Date();
            expect(instance.getMonthlyPrincipalInterestTaxInterestByDate(new Date())).toEqual(0);
          });
        });
        describe('and today before purchaseDate', () => {
          test('should be 0', () => {
            instance.purchaseDate = new Date();
            instance.soldDate = new Date();

            const today = new Date(instance.purchaseDate.getTime());
            today.setUTCFullYear(instance.purchaseDate.getUTCFullYear() - 2);

            expect(instance.getMonthlyPrincipalInterestTaxInterestByDate(today)).toEqual(0);
          });
        });
      });

      describe('and no soldDate', () => {
        test('should be 0', () => {
          instance.purchaseDate = cloneDateUtc(new Date());
          instance.monthlyPrincipalInterestTaxInterest = chance.integer({ min: 9, max: 900 });
          expect(instance.getMonthlyPrincipalInterestTaxInterestByDate(cloneDateUtc(new Date()))).toEqual(
            instance.monthlyPrincipalInterestTaxInterest
          );
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
              instance.monthlyCashFlow = 0;

              const monthAfterCanSell = new Date(
                Date.UTC(
                  instance.purchaseDate.getFullYear() + instance.minSellYears,
                  instance.purchaseDate.getMonth() - 1,
                  1
                )
              );

              expect(instance.getMonthlyCashFlowByDate(monthAfterCanSell)).toEqual(0);
            });
          });
        });
      });
    });
  });
});
