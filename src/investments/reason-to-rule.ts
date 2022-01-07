import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { PropertyType } from '../properties/property-type';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { InvestmentReasons } from './investment-reasons';
import { IRuleEvaluation } from '../rules/rule-evaluation';
import { UserInvestResult } from './user-invest-result';
import { UserResultEstimates } from './user-result-estimates';

export interface IReasonToRuleMeta<TR extends PurchaseRuleTypes | HoldRuleTypes> {
  investmentReason: InvestmentReasons;
  ruleType?: TR;
}

export interface IReasonToRule<T extends IRentalPropertyEntity, TR extends PurchaseRuleTypes | HoldRuleTypes>
  extends IReasonToRuleMeta<TR> {
  propertyType: PropertyType;
  propertyKey: keyof T & string;
  values: number[];

  isRuleAndPropertyTypeMatch: (propertyType: PropertyType, ruleType: TR) => boolean;

  isRuleMatch: (ruleType: TR) => boolean;

  isRuleNone(): boolean;

  getValueAtIndex(index: number): number;

  isValueGreater<T2 extends IRentalPropertyEntity>(rule: IReasonToRule<T2, TR>): boolean;

  userResultEstimates(
    rental: IRentalPropertyEntity,
    holdRules: IRuleEvaluation<HoldRuleTypes>[],
    purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[],
    date: Date
  ): UserInvestResult[];
}

export class ReasonToRule<T extends IRentalPropertyEntity, TR extends PurchaseRuleTypes | HoldRuleTypes>
  implements IReasonToRule<T, TR>
{
  private readonly overrideUserResultEstimates?: UserResultEstimates;

  constructor(
    investmentReason: InvestmentReasons,
    propertyType: PropertyType,
    propertyKey: keyof T & string,
    value: number[],
    ruleType?: TR,
    overrideUserResultEstimates?: UserResultEstimates
  ) {
    this.investmentReason = investmentReason;
    this.propertyType = propertyType;
    this.propertyKey = propertyKey;
    this.values = value;
    this.ruleType = ruleType;
    this.overrideUserResultEstimates = overrideUserResultEstimates;
  }

  isValueGreater<T2 extends IRentalPropertyEntity>(rule: IReasonToRule<T2, TR>): boolean {
    if (!rule) {
      return true;
    }

    if (this.values.length === 0 && rule.values.length === 0) {
      return true;
    }

    const maxLength = this.values.length >= rule.values.length ? this.values.length : rule.values.length;

    for (let i = 0; i < maxLength; i++) {
      if (this.getValueAtIndex(i) === rule.getValueAtIndex(i)) {
        continue;
      }

      if (this.getValueAtIndex(i) > rule.getValueAtIndex(i)) {
        return true;
      }
    }

    return false;
  }

  investmentReason: InvestmentReasons;

  isRuleAndPropertyTypeMatch(propertyType: PropertyType, ruleType: TR): boolean {
    return this.propertyType === propertyType && this.isRuleMatch(ruleType);
  }

  isRuleMatch(ruleType: TR): boolean {
    return this.ruleType === ruleType;
  }

  isRuleNone(): boolean {
    return !this.ruleType || this.ruleType === PurchaseRuleTypes.None || this.ruleType === HoldRuleTypes.None;
  }

  getValueAtIndex(index: number): number {
    if (index > this.values.length - 1) {
      return -1;
    }

    return this.values[index];
  }

  userResultEstimates(
    rental: IRentalPropertyEntity,
    holdRules: IRuleEvaluation<HoldRuleTypes>[],
    purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[],
    date: Date
  ): UserInvestResult[] {
    if (this.overrideUserResultEstimates) {
      return this.overrideUserResultEstimates(rental, holdRules, purchaseRules, date);
    }

    const rule = purchaseRules.find((p) => p.type === this.ruleType && p.propertyType === rental.propertyType);

    if (!rule) {
      return [];
    }

    return this.values.map((v) => {
      if (!rule.evaluate(v)) {
        return new UserInvestResult(this.investmentReason, `rule: ${rule.value} property: ${v}`);
      }
    });
  }

  propertyKey: keyof T & string;
  propertyType: PropertyType;
  ruleType: TR;
  values: number[];
}
