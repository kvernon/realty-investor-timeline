import { PurchaseRuleTypes } from './purchase-rule-types';
import { HoldRuleTypes } from './hold-rule-types';
import { AtLeastOrMore, NoMoreThan } from './eval-types';
import { IRule } from './i-rule';
import { PropertyType } from '../properties/property-type';

export interface IRuleEvaluation<E extends PurchaseRuleTypes | HoldRuleTypes> extends IRule<E> {
  /**
   * Determines if the {@link dataValue} passes the rule
   * @param dataValue
   */
  evaluate(dataValue: number): boolean;
}

export class RuleEvaluation<E extends PurchaseRuleTypes | HoldRuleTypes> implements IRuleEvaluation<E> {
  constructor(value: number, type: E, propertyType: PropertyType) {
    this.value = value;
    this.type = type;
    this.propertyType = propertyType;
  }

  type: E;
  value: number;
  propertyType: PropertyType;

  /**
   * Determines if the {@link dataValue} passes the rule
   * @param dataValue
   */
  evaluate(dataValue: number): boolean {
    if (!this.type || this.type.toString().indexOf('none') !== -1) {
      return false;
    }

    if (this.type.toString().indexOf('min') !== -1) {
      return AtLeastOrMore(dataValue, this.value);
    }

    return NoMoreThan(dataValue, this.value);
  }
}
