import { Chance } from 'chance';
import { IRule, PurchaseRuleTypes } from '../../src/rules';

describe('simulate unit tests', () => {
  let chance: Chance.Chance;

  beforeEach(() => {
    chance = new Chance();
  });

  afterEach(() => {
    chance = null;
  });

  describe('and simulate', () => {
    test('should call things', () => {
      const assign = jest.spyOn(Object, 'assign');

      const date = new Date();
      const cloneDateUtc: jest.Mock = jest.fn().mockReturnValue(date);
      jest.doMock('../../src/utils/data-clone-date', () => cloneDateUtc);

      const loop: jest.Mock = jest.fn();
      jest.doMock('../../src/time/movement', () => ({
        loop,
      }));

      const valueCache = {};
      const ValueCacheCtor = jest.fn().mockReturnValue(valueCache);
      jest.doMock('../../src/caching/value-cache', () => ({
        ValueCache: jest.fn().mockImplementation(ValueCacheCtor),
      }));

      const user = {
        clone: jest.fn(),
        monthlySavedAmount: chance.integer({ min: 1, max: 10 }),
      };
      jest.doMock('../../src/account/user', () => ({
        User: jest.fn().mockImplementation(() => user),
      }));

      const generateSingleFamily = jest.fn();
      jest.doMock('../../src/generators/factory-single-family', () => ({
        generateSingleFamily,
      }));

      const rentalGen = {};
      const RentalGeneratorCtor = jest.fn().mockImplementation(() => rentalGen);
      jest.doMock('../../src/generators/rental-generator', () => ({
        RentalGenerator: jest.fn().mockImplementation(RentalGeneratorCtor),
      }));

      const simulate = require('../../src/time/simulate').simulate;

      const options = {
        monthlyIncomeAmountGoal: chance.integer({ min: 1, max: 10 }),
        purchaseRules: null as IRule<PurchaseRuleTypes>[],
        loanSettings: null as [],
        monthlySavedAmount: user.monthlySavedAmount,
        amountInSavings: 0,
        highestCashFlowMonthly: 0,
        highestEquityCapturePercent: 0,
        highestMinSellInYears: 0,
        highestPriceDown: 0,
        highestSellAppreciationPercent: 0,
        lowestCashFlowMonthly: 0,
        lowestEquityCapturePercent: 0,
        lowestMinSellInYears: 0,
        lowestPriceDown: 0,
        lowestSellAppreciationPercent: 0,
        maxRentalOpportunitiesSingleFamily: 0,
        startDate: date,
        maxYears: chance.integer({ min: 1, max: 2 }),
        hasMetGoalOrMaxTime: jest.fn(),
      };

      simulate(options);

      expect(loop).toBeCalledWith(
        {
          maxYears: options.maxYears,
          startDate: options.startDate,
          propertyGeneratorSingleFamily: rentalGen,
          hasMetGoalOrMaxTime: expect.any(Function),
        },
        user
      );

      expect(assign).toBeCalledWith(rentalGen, options);
      expect(ValueCacheCtor).toBeCalledWith(options.startDate, [], options.maxRentalOpportunitiesSingleFamily);
      expect(RentalGeneratorCtor).toBeCalledWith(valueCache, generateSingleFamily);
    });
  });
});
