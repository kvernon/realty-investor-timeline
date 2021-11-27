export enum HoldRuleTypes {
  /**
   * no rule
   */
  none = 'none',
  /**
   * this rule states that if you have a low cash flow %, then you'd like to sell it
   */
  minSellIfLowCashFlowPercent = 'minSellIfLowCashFlowPercent',

  /**
   * this rule states if you have high equity capture, then you'd like to sell it
   */
  minSellIfHighEquityPercent = 'minSellIfHighEquityPercent',

  /**
   * this rule states if you reach a x number of years, then you'd like to sell it
   */
  minSellInYears = 'minSellInYears',
}
