import { IRentalPropertyEntity } from '../../src/properties/i-rental-property-entity';
import * as invReasons from '../../src/investments/investment-reasons-decorator';
import { IRuleEvaluation } from '../../src/rules/rule-evaluation';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { PropertyType } from '../../src/account/property-type';
import { HoldRuleTypes } from '../../src/rules/hold-rule-types';

describe('propertySort unit tests', () => {
  let propertyA: IRentalPropertyEntity;
  let propertyB: IRentalPropertyEntity;
  let getInvestmentReasons: jest.SpyInstance;
  let propertySort: <T extends PurchaseRuleTypes | HoldRuleTypes>(
    propertyA: IRentalPropertyEntity,
    propertyB: IRentalPropertyEntity,
    purchaseRules: IRuleEvaluation<T>[]
  ) => number;

  beforeEach(() => {
    propertyA = {
      equityCapturePercent: 0,
      minSellYears: 0,
      monthlyCashFlow: 0,
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
      equityCapturePercent: 0,
      minSellYears: 0,
      monthlyCashFlow: 0,
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

  describe('and PurchaseRuleTypes', () => {
    describe('and empties', () => {
      test('no property a, b, or purchaseRules', () => {
        expect(propertySort<PurchaseRuleTypes>(null, null, null)).toEqual(-1);
      });
      test('no property b, or purchaseRules', () => {
        expect(propertySort<PurchaseRuleTypes>(propertyA, null, null)).toEqual(-1);
      });
      test('no property a or purchaseRules, but b exists', () => {
        expect(propertySort<PurchaseRuleTypes>(null, propertyB, null)).toEqual(-1);
      });
      test('no purchaseRules, but property a and b exist', () => {
        expect(propertySort<PurchaseRuleTypes>(propertyA, propertyB, null)).toEqual(-1);
      });
    });

    describe('and getInvestmentReasons', () => {
      describe('and found for A, and not for B', () => {
        test('should return -1', () => {
          getInvestmentReasons.mockReturnValueOnce([{}]);

          getInvestmentReasons.mockReturnValueOnce([]);

          expect(
            propertySort<PurchaseRuleTypes>(propertyA, propertyB, [
              {
                type: PurchaseRuleTypes.minAfterRepairPrice,
                propertyType: PropertyType.SingleFamily,
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
            propertySort<PurchaseRuleTypes>(propertyA, propertyB, [
              {
                type: PurchaseRuleTypes.minAfterRepairPrice,
                propertyType: PropertyType.SingleFamily,
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
                propertySort<PurchaseRuleTypes>(propertyA, propertyB, [
                  {
                    type: PurchaseRuleTypes.minAfterRepairPrice,
                    propertyType: PropertyType.SingleFamily,
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
                propertySort<PurchaseRuleTypes>(propertyA, propertyB, [
                  {
                    type: PurchaseRuleTypes.minAfterRepairPrice,
                    propertyType: PropertyType.SingleFamily,
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
                propertySort<PurchaseRuleTypes>(propertyA, propertyB, [
                  {
                    type: PurchaseRuleTypes.minAfterRepairPrice,
                    propertyType: PropertyType.SingleFamily,
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
                propertySort<PurchaseRuleTypes>(propertyA, propertyB, [
                  {
                    type: PurchaseRuleTypes.minAfterRepairPrice,
                    propertyType: PropertyType.SingleFamily,
                    value: 2000,
                    evaluate: jest.fn().mockReturnValueOnce(true),
                  },
                ])
              ).toEqual(0);
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
                propertySort<PurchaseRuleTypes>(propertyA, propertyB, [
                  {
                    type: PurchaseRuleTypes.minAfterRepairPrice,
                    propertyType: PropertyType.SingleFamily,
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

  describe('and HoldRuleTypes', () => {
    describe('and empties', () => {
      test('no property a, b, or purchaseRules', () => {
        expect(propertySort<HoldRuleTypes>(null, null, null)).toEqual(-1);
      });
      test('no property b, or purchaseRules', () => {
        expect(propertySort<HoldRuleTypes>(propertyA, null, null)).toEqual(-1);
      });
      test('no property a or purchaseRules, but b exists', () => {
        expect(propertySort<HoldRuleTypes>(null, propertyB, null)).toEqual(-1);
      });
      test('no purchaseRules, but property a and b exist', () => {
        expect(propertySort<HoldRuleTypes>(propertyA, propertyB, null)).toEqual(-1);
      });
    });

    describe('and getInvestmentReasons', () => {
      describe('and found for A, and not for B', () => {
        test('should return -1', () => {
          getInvestmentReasons.mockReturnValueOnce([{}]);

          getInvestmentReasons.mockReturnValueOnce([]);

          expect(
            propertySort<HoldRuleTypes>(propertyA, propertyB, [
              {
                type: HoldRuleTypes.minSellIfLowCashFlowPercent,
                propertyType: PropertyType.SingleFamily,
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
            propertySort<HoldRuleTypes>(propertyA, propertyB, [
              {
                type: HoldRuleTypes.minSellIfHighEquityPercent,
                propertyType: PropertyType.SingleFamily,
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
                propertySort<HoldRuleTypes>(propertyA, propertyB, [
                  {
                    type: HoldRuleTypes.minSellIfHighEquityPercent,
                    propertyType: PropertyType.SingleFamily,
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
                  ruleType: HoldRuleTypes.minSellIfHighEquityPercent,
                  descriptor: { value: 20 },
                },
              ]);

              getInvestmentReasons.mockReturnValueOnce([
                {
                  ruleType: HoldRuleTypes.none,
                  descriptor: { value: 0 },
                },
              ]);

              expect(
                propertySort<HoldRuleTypes>(propertyA, propertyB, [
                  {
                    type: HoldRuleTypes.minSellIfHighEquityPercent,
                    propertyType: PropertyType.SingleFamily,
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
                  ruleType: HoldRuleTypes.none,
                  descriptor: { value: 0 },
                },
              ]);

              getInvestmentReasons.mockReturnValueOnce([
                {
                  ruleType: HoldRuleTypes.minSellIfHighEquityPercent,
                  descriptor: { value: 20 },
                },
              ]);

              expect(
                propertySort<HoldRuleTypes>(propertyA, propertyB, [
                  {
                    type: HoldRuleTypes.minSellIfHighEquityPercent,
                    propertyType: PropertyType.SingleFamily,
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
                  ruleType: HoldRuleTypes.minSellIfHighEquityPercent,
                  descriptor: { value: 1000 },
                },
              ]);

              getInvestmentReasons.mockReturnValueOnce([
                {
                  ruleType: HoldRuleTypes.minSellIfHighEquityPercent,
                  descriptor: { value: 20 },
                },
              ]);

              expect(
                propertySort<HoldRuleTypes>(propertyA, propertyB, [
                  {
                    type: HoldRuleTypes.minSellIfHighEquityPercent,
                    propertyType: PropertyType.SingleFamily,
                    value: 2000,
                    evaluate: jest.fn().mockReturnValueOnce(true),
                  },
                ])
              ).toEqual(0);
            });

            test('should return 0', () => {
              getInvestmentReasons.mockReturnValueOnce([
                {
                  ruleType: HoldRuleTypes.minSellIfHighEquityPercent,
                  descriptor: { value: 1000 },
                },
              ]);

              getInvestmentReasons.mockReturnValueOnce([
                {
                  ruleType: HoldRuleTypes.minSellIfHighEquityPercent,
                  descriptor: { value: 1000 },
                },
              ]);

              expect(
                propertySort<HoldRuleTypes>(propertyA, propertyB, [
                  {
                    type: HoldRuleTypes.minSellIfHighEquityPercent,
                    propertyType: PropertyType.SingleFamily,
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
});
