jest.mock('../../src/goals/eval-types');

import { AtLeastOrMore, NoMoreThan } from '../../src/goals/eval-types';
import { getRules } from '../../src/goals/get-rules';
import { GoalRuleTypes } from '../../src/goals/goal-rule-types';

describe('getRules unit tests', () => {
  describe('and getting goals', () => {
    describe('and goal undefined', () => {
      test('should return empty', () => {
        expect(getRules(undefined)).toEqual([]);
      });
    });
    describe('and goal empty', () => {
      test('should return empty', () => {
        expect(getRules([])).toEqual([]);
      });
    });
    describe('and goal populated', () => {
      test('should return empty', () => {
        expect(
          getRules([
            {
              type: GoalRuleTypes.minEstimatedCapitalGains,
              value: 1,
            },
            {
              type: GoalRuleTypes.maxEstimatedOutOfPocket,
              value: 2,
            },
            {
              type: GoalRuleTypes.minAfterRepairPrice,
              value: 3,
            },
            {
              type: GoalRuleTypes.minAskingPrice,
              value: 4,
            },
            {
              type: GoalRuleTypes.minEstimatedCashflowPerMonth,
              value: 5,
            },
          ])
        ).toEqual([
          {
            evalType: AtLeastOrMore,
            type: GoalRuleTypes.minEstimatedCapitalGains,
            value: 1,
          },
          {
            evalType: NoMoreThan,
            type: GoalRuleTypes.maxEstimatedOutOfPocket,
            value: 2,
          },
          {
            evalType: AtLeastOrMore,
            type: GoalRuleTypes.minAfterRepairPrice,
            value: 3,
          },
          {
            evalType: AtLeastOrMore,
            type: GoalRuleTypes.minAskingPrice,
            value: 4,
          },
          {
            evalType: AtLeastOrMore,
            type: GoalRuleTypes.minEstimatedCashflowPerMonth,
            value: 5,
          },
        ]);
      });
    });
  });
});
