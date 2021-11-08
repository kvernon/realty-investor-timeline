import { IRentalPropertyEntity } from './i-rental-property-entity';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { getInvestmentReasons, InvestmentReasons } from '../investments';
import { IRuleEvaluation } from '../rules/rule-evaluation';

/**
 * property sort based on rules order and property value
 * @param propertyA
 * @param propertyB
 * @param purchaseRules
 */
export default function propertySort(
  propertyA: IRentalPropertyEntity,
  propertyB: IRentalPropertyEntity,
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[]
): number {
  if (!purchaseRules || purchaseRules.length === 0) {
    return -1;
  }

  const reasonsA = getInvestmentReasons<IRentalPropertyEntity, keyof IRentalPropertyEntity, number>(propertyA);
  const reasonsB = getInvestmentReasons<IRentalPropertyEntity, keyof IRentalPropertyEntity, number>(propertyB);

  if (reasonsA.length > 0 && reasonsB.length === 0) {
    return -1;
  }

  if (reasonsB.length > 0 && reasonsA.length === 0) {
    return 1;
  }

  for (let i = 0; i < purchaseRules.length; i++) {
    const r = purchaseRules[i];
    const reasonsItemA = reasonsA.find((s) => s.ruleType === r.type) || {
      ruleType: PurchaseRuleTypes.none,
      descriptor: { value: 0 },
      propertyKey: '',
      investmentReason: InvestmentReasons.Unknown,
    };
    const reasonsItemB = reasonsB.find((s) => s.ruleType === r.type) || {
      ruleType: PurchaseRuleTypes.none,
      descriptor: { value: 0 },
      propertyKey: '',
      investmentReason: InvestmentReasons.Unknown,
    };

    if (
      reasonsItemB.ruleType === PurchaseRuleTypes.none ||
      reasonsItemA.descriptor.value > reasonsItemB.descriptor.value
    ) {
      return -1;
    }

    if (
      reasonsItemA.ruleType === PurchaseRuleTypes.none ||
      reasonsItemA.descriptor.value > reasonsItemB.descriptor.value
    ) {
      return 1;
    }
  }

  return 0;
}
