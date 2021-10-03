import { GoalRuleTypes } from './goal-rule-types';

export interface IGoalRule {
  type: GoalRuleTypes;
  value: number;
}
