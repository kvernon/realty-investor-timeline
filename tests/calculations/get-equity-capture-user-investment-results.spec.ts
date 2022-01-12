import { HoldRuleTypes } from '../../src/rules/hold-rule-types';
import { getEquityCaptureUserInvestmentResults } from '../../src/calculations/get-equity-capture-user-investment-results';
import { RentalSingleFamily } from '../../src/properties/rental-single-family';
import { cloneDateUtc } from '../../src/utils/data-clone-date';
import { RentalPassiveApartment } from '../../src/properties/rental-passive-apartment';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { InvestmentReasons, UserInvestResult } from '../../src/investments';

describe('getEquityCaptureUserInvestmentResults unit tests', () => {
  describe('and basic values', () => {
    test('and values', () => {
      const rental = new RentalSingleFamily();
      const actual = getEquityCaptureUserInvestmentResults(rental, [], [], cloneDateUtc(new Date()));

      expect(actual).toEqual([]);
    });
  });

  describe('and holdRule with years', () => {
    describe('and RentalSingleFamily', () => {
      test('and all evaluate false', () => {
        const rental = new RentalSingleFamily();
        rental.purchasePrice = 100000;

        const actual = getEquityCaptureUserInvestmentResults(
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
              type: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
              evaluate: jest.fn().mockReturnValue(false),
            },
          ],
          cloneDateUtc(new Date())
        );

        expect(actual).toEqual([
          new UserInvestResult(InvestmentReasons.DoesNotMeetUserRuleEquityCapture, 'rule: 4 property: 0'),
        ]);
      });

      test('and all evaluate true', () => {
        const rental = new RentalSingleFamily();
        rental.purchasePrice = 1000000;

        const actual = getEquityCaptureUserInvestmentResults(
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
              type: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
              evaluate: jest.fn().mockReturnValue(true),
            },
          ],
          cloneDateUtc(new Date())
        );

        expect(actual).toEqual([]);
      });
    });

    describe('and RentalPassiveApartment', () => {
      test('and values', () => {
        const rental = new RentalPassiveApartment();
        rental.offeredInvestmentAmounts = [10000, 20000];
        rental.purchasePrice = 1000000;

        const actual = getEquityCaptureUserInvestmentResults(
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
          cloneDateUtc(new Date())
        );

        expect(actual).toEqual([]);
      });
    });
  });

  describe('and no rental', () => {
    test('should throw', () => {
      expect(() => getEquityCaptureUserInvestmentResults(null, [], [], cloneDateUtc(new Date()))).toThrow(
        new Error('Invalid Argument: rental is falsy')
      );
    });
  });
});
