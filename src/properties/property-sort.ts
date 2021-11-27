import { IRentalPropertyEntity } from './i-rental-property-entity';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { getInvestmentReasons, InvestmentReasons } from '../investments';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import { HoldRuleTypes } from '../rules/hold-rule-types';

/**
 * property sort based on rules order and property value
 * @param propertyA
 * @param propertyB
 * @param rule
 */
export default function propertySort<T extends PurchaseRuleTypes | HoldRuleTypes>(
  propertyA: IRentalPropertyEntity,
  propertyB: IRentalPropertyEntity,
  rule: IRuleEvaluation<T>[]
): number {
  if (!rule || rule.length === 0) {
    return -1;
  }

  const reasonsA = getInvestmentReasons<IRentalPropertyEntity, T>(propertyA);
  const reasonsB = getInvestmentReasons<IRentalPropertyEntity, T>(propertyB);

  if (reasonsA.length > 0 && reasonsB.length === 0) {
    return -1;
  }

  if (reasonsB.length > 0 && reasonsA.length === 0) {
    return 1;
  }

  for (let i = 0; i < rule.length; i++) {
    const r = rule[i];
    const reasonsItemA = reasonsA.find((s) => s.ruleType === r.type) || {
      ruleType: PurchaseRuleTypes.none,
      descriptor: { value: 0 },
      propertyKey: '',
      value: -1,
      investmentReason: InvestmentReasons.Unknown,
    };
    const reasonsItemB = reasonsB.find((s) => s.ruleType === r.type) || {
      ruleType: PurchaseRuleTypes.none,
      descriptor: { value: 0 },
      propertyKey: '',
      value: -1,
      investmentReason: InvestmentReasons.Unknown,
    };

    if (reasonsItemB.ruleType === PurchaseRuleTypes.none || reasonsItemA.value > reasonsItemB.value) {
      return -1;
    }

    if (reasonsItemA.ruleType === PurchaseRuleTypes.none || reasonsItemA.value > reasonsItemB.value) {
      return 1;
    }
  }

  return 0;
}
