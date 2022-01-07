import { PurchaseRuleTypes } from './purchase-rule-types';
import { HoldRuleTypes } from './hold-rule-types';

export function getEnumTypeByValue(value: string): 'None' | 'PurchaseRuleTypes' | 'HoldRuleTypes' {
  if (Object.values(PurchaseRuleTypes).some((x) => x === value)) {
    return 'PurchaseRuleTypes';
  }

  if (Object.values(HoldRuleTypes).some((x) => x === value)) {
    return 'HoldRuleTypes';
  }

  return 'None';
}
