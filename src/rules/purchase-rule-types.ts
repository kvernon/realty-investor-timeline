export enum PurchaseRuleTypes {
  None = 'none',

  /**
   * not implemented
   */
  MinAfterRepairPrice = 'minAfterRepairPrice',

  /**
   * implemented on SingleFamily
   */
  MinAskingPrice = 'minAskingPrice',

  /**
   * implemented on SingleFamily
   */
  MaxEstimatedOutOfPocket = 'maxEstimatedOutOfPocket',

  /**
   * implemented on SingleFamily and RentalPassiveApartment. This evaluates to monthly cash flow for
   * Single family while quarterly for passive
   */
  MinEstimatedMultiAnnualCashFlow = 'minEstimatedMultiAnnualCashFlow',

  /**
   * implemented for SingleFamily
   */
  MinEstimatedCapitalGains = 'minEstimatedCapitalGains',
}
