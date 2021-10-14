import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { Chance } from 'chance';
import { PropertyType } from '../../src/account/property-type';
import { LoanSettings } from '../../src/account/loan-settings';

describe('factory-single-family unit tests', () => {
  let chance: Chance.Chance;

  beforeEach(() => {
    chance = new Chance();
  });

  afterEach(() => {
    chance = null;
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe('and generateSingleFamily', () => {
    test('should resolve', () => {
      const expectedPayments = chance.integer();
      const getMonthlyPrincipalInterestTaxInterest = jest.fn().mockReturnValueOnce(expectedPayments);

      const entity: Partial<RentalSingleFamily> = {
        availableEndDate: chance.date(),
        availableStartDate: chance.date(),
        address: chance.address(),
        id: chance.guid(),
        purchasePrice: chance.integer(),
        minSellYears: chance.integer(),
        sellPriceAppreciationPercent: chance.integer(),
        cashDownPercent: chance.integer(),
      };

      const genericGenerateProperty = jest.fn().mockReturnValueOnce(entity);

      jest.doMock('../../src/calculations/get-monthly-principal-interest-tax-interest', () => ({
        getMonthlyPrincipalInterestTaxInterest,
      }));

      jest.doMock('../../src/generators/generic-generate-property', () => ({
        genericGenerateProperty,
      }));

      const expected = Object.assign(new RentalSingleFamily(), entity);
      expected.monthlyPrincipalInterestTaxInterest = expectedPayments;

      const generateSingleFamily = require('../../src/generators/factory-single-family').generateSingleFamily;

      const options = {
        highestMinSellInYears: 1,
        highestPriceDown: 1,
        highestSellAppreciationPercent: 1,
        lowestMinSellInYears: 1,
        lowestPriceDown: 1,
        lowestSellAppreciationPercent: 1,
      };

      const lifeTime = {
        availableEndDate: chance.date(),
        availableStartDate: chance.date(),
      };

      const usersMortInfo = {
        loanRatePercent: chance.integer(),
        loanTermInYears: chance.integer(),
      };

      const closingCostPercent = chance.integer();
      const actual = generateSingleFamily(
        options,
        lifeTime,
        [
          {
            propertyType: PropertyType.SingleFamily,
            value: usersMortInfo.loanRatePercent,
            name: LoanSettings.loanRatePercent,
          },
          {
            propertyType: PropertyType.SingleFamily,
            value: usersMortInfo.loanTermInYears,
            name: LoanSettings.loanTermInYears,
          },
        ],
        closingCostPercent
      );

      expect(genericGenerateProperty).toBeCalledWith(RentalSingleFamily, options, lifeTime);
      expect(getMonthlyPrincipalInterestTaxInterest).toBeCalledWith(
        entity.purchasePrice,
        entity.cashDownPercent,
        closingCostPercent,
        usersMortInfo.loanRatePercent,
        usersMortInfo.loanTermInYears
      );
      expect(actual).toEqual(expected);
    });
  });
});
