jest.mock('../../src/utils/data-property-entity');

import { genericGenerateProperty } from '../../src/generators/generic-generate-property';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { Chance } from 'chance';
import { IPropertyEntityOptions } from '../../src/generators/i-property-entity-options';
import * as DataProperty from '../../src/utils/data-property-entity';

describe('generateProperty unit tests', () => {
  let chance: Chance.Chance;
  let randomPropertyEntity: jest.SpyInstance;

  beforeEach(() => {
    chance = new Chance();
    randomPropertyEntity = jest.spyOn(DataProperty, 'randomPropertyEntity');
  });

  afterEach(() => {
    chance = null;
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('and options empty', () => {
    test('should throw', () => {
      expect(() =>
        genericGenerateProperty(RentalSingleFamily, null, {
          availableEndDate: new Date(),
          availableStartDate: new Date(),
        })
      ).toThrow();
    });
  });

  describe('and options fully populated', () => {
    test('should serialize', () => {
      const expected = new RentalSingleFamily();
      expected.address = chance.address();
      expected.id = chance.word();
      expected.minSellYears = chance.integer({ min: 1, max: 90 });
      expected.availableStartDate = chance.date();
      expected.availableEndDate = chance.date();
      expected.purchasePrice = chance.integer({ min: 100000, max: 9000000 });

      randomPropertyEntity.mockReturnValueOnce(expected);

      const options: IPropertyEntityOptions = {
        highestEquityCapturePercent: 0,
        lowestEquityCapturePercent: 0,
        highestCashFlow: 0,
        lowestCashFlow: 0,
        highestMinSellInYears: 0,
        highestPricePrice: 0,
        highestSellAppreciationPercent: 0,
        lowestMinSellInYears: 0,
        lowestPricePrice: 0,
        lowestSellAppreciationPercent: 0,
      };

      expect(genericGenerateProperty(RentalSingleFamily, options, expected)).toEqual(expected);
    });
    describe('with today', () => {
      test('should serialize', () => {
        const expected = new RentalSingleFamily();
        expected.address = chance.address();
        expected.id = chance.word();
        expected.availableEndDate = chance.date();
        expected.purchasePrice = chance.integer({ min: 100000, max: 9000000 });

        randomPropertyEntity.mockReturnValueOnce(expected);

        const options: IPropertyEntityOptions = {
          highestEquityCapturePercent: 0,
          lowestEquityCapturePercent: 0,
          highestCashFlow: 0,
          lowestCashFlow: 0,
          highestMinSellInYears: 0,
          highestPricePrice: 0,
          highestSellAppreciationPercent: 0,
          lowestMinSellInYears: 0,
          lowestPricePrice: 0,
          lowestSellAppreciationPercent: 0,
        };
        expect(genericGenerateProperty(RentalSingleFamily, options, expected)).toEqual(expected);
      });
    });
  });
});
