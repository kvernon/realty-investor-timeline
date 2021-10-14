import { RuleEvaluation } from '../../src/rules/rule-evaluation';
import { Chance } from 'chance';
import { HoldRuleTypes } from '../../src/rules/hold-rule-types';
import { PurchaseRuleTypes } from '../../src/rules/purchase-rule-types';

describe('RuleEvaluation unit tests', () => {
  let chance: Chance.Chance;
  let instance;

  beforeEach(() => {
    chance = new Chance();
  });

  describe('and evaluate', () => {
    describe('and none', () => {
      test('should be falsy', () => {
        instance = new RuleEvaluation(
          chance.integer({ min: 1, max: 500 }),
          chance.bool() ? HoldRuleTypes.none : PurchaseRuleTypes.none
        );

        expect(instance.evaluate(instance.value + 20)).toBeFalsy();
      });
    });

    describe('and a min...', () => {
      describe('and greater', () => {
        test('should be truthy', () => {
          instance = new RuleEvaluation(
            chance.integer({ min: 1, max: 500 }),
            chance.bool() ? HoldRuleTypes.minSellInYears : PurchaseRuleTypes.minAfterRepairPrice
          );

          expect(instance.evaluate(instance.value + 1)).toBeTruthy();
        });
      });
      describe('and less', () => {
        test('should be falsy', () => {
          instance = new RuleEvaluation(
            chance.integer({ min: 1, max: 500 }),
            chance.bool() ? HoldRuleTypes.minSellInYears : PurchaseRuleTypes.minAfterRepairPrice
          );

          expect(instance.evaluate(instance.value - 1)).toBeFalsy();
        });
      });
    });
    describe('and a max...', () => {
      describe('and greater', () => {
        test('should be falsy', () => {
          instance = new RuleEvaluation(
            chance.integer({ min: 1, max: 500 }),
            PurchaseRuleTypes.maxEstimatedOutOfPocket
          );

          expect(instance.evaluate(instance.value + 1)).toBeFalsy();
        });
      });
      describe('and less', () => {
        test('should be truthy', () => {
          instance = new RuleEvaluation(
            chance.integer({ min: 1, max: 500 }),
            PurchaseRuleTypes.maxEstimatedOutOfPocket
          );

          expect(instance.evaluate(instance.value - 1)).toBeTruthy();
        });
      });
    });
  });
});
