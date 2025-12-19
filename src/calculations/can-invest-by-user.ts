import { InvestmentReasons } from '../investments/investment-reasons';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { UserInvestResult } from '../investments/user-invest-result';
import { IRentalInvestorValidator, RentalInvestorValidator } from '../investments/rental-investor-validator';
import { IUserInvestorCheck } from '../account/i-user-investor-check';
import { getInvestmentReasonsForPurchaseTypes } from '../investments/investment-reasons-decorator';
import { getMinCostDownByRule } from './get-min-cost-down-by-rule';

/**
 * determines if a user can invest in a property.
 * @param rental
 * @param user
 * @param date
 * @param properties
 */
export function canInvestByUser(
  rental: IRentalPropertyEntity,
  user: IUserInvestorCheck,
  date: Date,
  properties: IRentalPropertyEntity[],
): IRentalInvestorValidator {
  const result = new RentalInvestorValidator();

  if (rental.isOwned) {
    result.results.push(new UserInvestResult(InvestmentReasons.PropertyIsAlreadyOwned, '', []));
    return result;
  }

  const minCostDownByRule = getMinCostDownByRule(rental, user.purchaseRules);
  if (!user.hasMoneyToInvest(date, properties, minCostDownByRule)) {
    result.results.push(
      new UserInvestResult(InvestmentReasons.UserHasNoMoneyToInvest, `user balance: ${user.ledgerCollection.getBalance(date)}`, [
        { name: 'balance', value: user.ledgerCollection.getBalance(date) },
      ]),
    );
  }

  if (!user.hasMinimumSavings(date, properties)) {
    result.results.push(
      new UserInvestResult(
        InvestmentReasons.UserHasNotSavedEnoughMoney,
        `user balance: ${user.ledgerCollection.getBalance(date)}, minimumSavings: ${user.getMinimumSavings(date, properties)}`,
        [{ name: 'balance', value: user.ledgerCollection.getBalance(date) }],
      ),
    );
  }

  if (!user.purchaseRules || user.purchaseRules.length === 0) {
    result.results.push(new UserInvestResult(InvestmentReasons.NoRules, 'user has no purchase rules', []));
    return result;
  }

  if (!result.canInvest) {
    return result;
  }

  // rules
  // 1. need to map to rule to property, eg: PurchaseRuleTypes.minEstimatedCashFlowPerMonth > this.monthlyCashFlow;
  const reasons = getInvestmentReasonsForPurchaseTypes<IRentalPropertyEntity>(rental).filter((r) => !r.isRuleNone());

  result.results.push(
    ...user.purchaseRules
      .map((userRule) => {
        const resultReasonToRule = reasons.find((reasonToRule) => reasonToRule.isRuleMatch(userRule.type));

        if (resultReasonToRule) {
          return resultReasonToRule.userResultEstimates(rental, user.holdRules, user.purchaseRules, date);
        }
        return [];
      })
      .flat()
      .filter((x) => x !== undefined),
  );

  return result;
}
