import { getMonthlyMortgage } from './get-monthly-mortgage';
import currency from '../formatters/currency';

/**
 * This gets you PITI!
 * @param purchasePrice
 * @param cashDownPercent
 * @param closingCostPercent
 * @param loanRatePercent annual percentage rate of your loan, like 3.25%
 * @param loanTermInYears 15 or 30 typically
 */
export function getMonthlyPrincipalInterestTaxInterest(
  purchasePrice: number,
  cashDownPercent: number,
  closingCostPercent: number,
  loanRatePercent: number,
  loanTermInYears = 30
): number {
  const avgTexasPropertyTaxPercent = 2.19;
  const annualTaxes: number = (purchasePrice * avgTexasPropertyTaxPercent) / 100;

  const fakeRateCalculation = 0.0053097345132743;
  const annualInsurance: number = purchasePrice * fakeRateCalculation;

  const monthlyMortgage = getMonthlyMortgage(
    purchasePrice,
    cashDownPercent,
    closingCostPercent,
    loanRatePercent,
    loanTermInYears
  );
  return currency(monthlyMortgage + annualTaxes / 12 + annualInsurance / 12);
}
