import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { HoldRuleTypes, IRuleEvaluation, PurchaseRuleTypes } from '../rules';
import { UserInvestResult } from '../investments/user-invest-result';
import { getInvestmentReasonsForPurchaseTypes } from '../investments/investment-reasons-decorator';
import { UserResultEstimates } from '../investments/user-result-estimates';

export const getCostDownUserInvestmentResults: UserResultEstimates = (
  rental: IRentalPropertyEntity,
  _holdRules: IRuleEvaluation<HoldRuleTypes>[],
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[]
): UserInvestResult[] => {
  if (!rental) {
    throw new Error('Invalid Argument: rental is falsy');
  }

  const outOfPocket = purchaseRules.find(
    (x) => x.propertyType === rental.propertyType && x.type === PurchaseRuleTypes.MaxEstimatedOutOfPocket
  );

  if (!outOfPocket) {
    return [];
  }

  const resultReasonToRule = getInvestmentReasonsForPurchaseTypes<IRentalPropertyEntity>(rental).find((reasonToRule) =>
    reasonToRule.isRuleMatch(outOfPocket.type)
  );

  if (!resultReasonToRule) {
    return [];
  }

  const userInvestResults = resultReasonToRule.values.map((v) => {
    if (!outOfPocket.evaluate(v)) {
      return new UserInvestResult(resultReasonToRule.investmentReason, `rule: ${outOfPocket.value} property: ${v}`);
    }
    return null;
  });

  if (userInvestResults.some((x) => x === null)) {
    return [];
  }

  return userInvestResults;
};
