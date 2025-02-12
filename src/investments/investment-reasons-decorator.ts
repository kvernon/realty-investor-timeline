/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { InvestmentReasons } from './investment-reasons';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { IReasonToRule, IReasonToRuleMeta, ReasonToRule } from './reason-to-rule';
import { getEquityCaptureUserInvestmentResults } from '../calculations/get-equity-capture-user-investment-results';
import { getCostDownUserInvestmentResults } from '../calculations/get-cost-down-user-investment-results';
import { UserResultEstimates } from './user-result-estimates';

export type PropertyDecoratorType<T extends IRentalPropertyEntity> = (target: T, propertyKey: keyof T & string) => any;

/**
 * used to set up properties to help map results to InvestmentReasons
 * @constructor
 * @param investmentReason
 * @param ruleType
 * @param metaDataNameSuffix
 */
function InvestmentReason<TR extends PurchaseRuleTypes | HoldRuleTypes>(
  investmentReason: InvestmentReasons,
  ruleType: TR,
  metaDataNameSuffix: string
): PropertyDecoratorType<IRentalPropertyEntity> {
  return (target: IRentalPropertyEntity, propertyKey: keyof IRentalPropertyEntity & string): void => {
    const saveItem: IReasonToRuleMeta<TR> = {
      investmentReason,
      ruleType,
    };

    // get own fields from the target
    const metadataKey = `design:type:${metaDataNameSuffix}`;
    let complexFields = Reflect.getOwnMetadata(metadataKey, target);

    if (!complexFields) {
      // merge with inherited fields, if available.
      complexFields = Reflect.hasMetadata(metadataKey, target) ? Reflect.getMetadata(metadataKey, target).slice(0) : [];

      // define own fields on the target
      Reflect.defineMetadata(metadataKey, complexFields, target);
    }

    // record complex field
    if (!complexFields.some((fieldName: string) => fieldName === propertyKey)) {
      complexFields.push(propertyKey);
    }

    let currentMetadata = Reflect.getMetadata(metadataKey, target, propertyKey) as IReasonToRuleMeta<TR>[];

    if (!currentMetadata) {
      currentMetadata = [saveItem];
    } else if (
      !currentMetadata.some((x) => x.investmentReason === saveItem.investmentReason && x.ruleType === saveItem.ruleType)
    ) {
      currentMetadata.push(saveItem);
    }

    Reflect.defineMetadata(metadataKey, currentMetadata, target, propertyKey);
  };
}

export function InvestmentReasonForPurchaseRuleTypes(
  investmentReason: InvestmentReasons,
  ruleType: PurchaseRuleTypes
): PropertyDecoratorType<IRentalPropertyEntity> {
  return InvestmentReason<PurchaseRuleTypes>(investmentReason, ruleType, 'PurchaseRuleTypes');
}

export function InvestmentReasonForHoldRuleTypes(
  investmentReason: InvestmentReasons,
  ruleType: HoldRuleTypes
): PropertyDecoratorType<IRentalPropertyEntity> {
  return InvestmentReason<HoldRuleTypes>(investmentReason, ruleType, 'HoldRuleTypes');
}

/**
 * used to get the value for all properties
 * @param target
 * @param metaDataNameSuffix
 */
export function getInvestmentReasons<
  T extends IRentalPropertyEntity & object,
  TR extends PurchaseRuleTypes | HoldRuleTypes
>(target: T, metaDataNameSuffix: string): IReasonToRule<T, TR>[] {
  const metadataKey = `design:type:${metaDataNameSuffix}`;
  const keys = Reflect.getMetadata(metadataKey, target) as (keyof T & string)[];

  if (!keys) {
    return [];
  }

  return keys
    .map((k) => {
      const metadataCollection = Reflect.getMetadata(metadataKey, target, k) as IReasonToRuleMeta<TR>[];

      return metadataCollection.map((item) => {
        let override: UserResultEstimates;

        if (item.ruleType === PurchaseRuleTypes.MinEstimatedCapitalGainsPercent) {
          override = getEquityCaptureUserInvestmentResults;
        }

        if (item.ruleType === PurchaseRuleTypes.MaxEstimatedOutOfPocket) {
          override = getCostDownUserInvestmentResults;
        }

        let targetValue: number[] = [-1];
        if (Array.isArray(target[k])) {
          targetValue = <number[]>(<unknown>target[k]);
        } else if (typeof target[k] === 'number') {
          targetValue = [<number>(<unknown>target[k])];
        }

        return new ReasonToRule<T, TR>(
          item.investmentReason,
          target.propertyType,
          k,
          targetValue,
          item.ruleType,
          override
        );
      });
    })
    .flat();
}

export function getInvestmentReasonsForPurchaseTypes<T extends IRentalPropertyEntity & object>(
  target: T
): IReasonToRule<T, PurchaseRuleTypes>[] {
  return getInvestmentReasons<T, PurchaseRuleTypes>(target, 'PurchaseRuleTypes');
}
