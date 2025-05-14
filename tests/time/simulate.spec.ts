import { Chance } from 'chance';
import { HoldRuleTypes, IRule, PurchaseRuleTypes } from '../../src/rules';
import { ISimulateOptions } from '../../src/time/simulate';

describe('simulate unit tests', () => {
  let chance: Chance.Chance;

  beforeEach(() => {
    chance = new Chance();
  });

  afterEach(() => {
    chance = null;
  });

  describe('and simulate', () => {
    test('should call things', async () => {
      const objectAssignSpy = jest.spyOn(Object, 'assign');

      const date = new Date();
      const cloneDateUtc: jest.Mock = jest.fn().mockReturnValue(date);
      jest.doMock('../../src/utils/data-clone-date', () => ({
        cloneDateUtc,
      }));

      const movement: jest.Mock = jest.fn();
      jest.doMock('../../src/time/movement', () => ({
        movement,
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
      const generateRentalPassiveApartment = jest.fn();
      jest.doMock('../../src/generators/factory-single-family', () => ({
        generateSingleFamily,
      }));
      jest.doMock('../../src/generators/factory-passive-apartment', () => ({
        generateRentalPassiveApartment,
      }));

      const rentalGen = {};
      const RentalGeneratorCtor = jest.fn().mockImplementation(() => rentalGen);
      jest.doMock('../../src/generators/rental-generator', () => ({
        RentalGenerator: jest.fn().mockImplementation(RentalGeneratorCtor),
      }));

      const simulate = (await import('../../src/time/simulate')).simulate;

      const options: ISimulateOptions = {
        monthlyIncomeAmountGoal: chance.integer({ min: 1, max: 10 }),
        purchaseRules: null as IRule<PurchaseRuleTypes>[],
        holdRules: null as IRule<HoldRuleTypes>[],
        loanSettings: null as [],
        monthlySavedAmount: user.monthlySavedAmount,
        amountInSavings: 0,
        generatorOptionsSingleFamily: {
          highestMinSellInYears: 0,
          lowestMinSellInYears: 0,
          highestSellAppreciationPercent: 0,
          lowestSellAppreciationPercent: 5,
          lowestCashFlow: 0,
          highestCashFlow: 0,
          lowestEquityCapturePercent: 0,
          highestEquityCapturePercent: 0,
          maxRentalOpportunities: 0,
          lowestPurchasePrice: 0,
          highestPurchasePrice: 0,
        },
        generatorOptionsPassiveApartment: {
          highestMinSellInYears: 0,
          lowestMinSellInYears: 0,
          highestSellAppreciationPercent: 0,
          lowestSellAppreciationPercent: 5,
          lowestCashFlow: 0,
          highestCashFlow: 0,
          lowestEquityCapturePercent: 0,
          highestEquityCapturePercent: 0,
          maxRentalOpportunities: 1,
          lowestPurchasePrice: 0,
          highestPurchasePrice: 0,
        },
        startDate: date,
        maxYears: chance.integer({ min: 1, max: 2 }),
        hasMetGoalOrMaxTime: jest.fn(),
      };

      simulate(options);

      expect(movement).toHaveBeenCalledWith(
        {
          maxYears: options.maxYears,
          startDate: options.startDate,
          propertyGeneratorSingleFamily: rentalGen,
          propertyGeneratorPassiveApartment: rentalGen,
          hasMetGoalOrMaxTime: expect.any(Function),
        },
        user,
      );

      expect(objectAssignSpy).toHaveBeenCalledWith(rentalGen, options.generatorOptionsSingleFamily);
      expect(objectAssignSpy).toHaveBeenCalledWith(rentalGen, options.generatorOptionsPassiveApartment);
      expect(ValueCacheCtor).toHaveBeenCalledWith(options.startDate, [], 2);
      expect(RentalGeneratorCtor).toHaveBeenNthCalledWith(1, valueCache, generateSingleFamily);
      expect(RentalGeneratorCtor).toHaveBeenNthCalledWith(2, valueCache, generateRentalPassiveApartment);
    });
  });
});
