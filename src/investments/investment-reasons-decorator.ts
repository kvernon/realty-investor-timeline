/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { InvestmentReasons } from './investment-reasons';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';

export type PropertyDecoratorType<T extends IRentalPropertyEntity> = (target: T, propertyKey: keyof T & string) => any;

export interface IReasonToRule<T extends IRentalPropertyEntity> {
  investmentReason: InvestmentReasons;
  ruleType: PurchaseRuleTypes;
  propertyKey: keyof T & string;
  value: T[keyof T] & number;
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
): PropertyDecoratorType<IRentalPropertyEntity> {
  return (target: IRentalPropertyEntity, propertyKey: keyof IRentalPropertyEntity & string): any => {
    const saveItem: IReasonToRule<IRentalPropertyEntity> = {
      investmentReason,
      ruleType,
      propertyKey,
      value: <number>target[propertyKey],
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

    Reflect.defineMetadata('design:type', saveItem, target, propertyKey);
    return target[propertyKey];
  };
}

/**
 * used to get the value for all properties
 * @param target
 * @constructor
 */
export function getInvestmentReasons<T extends IRentalPropertyEntity & object>(target: T): IReasonToRule<T>[] {
  const keys = Reflect.getMetadata('design:type', target) as string[];

  return keys.map((k) => {
    return Reflect.getMetadata('design:type', target, k);
  });
}
