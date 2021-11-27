jest.mock('../../src/properties/rental-single-family');

import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { getMinCostDownByRule } from '../../src/calculations/get-min-cost-down-by-rule';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { PropertyType } from '../../src/properties/property-type';

describe('getMinCostDownByRule unit tests', () => {
  let rentalSF: jest.Mocked<RentalSingleFamily>;

  beforeEach(() => {
    rentalSF = new RentalSingleFamily() as jest.Mocked<RentalSingleFamily>;
    rentalSF.address = 'sf addy';
    rentalSF.id = 'sf-id';
    Object.defineProperty(rentalSF, 'propertyType', {
      value: PropertyType.SingleFamily,
    });
  });

  describe('and no purchase rules', () => {
    test('should default to neg one', () => {
      expect(getMinCostDownByRule(rentalSF, [])).toEqual(-1);
    });
  });

  describe('and purchase rules', () => {
    test('should default to neg one', () => {
      expect(
        getMinCostDownByRule(rentalSF, [
          {
            propertyType: rentalSF.propertyType,
            value: 1,
            type: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
            evaluate: jest.fn().mockReturnValueOnce(true),
          },
        ])
      ).toEqual(-1);
    });
  });
});
