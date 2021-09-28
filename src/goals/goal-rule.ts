import { EvalType } from './eval-type';
import { IGoalRuleEvaluation } from './i-goal-rule-evaluation';
import { GoalRuleTypes } from './goal-rule-types';

export class GoalRule implements IGoalRuleEvaluation {
  constructor(value: number, type: GoalRuleTypes, evalType: EvalType) {
    this.value = value;
    this.evalType = evalType;
    this.type = type;
  }

  evalType: EvalType;
  type: GoalRuleTypes;
  value: number;
}
