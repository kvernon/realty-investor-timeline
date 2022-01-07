import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import { UserInvestResult } from './user-invest-result';

export type UserResultEstimates = (
  rental: IRentalPropertyEntity,
  holdRules: IRuleEvaluation<HoldRuleTypes>[],
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[],
  date: Date
) => UserInvestResult[];
