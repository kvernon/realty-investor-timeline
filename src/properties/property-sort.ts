import { IRentalPropertyEntity } from './i-rental-property-entity';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { getInvestmentReasons, InvestmentReasons, IReasonToRule, ReasonToRule } from '../investments';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { getEnumTypeByValue } from '../rules/get-enum-type-by-value';

const findOrDefault = <TR extends PurchaseRuleTypes | HoldRuleTypes>(
  property: IRentalPropertyEntity,
  collection: IReasonToRule<IRentalPropertyEntity, TR>[],
  rule: IRuleEvaluation<TR>
): IReasonToRule<IRentalPropertyEntity, TR> => {
  return (
    collection.find((s) => s.isRuleMatch(rule.type)) ||
    new ReasonToRule<IRentalPropertyEntity, TR>(InvestmentReasons.Unknown, property.propertyType, 'id', [-1])
  );
};

/**
 * property sort based on rules order and property value
 * @param propertyA
 * @param propertyB
 * @param rules
 */
export default function propertySort<T extends PurchaseRuleTypes | HoldRuleTypes>(
  propertyA: IRentalPropertyEntity | null,
  propertyB: IRentalPropertyEntity | null,
  rules: IRuleEvaluation<T>[]
): number {
  if (!rules || rules.length === 0) {
    return -1;
  }

  if (!propertyA && !propertyB) {
    return -1;
  }

  if (propertyA && !propertyB) {
    return -1;
  }

  if (propertyB && !propertyA) {
    return 1;
  }

  const enumTypeByValue = getEnumTypeByValue(rules[0].type);
  const reasonsA = getInvestmentReasons<IRentalPropertyEntity, T>(propertyA, enumTypeByValue);
  const reasonsB = getInvestmentReasons<IRentalPropertyEntity, T>(propertyB, enumTypeByValue);

  if (reasonsA.length > 0 && reasonsB.length === 0) {
    return -1;
  }

  if (reasonsB.length > 0 && reasonsA.length === 0) {
    return 1;
  }

  for (const rule of rules) {
    const reasonsItemA = findOrDefault(propertyA, reasonsA, rule);
    const reasonsItemB = findOrDefault(propertyB, reasonsB, rule);

    if (reasonsItemB.isRuleNone() || reasonsItemA.isValueGreater(reasonsItemB)) {
      return -1;
    }

    if (reasonsItemA.isRuleNone() || reasonsItemB.isValueGreater(reasonsItemA)) {
      return 1;
    }
  }

  return 0;
}
