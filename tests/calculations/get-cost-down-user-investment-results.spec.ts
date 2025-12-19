import { HoldRuleTypes } from '../../src/rules/hold-rule-types';
import { getCostDownUserInvestmentResults } from '../../src/calculations/get-cost-down-user-investment-results';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { cloneDateUtc } from '../../src/utils/data-clone-date';
import { RentalPassiveApartment } from '../../src/properties/rental-passive-apartment';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { InvestmentReasons, UserInvestResult } from '../../src/investments';

describe('getCostDownUserInvestmentResults unit tests', () => {
  describe('and basic values', () => {
    test('and values', () => {
      const rental = new RentalSingleFamily();
      const actual = getCostDownUserInvestmentResults(rental, [], [], cloneDateUtc(new Date()));

      expect(actual).toEqual([]);
    });
  });

  describe('and RentalSingleFamily', () => {
    test('and all evaluate false', () => {
      const rental = new RentalSingleFamily();
      rental.purchasePrice = 100000;

      const actual = getCostDownUserInvestmentResults(
        rental,
        [],
        [
          {
            propertyType: rental.propertyType,
            value: 4,
            type: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
            evaluate: jest.fn().mockReturnValue(false),
          },
        ],
        cloneDateUtc(new Date()),
      );

      expect(actual).toEqual([
        new UserInvestResult(InvestmentReasons.DoesNotMeetUserRuleOutOfPocket, 'rule: 4 property: 0', [
          { name: 'rule', value: 4 },
          { name: 'property', value: 0 },
        ]),
      ]);
    });

    test('and all evaluate true', () => {
      const rental = new RentalSingleFamily();
      rental.purchasePrice = 1000000;

      const actual = getCostDownUserInvestmentResults(
        rental,
        [
          {
            propertyType: rental.propertyType,
            value: 4,
            type: HoldRuleTypes.MinSellInYears,
            evaluate: jest.fn(),
          },
        ],
        [
          {
            propertyType: rental.propertyType,
            value: 4,
            type: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
            evaluate: jest.fn().mockReturnValue(true),
          },
        ],
        cloneDateUtc(new Date()),
      );

      expect(actual).toEqual([]);
    });
  });

  describe('and RentalPassiveApartment', () => {
    test('and values', () => {
      const rental = new RentalPassiveApartment();
      rental.offeredInvestmentAmounts = [10000, 20000];
      rental.purchasePrice = 1000000;

      const actual = getCostDownUserInvestmentResults(
        rental,
        [
          {
            propertyType: rental.propertyType,
            value: 4,
            type: HoldRuleTypes.MinSellInYears,
            evaluate: jest.fn(),
          },
        ],
        [],
        cloneDateUtc(new Date()),
      );

      expect(actual).toEqual([]);
    });
  });

  describe('and no rental', () => {
    test('should throw', () => {
      expect(() => getCostDownUserInvestmentResults(null, [], [], cloneDateUtc(new Date()))).toThrow(new Error('Invalid Argument: rental is falsy'));
    });
  });
});
