import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { PropertyType } from '../properties/property-type';
import { HoldRuleTypes, IRuleEvaluation, PurchaseRuleTypes } from '../rules';
import { addYears } from 'date-fns';
import { getSellPriceEstimate } from './get-sell-price-estimate';
import { getEquityCaptureAmount } from './get-equity-capture-amount';
import { getInvestmentPercent } from './get-investment-percent';
import { getInvestmentReasonsForPurchaseTypes } from '../investments/investment-reasons-decorator';
import { UserInvestResult } from '../investments/user-invest-result';
import { UserResultEstimates } from '../investments/user-result-estimates';

export const getEquityCaptureUserInvestmentResults: UserResultEstimates = (
  rental: IRentalPropertyEntity,
  holdRules: IRuleEvaluation<HoldRuleTypes>[],
  purchaseRules: IRuleEvaluation<PurchaseRuleTypes>[],
  date: Date,
): UserInvestResult[] => {
  if (!rental) {
    throw new Error('Invalid Argument: rental is falsy');
  }

  const maxCapGains = purchaseRules.find(
    (x) => x.propertyType === rental.propertyType && x.type === PurchaseRuleTypes.MinEstimatedCapitalGainsPercent,
  );

  if (!maxCapGains) {
    return [];
  }

  const resultReasonToRule = getInvestmentReasonsForPurchaseTypes<IRentalPropertyEntity>(rental).find((reasonToRule) =>
    reasonToRule.isRuleMatch(maxCapGains.type),
  );

  if (!resultReasonToRule) {
    return [];
  }

  const minYears = (holdRules || []).find((x) => x.type === HoldRuleTypes.MinSellInYears && x.propertyType === rental.propertyType);

  const inHoldYears = addYears(date, minYears?.value || 1);

  const sellPriceEstimate = getSellPriceEstimate(date, inHoldYears, rental.purchasePrice, rental.sellPriceAppreciationPercent);

  const userInvestResults = resultReasonToRule.values.map((v) => {
    let investmentPercent = 100;

    if (rental.propertyType === PropertyType.PassiveApartment) {
      investmentPercent = getInvestmentPercent(v, rental.purchasePrice);
    }

    const equityCaptureAmount = getEquityCaptureAmount(investmentPercent, v, sellPriceEstimate);
    if (!maxCapGains.evaluate(equityCaptureAmount)) {
      return new UserInvestResult(resultReasonToRule.investmentReason, `rule: ${maxCapGains.value} property: ${equityCaptureAmount}`, [
        { value: maxCapGains.value, name: 'rule' },
        { value: equityCaptureAmount, name: 'property' },
      ]);
    }
    return null;
  });

  if (userInvestResults.some((x) => x === null)) {
    return [];
  }

  return userInvestResults;
};
