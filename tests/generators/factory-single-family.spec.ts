import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { Chance } from 'chance';
import { PropertyType } from '../../src/properties/property-type';
import { LoanSettings } from '../../src/loans/loan-settings';
import { IPropertyEntityOptions } from '../../src/generators/i-property-entity-options';

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
    test('should resolve', async () => {
      const expectedPayments = chance.integer();
      const getMonthlyPrincipalInterestTaxInterest = jest.fn().mockReturnValueOnce(expectedPayments);

      const entity: Partial<RentalSingleFamily> = {
        propertyType: PropertyType.SingleFamily,
        availableEndDate: chance.date(),
        availableStartDate: chance.date(),
        address: chance.address(),
        id: chance.guid(),
        purchasePrice: chance.integer(),
        minSellYears: chance.integer(),
        sellPriceAppreciationPercent: chance.integer(),
        cashDownPercent: chance.integer({ min: 1, max: 4 }),
      };

      const genericGenerateProperty = jest.fn().mockReturnValueOnce(entity);

      jest.doMock('../../src/calculations/get-monthly-principal-interest-tax-interest', () => ({
        getMonthlyPrincipalInterestTaxInterest,
      }));

      jest.doMock('../../src/generators/generic-generate-property', () => ({
        genericGenerateProperty,
      }));

      const expected = Object.assign(new RentalSingleFamily(), entity);
      expected.cashDownPercent = 25;
      expected.monthlyPrincipalInterestTaxInterest = expectedPayments;

      const generateSingleFamily = (await import('../../src/generators/factory-single-family')).generateSingleFamily;

      const options: IPropertyEntityOptions = {
        highestMinSellInYears: 1,
        highestSellAppreciationPercent: 1,
        lowestMinSellInYears: 1,
        lowestSellAppreciationPercent: 1,
        lowestPurchasePrice: 1,
        highestPurchasePrice: 1,
        lowestEquityCapturePercent: 1,
        highestEquityCapturePercent: 1,
        lowestCashFlow: 1,
        highestCashFlow: 1,
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
            name: LoanSettings.LoanRatePercent,
          },
          {
            propertyType: PropertyType.SingleFamily,
            value: usersMortInfo.loanTermInYears,
            name: LoanSettings.LoanTermInYears,
          },
        ],
        closingCostPercent,
      );

      expect(genericGenerateProperty).toHaveBeenCalledWith(RentalSingleFamily, options, lifeTime);
      expect(getMonthlyPrincipalInterestTaxInterest).toHaveBeenCalledWith(
        entity.purchasePrice,
        25,
        closingCostPercent,
        usersMortInfo.loanRatePercent,
        usersMortInfo.loanTermInYears,
      );
      expect(actual).toEqual(expected);
    });
  });
});
