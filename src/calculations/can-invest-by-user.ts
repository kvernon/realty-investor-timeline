import { RentalSingleFamily } from '../properties/rental-single-family';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { IRentalSavings } from '../properties/i-rental-savings';
import { InvestmentReasons } from '../investments/investment-reasons';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { getInvestmentReasons } from '../investments/investment-reasons-decorator';
import { UserInvestResult } from '../investments/user-invest-result';
import { IRentalInvestorValidator, RentalInvestorValidator } from '../investments/rental-investor-validator';
import { IUserInvestorCheck } from '../account/i-user-investor-check';
import { getSellPriceEstimate } from './get-monthly-mortgage';
import { addYears } from 'date-fns';

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
    result.results.push(new UserInvestResult(InvestmentReasons.PropertyIsAlreadyOwned));
    return result;
  }

  if (!user.hasMoneyToInvest(date)) {
    result.results.push(
      new UserInvestResult(InvestmentReasons.UserHasNoMoneyToInvest, `user balance: ${user.getBalance(date)}`)
    );
    return result;
  }

  if (!user.hasMinimumSavings(date, properties)) {
    result.results.push(
      new UserInvestResult(InvestmentReasons.UserHasNotSavedEnoughMoney, `user balance: ${user.getBalance(date)}`)
    );
    return result;
  }

  if (!user.purchaseRules || user.purchaseRules.length === 0) {
    return result;
  }

  // rules
  const capGains = user.purchaseRules.find((x) => x.type === PurchaseRuleTypes.minEstimatedCapitalGains);
  if (capGains) {
    const inOneYear = addYears(date, 1);
    const sellPriceEstimate = getSellPriceEstimate(
      date,
      inOneYear,
      rental.purchasePrice,
      rental.sellPriceAppreciationPercent
    );
    if (!capGains.evaluate(sellPriceEstimate)) {
      result.results.push(
        new UserInvestResult(
          InvestmentReasons.DoesNotMeetUserRuleEquityCapture,
          `rule: ${capGains.value} value: ${sellPriceEstimate}`
        )
      );
    }
  }

  // 1. need to map to rule to property, eg: PurchaseRuleTypes.minEstimatedCashFlowPerMonth > this.monthlyCashFlow;
  const reasons = getInvestmentReasons<IRentalPropertyEntity>(rental).filter(
    (r) => r.ruleType !== PurchaseRuleTypes.none
  );

  const rulesFound = user.purchaseRules
    .map((userRule) => {
      const resultReasonToRule = reasons.find((reasonToRule) => userRule.type === reasonToRule.ruleType);

      if (resultReasonToRule) {
        const rentalProperty = <number>rental[resultReasonToRule.propertyKey];
        if (!userRule.evaluate(rentalProperty)) {
          return new UserInvestResult(
            resultReasonToRule.investmentReason,
            `rule: ${userRule.value} value: ${rentalProperty}`
          );
        }
      }
    })
    .filter((x) => x !== undefined);

  result.results.push(...rulesFound);

  return result;
}
