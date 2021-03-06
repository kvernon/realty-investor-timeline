export enum HoldRuleTypes {
  /**
   * no rule
   */
  None = 'none',
  /**
   * this rule states that if you have a low cash flow %, then you'd like to sell it
   */
  MinSellIfLowCashFlowPercent = 'minSellIfLowCashFlowPercent',

  /**
   * this rule states if you have high equity capture, then you'd like to sell it. This is like Unrealized Capital Gain
   */
  MinSellIfHighEquityPercent = 'minSellIfHighEquityPercent',

  /**
   * this rule states if you reach an x number of years, then you'd like to sell it
   */
  MinSellInYears = 'minSellInYears',
}
