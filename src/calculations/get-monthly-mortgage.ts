import { differenceInMonths } from 'date-fns';
import currency from '../formatters/currency';

/**
 * formula for M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1].
 * @param purchasePrice
 * @param cashDownPercent
 * @param closingCostPercent
 * @param loanRatePercent
 * @param loanTermInYears
 */
export function getMonthlyMortgage(
  purchasePrice: number,
  cashDownPercent: number,
  closingCostPercent: number,
  loanRatePercent: number,
  loanTermInYears = 30
): number {
  const cashDown = getCashDown(purchasePrice, cashDownPercent);
  const p = purchasePrice - cashDown;
  const i = loanRatePercent / 100 / 12;
  const n = loanTermInYears * 12;

  const mort = (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  return currency(mort);
}

/**
 * returns the the total cash down for a single family home
 * @param purchasePrice
 * @param cashDownPercent
 */
export function getCashDown(purchasePrice: number, cashDownPercent: number) {
  return currency((purchasePrice * cashDownPercent) / 100);
}

export function getSellPriceEstimate(
  purchase: Date,
  sell: Date,
  purchasePrice: number,
  sellPriceAppreciationPercent: number
): number {
  const differenceInYears = Math.ceil(differenceInMonths(sell, purchase) / 12);

  let result = purchasePrice;
  for (let i = 0; i < differenceInYears; i++) {
    result = result + (result * sellPriceAppreciationPercent) / 100;
  }

  return currency(result);
}
