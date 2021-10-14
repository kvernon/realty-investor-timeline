import { RentalSingleFamily } from '../properties/rental-single-family';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { IRentalSavings } from '../properties/i-rental-savings';
import { InvestmentReasons } from '../investments/investment-reasons';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { getInvestmentReasons } from '../investments/investment-reasons-decorator';
import { UserInvestResult } from '../investments/user-invest-result';
import { IRentalInvestorValidator, RentalInvestorValidator } from '../investments/rental-investor-validator';
import { IUserInvestorCheck } from '../account/i-user-investor-check';

/**
 * determines if a user can invest in a property.
 * @param rental
 * @param user
 * @param date
 * @param properties
 */
export function canInvestByUser(
  rental: RentalSingleFamily,
  user: IUserInvestorCheck,
  date: Date,
  properties: IRentalSavings[]
): IRentalInvestorValidator {
  const result = new RentalInvestorValidator();

  if (rental.isOwned) {
    result.results.push(new UserInvestResult(false, InvestmentReasons.PropertyIsAlreadyOwned));
    return result;
  }

  if (!user.hasMoneyToInvest(date)) {
    result.results.push(new UserInvestResult(false, InvestmentReasons.UserHasNoMoneyToInvest));
    return result;
  }

  if (!user.ledger.hasMinimumSavings(date, properties)) {
    result.results.push(new UserInvestResult(false, InvestmentReasons.UserHasNotSavedEnoughMoney));
    return result;
  }

  if (!user.purchaseRules || user.purchaseRules.length === 0) {
    return result;
  }

  // rules
  // 1. need to map to rule to property, eg: PurchaseRuleTypes.minEstimatedCashFlowPerMonth > this.monthlyCashFlow;
  const reasons = getInvestmentReasons<IRentalPropertyEntity, keyof IRentalPropertyEntity, number>(rental).filter(
    (r) => r.ruleType !== PurchaseRuleTypes.none
  );

  const rulesFound = user.purchaseRules
    .map((userRule) => {
      const resultReasonToRule = reasons.find((reasonToRule) => userRule.type === reasonToRule.ruleType);

      if (resultReasonToRule) {
        return new UserInvestResult(
          userRule.evaluate(resultReasonToRule.descriptor.value),
          resultReasonToRule.investmentReason
        );
      }
    })
    .filter((x) => x !== undefined);

  result.results.push(...rulesFound);

  return result;
}
