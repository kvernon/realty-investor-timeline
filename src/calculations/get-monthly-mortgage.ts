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
  const cashDown = (purchasePrice * cashDownPercent) / 100;
  const p = purchasePrice - cashDown;
  const i = loanRatePercent / 100 / 12;
  const n = loanTermInYears * 12;

  return (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}
