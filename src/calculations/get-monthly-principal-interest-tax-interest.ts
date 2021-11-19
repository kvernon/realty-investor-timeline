import { getMonthlyMortgage } from './get-monthly-mortgage';
import currency from '../formatters/currency';

/**
 * This gets you PITI!
 * @param purchasePrice
 * @param cashDownPercent
 * @param closingCostPercent
 * @param loanRatePercent
 * @param loanTermInYears
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
