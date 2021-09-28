export interface IMortgage {
  /**
   * approximate of what a property rate would be
   */
  loanRatePercent: number;

  /**
   * for the loan, how long would you do it for? typically it's stretch things out as much as possible, so 30 years!
   */
  loanTermInYears?: number;
}
