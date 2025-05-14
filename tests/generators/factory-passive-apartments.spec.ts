import { RentalPassiveApartment } from '../../src/properties/rental-passive-apartment';
import { Chance } from 'chance';
import { PropertyType } from '../../src/properties/property-type';
import { LoanSettings } from '../../src/loans/loan-settings';
import { IPropertyEntityOptions } from '../../src/generators/i-property-entity-options';

describe('factory-passive-apartments unit tests', () => {
  let chance: Chance.Chance;

  beforeEach(() => {
    chance = new Chance();
  });

  afterEach(() => {
    chance = null;
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe('and generateRentalPassiveApartment', () => {
    test('should resolve', async () => {
      const entity: Partial<RentalPassiveApartment> = {
        propertyType: PropertyType.SingleFamily,
        availableEndDate: chance.date(),
        availableStartDate: chance.date(),
        address: chance.address(),
        id: chance.guid(),
        purchasePrice: chance.integer({ min: 250000, max: 250000 }) * 3,
        minSellYears: chance.integer(),
        sellPriceAppreciationPercent: chance.integer(),
      };

      const genericGenerateProperty = jest.fn().mockReturnValueOnce(entity);

      jest.doMock('../../src/generators/generic-generate-property', () => ({
        genericGenerateProperty,
      }));

      const expected = Object.assign(new RentalPassiveApartment(), entity);

      const generateRentalPassiveApartment = (await import('../../src/generators/factory-passive-apartment')).generateRentalPassiveApartment;

      const options: IPropertyEntityOptions = {
        highestCashFlow: 1,
        highestMinSellInYears: 1,
        highestSellAppreciationPercent: 1,
        lowestMinSellInYears: 1,
        lowestSellAppreciationPercent: 1,
        lowestPurchasePrice: 1,
        highestPurchasePrice: 1,
        lowestEquityCapturePercent: 1,
        highestEquityCapturePercent: 1,
        lowestCashFlow: 1,
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
      const actual = generateRentalPassiveApartment(
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
      expected.offeredInvestmentAmounts = [50000, 100000, 150000, 200000];

      expect(genericGenerateProperty).toHaveBeenCalledWith(RentalPassiveApartment, options, lifeTime);

      expect(actual).toEqual(expected);
    });
  });
});
