import currency from '../formatters/currency';
import { getCostDown } from './get-cost-down';

/**
 * formula for M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1].
 * @param purchasePrice
 * @param cashDownPercent
 * @param closingCostPercent
 * @param loanRatePercent annual percentage rate of your loan, like 3.25%
 * @param loanTermInYears 15 or 30 typically
 */
export function getMonthlyMortgage(
  purchasePrice: number,
  cashDownPercent: number,
  closingCostPercent: number,
  loanRatePercent: number,
  loanTermInYears = 30
): number {
  const cashDown = getCostDown(purchasePrice, cashDownPercent);
  const p = purchasePrice - cashDown;
  const i = loanRatePercent / 100 / 12;
  const n = loanTermInYears * 12;

  const mort = (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  return currency(mort);
}
