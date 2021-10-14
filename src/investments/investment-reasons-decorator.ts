import 'reflect-metadata';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { InvestmentReasons } from './investment-reasons';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';

export interface IReasonToRule<T extends IRentalPropertyEntity, K extends keyof T, F extends T[K]> {
  investmentReason: InvestmentReasons;
  ruleType: PurchaseRuleTypes;
  propertyKey: K;
  descriptor: TypedPropertyDescriptor<F>;
}

/**
 * used to set up properties to help map results to InvestmentReasons
 * @constructor
 * @param investmentReason
 * @param [ruleType=PurchaseRuleTypes.none]
 */
export function InvestmentReason(
  investmentReason: InvestmentReasons,
  ruleType: PurchaseRuleTypes = PurchaseRuleTypes.none
) {
  return <T extends IRentalPropertyEntity, K extends keyof T & string, F extends T[K]>(
    target: T,
    propertyKey: K,
    descriptor: TypedPropertyDescriptor<F>
  ) => {
    const value: IReasonToRule<T, K, F> = {
      investmentReason,
      ruleType,
      propertyKey,
      descriptor,
    };

    // get own fields from the target
    let complexFields = Reflect.getOwnMetadata('design:type', target);
    if (!complexFields) {
      // merge with inherited fields, if available.
      complexFields = Reflect.hasMetadata('design:type', target)
        ? Reflect.getMetadata('design:type', target).slice(0)
        : [];

      // define own fields on the target
      Reflect.defineMetadata('design:type', complexFields, target);
    }

    // record complex field
    complexFields.push(propertyKey);

    Reflect.defineMetadata('design:type', value, target, propertyKey);
  };
}

/**
 * used to get the value for all properties
 * @param target
 * @constructor
 */
export function getInvestmentReasons<
  T extends IRentalPropertyEntity & object,
  K extends keyof T,
  F extends T[K] & number
>(target: T): IReasonToRule<T, K, F>[] {
  const keys = Reflect.getMetadata('design:type', target) as string[];

  return keys.map((k) => {
    return Reflect.getMetadata('design:type', target, k);
  });
}
