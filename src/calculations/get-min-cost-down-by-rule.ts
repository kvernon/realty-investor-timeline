import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { IRuleEvaluation, PurchaseRuleTypes } from '../rules';
import { getInvestmentReasonsForPurchaseTypes } from '../investments/investment-reasons-decorator';

export function getMinCostDownByRule(
  rental: IRentalPropertyEntity,
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[]
): number {
  if (!rental) {
    throw new Error('Invalid Argument: rental is falsy');
  }

  const investmentReasonsForPurchaseTypes = getInvestmentReasonsForPurchaseTypes<IRentalPropertyEntity>(rental);

  const resultReasonToRule = investmentReasonsForPurchaseTypes.find((reasonToRule) =>
    reasonToRule.isRuleMatch(PurchaseRuleTypes.MaxEstimatedOutOfPocket)
  );

  if (!resultReasonToRule) {
    return -1;
  }

  const outOfPocket = purchaseRules.find(
    (x) => x.propertyType === rental.propertyType && x.type === PurchaseRuleTypes.MaxEstimatedOutOfPocket
  );

  if (outOfPocket) {
    return resultReasonToRule.values.find((v) => outOfPocket.evaluate(v)) || -1;
  }

  return resultReasonToRule.values[0];
}
