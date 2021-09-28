import { EvalType } from './eval-type';
import { IGoalRule } from './i-goal-rule';

export interface IGoalRuleEvaluation extends IGoalRule {
  evalType: EvalType;
}
