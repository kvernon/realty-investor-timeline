import { RentalPassiveApartment } from '../../src/properties/rental-passive-apartment';
import { Chance } from 'chance';
import { PropertyType } from '../../src/properties/property-type';
import { LoanSettings } from '../../src/loans/loan-settings';

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
    test('should resolve', () => {
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

      const generateRentalPassiveApartment =
        require('../../src/generators/factory-passive-apartment').generateRentalPassiveApartment;

      const options = {
        highestCashFlowMonthly: 1,
        highestMinSellInYears: 1,
        highestPriceDown: 1,
        highestSellAppreciationPercent: 1,
        lowestCashFlowMonthly: 1,
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
        closingCostPercent
      );
      expected.offeredInvestmentAmounts = [50000, 100000, 150000, 200000];

      expect(genericGenerateProperty).toHaveBeenCalledWith(RentalPassiveApartment, options, lifeTime);

      expect(actual).toEqual(expected);
    });
  });
});
