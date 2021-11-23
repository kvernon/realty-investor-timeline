import { getRules } from '../../src/rules/get-rules';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { HoldRuleTypes } from '../../src/rules/hold-rule-types';
import { PropertyType } from '../../src/account/property-type';

describe('getRules unit tests', () => {
  describe('and getting rules', () => {
    describe('and goal undefined', () => {
      test('should return empty', () => {
        expect(getRules<PurchaseRuleTypes>(undefined)).toEqual([]);
      });
    });
    describe('and goal empty', () => {
      test('should return empty', () => {
        expect(getRules<PurchaseRuleTypes>([])).toEqual([]);
      });
    });
    describe('and goal populated', () => {
      test('with PurchaseRuleTypes, should return populated', () => {
        expect(
          getRules([
            {
              type: PurchaseRuleTypes.minEstimatedCapitalGains,
              value: 1,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: PurchaseRuleTypes.maxEstimatedOutOfPocket,
              value: 2,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: PurchaseRuleTypes.minAfterRepairPrice,
              value: 3,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: PurchaseRuleTypes.minAskingPrice,
              value: 4,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: PurchaseRuleTypes.minEstimatedCashFlowPerMonth,
              value: 5,
              propertyType: PropertyType.SingleFamily,
            },
          ])
        ).toEqual([
          {
            type: PurchaseRuleTypes.minEstimatedCapitalGains,
            value: 1,
          },
          {
            type: PurchaseRuleTypes.maxEstimatedOutOfPocket,
            value: 2,
          },
          {
            type: PurchaseRuleTypes.minAfterRepairPrice,
            value: 3,
          },
          {
            type: PurchaseRuleTypes.minAskingPrice,
            value: 4,
          },
          {
            type: PurchaseRuleTypes.minEstimatedCashFlowPerMonth,
            value: 5,
          },
        ]);
      });
      test('with HoldRuleTypes, should return populated', () => {
        expect(
          getRules([
            {
              type: HoldRuleTypes.minSellIfHighEquityPercent,
              value: 1,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: HoldRuleTypes.minSellInYears,
              value: 2,
              propertyType: PropertyType.SingleFamily,
            },
          ])
        ).toEqual([
          {
            type: HoldRuleTypes.minSellIfHighEquityPercent,
            value: 1,
          },
          {
            type: HoldRuleTypes.minSellInYears,
            value: 2,
          },
        ]);
      });
    });
  });
});
