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
   * implemented on SingleFamily and RentalPassiveApartment.
   */
  MaxEstimatedOutOfPocket = 'maxEstimatedOutOfPocket',

  /**
   * implemented on SingleFamily and RentalPassiveApartment. Note: monthly cash flow for Single family
   * while quarterly for passive apartments
   */
  MinEstimatedAnnualCashFlow = 'minEstimatedAnnualCashFlow',

  /**
   * implemented on SingleFamily and RentalPassiveApartment. An estimation used to determine cash on cash percent
   */
  MinEstimatedCashOnCashPercent = 'minEstimatedCashOnCashPercent',

  /**
   * implemented for SingleFamily and RentalPassiveApartment.
   */
  MinEstimatedCapitalGainsPercent = 'minEstimatedCapitalGainsPercent',
}
