import { PurchaseRuleTypes } from './purchase-rule-types';
import { IRule } from './i-rule';
import { IRuleEvaluation, RuleEvaluation } from './rule-evaluation';
import { HoldRuleTypes } from './hold-rule-types';

export function getRules<E extends PurchaseRuleTypes | HoldRuleTypes>(goals: IRule<E>[]): IRuleEvaluation<E>[] {
  if (!goals || goals.length === 0) {
    return [];
  }
  return goals.map((g: IRule<E>) => new RuleEvaluation<E>(g.value, g.type, g.propertyType));
}
