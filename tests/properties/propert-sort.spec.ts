import { IRentalPropertyEntity } from '../../src/properties/i-rental-property-entity';
import * as invReasons from '../../src/investments/investment-reasons-decorator';
import { IRuleEvaluation } from '../../src/rules/rule-evaluation';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';

describe('propertySort unit tests', () => {
  let propertyA: IRentalPropertyEntity;
  let propertyB: IRentalPropertyEntity;
  let getInvestmentReasons: jest.SpyInstance;
  let propertySort: (
    propertyA: IRentalPropertyEntity,
    propertyB: IRentalPropertyEntity,
    purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[]
  ) => number;

  beforeEach(() => {
    propertyA = {
      address: '',
      availableEndDate: undefined,
      availableStartDate: undefined,
      id: '',
      isOwned: false,
      purchaseDate: undefined,
      purchasePrice: 0,
      sellPriceAppreciationPercent: 0,
      soldDate: undefined,
      canInvestByUser: jest.fn(),
      canSell: jest.fn(),
      get costDownPrice(): number {
        return 0;
      },
      getEquityFromSell: jest.fn(),
      getMonthlyCashFlowByDate: jest.fn(),
      isAvailableByDate: jest.fn(),
    };

    propertyB = {
      address: '',
      availableEndDate: undefined,
      availableStartDate: undefined,
      id: '',
      isOwned: false,
      purchaseDate: undefined,
      purchasePrice: 0,
      sellPriceAppreciationPercent: 0,
      soldDate: undefined,
      canInvestByUser: jest.fn(),
      canSell: jest.fn(),
      get costDownPrice(): number {
        return 0;
      },
      getEquityFromSell: jest.fn(),
      getMonthlyCashFlowByDate: jest.fn(),
      isAvailableByDate: jest.fn(),
    };

    getInvestmentReasons = jest.spyOn(invReasons, 'getInvestmentReasons');
    propertySort = require('../../src/properties/property-sort').default;
  });

  afterEach(() => {
    propertySort = null;
    getInvestmentReasons = null;
  });

  describe('and empties', () => {
    test('no property a, b, or purchaseRules', () => {
      expect(propertySort(null, null, null)).toEqual(-1);
    });
    test('no property b, or purchaseRules', () => {
      expect(propertySort(propertyA, null, null)).toEqual(-1);
    });
    test('no property a or purchaseRules, but b exists', () => {
      expect(propertySort(null, propertyB, null)).toEqual(-1);
    });
    test('no purchaseRules, but property a and b exist', () => {
      expect(propertySort(propertyA, propertyB, null)).toEqual(-1);
    });
  });

  describe('and getInvestmentReasons', () => {
    describe('and found for A, and not for B', () => {
      test('should return -1', () => {
        getInvestmentReasons.mockReturnValueOnce([{}]);

        getInvestmentReasons.mockReturnValueOnce([]);

        expect(
          propertySort(propertyA, propertyB, [
            {
              type: PurchaseRuleTypes.minAfterRepairPrice,
              value: 1,
              evaluate: jest.fn().mockReturnValueOnce(true),
            },
          ])
        ).toEqual(-1);
      });
    });

    describe('and found for B, and not for A', () => {
      test('should return -1', () => {
        getInvestmentReasons.mockReturnValueOnce([]);
        getInvestmentReasons.mockReturnValueOnce([{}]);

        expect(
          propertySort(propertyA, propertyB, [
            {
              type: PurchaseRuleTypes.minAfterRepairPrice,
              value: 1,
              evaluate: jest.fn().mockReturnValueOnce(true),
            },
          ])
        ).toEqual(1);
      });
    });

    describe('and found for A and B', () => {
      describe('and both none', () => {
        describe('and no rule match', () => {
          test('should return -1', () => {
            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.none,
              },
            ]);

            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.none,
              },
            ]);

            expect(
              propertySort(propertyA, propertyB, [
                {
                  type: PurchaseRuleTypes.minAfterRepairPrice,
                  value: 1,
                  evaluate: jest.fn().mockReturnValueOnce(true),
                },
              ])
            ).toEqual(-1);
          });
        });

        describe('and rule match for a', () => {
          test('should return -1', () => {
            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.minAfterRepairPrice,
                descriptor: { value: 20 },
              },
            ]);

            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.none,
                descriptor: { value: 0 },
              },
            ]);

            expect(
              propertySort(propertyA, propertyB, [
                {
                  type: PurchaseRuleTypes.minAfterRepairPrice,
                  value: 1,
                  evaluate: jest.fn().mockReturnValueOnce(true),
                },
              ])
            ).toEqual(-1);
          });
        });

        describe('and rule match for b', () => {
          test('should return 1', () => {
            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.none,
                descriptor: { value: 0 },
              },
            ]);

            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.minAfterRepairPrice,
                descriptor: { value: 20 },
              },
            ]);

            expect(
              propertySort(propertyA, propertyB, [
                {
                  type: PurchaseRuleTypes.minAfterRepairPrice,
                  value: 1,
                  evaluate: jest.fn().mockReturnValueOnce(true),
                },
              ])
            ).toEqual(1);
          });
        });

        describe('and rule match for both', () => {
          test('should return a', () => {
            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.minAfterRepairPrice,
                descriptor: { value: 1000 },
              },
            ]);

            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.minAfterRepairPrice,
                descriptor: { value: 20 },
              },
            ]);

            expect(
              propertySort(propertyA, propertyB, [
                {
                  type: PurchaseRuleTypes.minAfterRepairPrice,
                  value: 2000,
                  evaluate: jest.fn().mockReturnValueOnce(true),
                },
              ])
            ).toEqual(-1);
          });

          test('should return 0', () => {
            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.minAfterRepairPrice,
                descriptor: { value: 1000 },
              },
            ]);

            getInvestmentReasons.mockReturnValueOnce([
              {
                ruleType: PurchaseRuleTypes.minAfterRepairPrice,
                descriptor: { value: 1000 },
              },
            ]);

            expect(
              propertySort(propertyA, propertyB, [
                {
                  type: PurchaseRuleTypes.minAfterRepairPrice,
                  value: 2000,
                  evaluate: jest.fn().mockReturnValueOnce(true),
                },
              ])
            ).toEqual(0);
          });
        });
      });
    });
  });
});
