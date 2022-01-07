import { getRules } from '../../src/rules/get-rules';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';
import { HoldRuleTypes } from '../../src/rules/hold-rule-types';
import { PropertyType } from '../../src/properties/property-type';

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
              type: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
              value: 1,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
              value: 2,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: PurchaseRuleTypes.MinAfterRepairPrice,
              value: 3,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: PurchaseRuleTypes.MinAskingPrice,
              value: 4,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: PurchaseRuleTypes.MinEstimatedAnnualCashFlow,
              value: 5,
              propertyType: PropertyType.SingleFamily,
            },
          ])
        ).toEqual([
          {
            type: PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
            propertyType: PropertyType.SingleFamily,
            value: 1,
          },
          {
            type: PurchaseRuleTypes.MaxEstimatedOutOfPocket,
            propertyType: PropertyType.SingleFamily,
            value: 2,
          },
          {
            type: PurchaseRuleTypes.MinAfterRepairPrice,
            propertyType: PropertyType.SingleFamily,
            value: 3,
          },
          {
            type: PurchaseRuleTypes.MinAskingPrice,
            propertyType: PropertyType.SingleFamily,
            value: 4,
          },
          {
            type: PurchaseRuleTypes.MinEstimatedAnnualCashFlow,
            propertyType: PropertyType.SingleFamily,
            value: 5,
          },
        ]);
      });
      test('with HoldRuleTypes, should return populated', () => {
        expect(
          getRules([
            {
              type: HoldRuleTypes.MinSellIfHighEquityPercent,
              value: 1,
              propertyType: PropertyType.SingleFamily,
            },
            {
              type: HoldRuleTypes.MinSellInYears,
              value: 2,
              propertyType: PropertyType.SingleFamily,
            },
          ])
        ).toEqual([
          {
            type: HoldRuleTypes.MinSellIfHighEquityPercent,
            propertyType: PropertyType.SingleFamily,
            value: 1,
          },
          {
            type: HoldRuleTypes.MinSellInYears,
            propertyType: PropertyType.SingleFamily,
            value: 2,
          },
        ]);
      });
    });
  });
});
