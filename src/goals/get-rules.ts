import { GoalRuleTypes } from './goal-rule-types';
import { IGoalRule } from './i-goal-rule';
import { IGoalRuleEvaluation } from './i-goal-rule-evaluation';
import { GoalRule } from './goal-rule';
import { AtLeastOrMore, NoMoreThan } from './eval-types';

export function getRules(goals: IGoalRule[]): IGoalRuleEvaluation[] {
  if (!goals || goals.length === 0) {
    return [];
  }

  return goals.map((g: IGoalRule) => {
    const propertyName: string = Object.keys(GoalRuleTypes).find((x) => {
      const enumWithIndex: { [k: string]: string } = GoalRuleTypes;
      return enumWithIndex[x] === g.type;
    });

    if (propertyName !== GoalRuleTypes.none) {
      return new GoalRule(g.value, g.type, propertyName.indexOf('min') !== -1 ? AtLeastOrMore : NoMoreThan);
    }
  });
}
