/**
 *
 * @param purchasePrice
 * @param percentDown
 * @param closingCostPercent
 * @param loanRatePercent
 * @param yearOnLoan
 */
export function getMonthlyPrincipalInterestTaxInterest(
  purchasePrice: number,
  percentDown: number,
  closingCostPercent: number,
  loanRatePercent: number,
  yearOnLoan = 30
): number {
  const avgTexasPropertyTaxPercent = 2.19;
  const annualTaxes: number =
    (purchasePrice * avgTexasPropertyTaxPercent) / 100; //?

  const fakeRateCalculation = 0.0053097345132743;
  const annualInsurance: number = purchasePrice * fakeRateCalculation; //?

  const monthlyMortgage = getMonthlyMortgage(
    purchasePrice,
    percentDown,
    closingCostPercent,
    loanRatePercent,
    yearOnLoan
  );
  return monthlyMortgage + annualTaxes / 12 + annualInsurance / 12; //?
}

/**
 *
 * @param purchasePrice
 * @param percentDown
 * @param closingCostPercent
 * @param loanRatePercent
 * @param yearOnLoan
 */
export function getMonthlyMortgage(
  purchasePrice: number,
  percentDown: number,
  closingCostPercent: number,
  loanRatePercent: number,
  yearOnLoan = 30
): number {
  //formula for M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1].
  const cashDown = (purchasePrice * percentDown) / 100; //?
  const p = purchasePrice - cashDown; //?
  const i = loanRatePercent / 100 / 12; //?
  const n = yearOnLoan * 12; //?

  return (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}
