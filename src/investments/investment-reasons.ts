export enum InvestmentReasons {
  /**
   * unknown rule match
   */
  Unknown,

  /**
   * no rule applied
   */
  NoRules,
  /**
   * No money for the user to invest with at this time
   */
  UserHasNoMoneyToInvest,

  /**
   * The user has money, however, the user does not have enough to invest with at this time
   */
  UserHasNotSavedEnoughMoney,

  /**
   * The user wants a certain amount of Unrealized Capital Gain (Equity)
   */
  DoesNotMeetUserRuleEquityCapture,

  /**
   * The user wants a certain percent of annual cash flow
   */
  DoesNotMeetUserRuleCashOnCash,

  /**
   * The user wants a certain amount of annual cash flow
   */
  DoesNotMeetUserRuleAnnualCashFlow,

  /**
   * Property is already owned
   */
  PropertyIsAlreadyOwned,

  /**
   * Property's asking price, or market value, is not met
   */
  DoesNotMeetUserRuleAskingPrice,

  /**
   * Property's cost down, or out of pocket expense, is larger than desired
   */
  DoesNotMeetUserRuleOutOfPocket,

  /**
   * Properties capital gain percent from purchase is lower than expected
   */
  DoesNotMeetUserRuleCapitalGain,
}
