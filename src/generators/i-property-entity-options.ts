export interface IPropertyEntityOptions {
  /**
   * used to generate a random price amount, this is the low value
   */
  lowestPurchasePrice: number;

  /**
   * used to generate a random price amount, this is the high value
   */
  highestPurchasePrice: number;

  /**
   * used to generate a random equity amount, this is the low value
   */
  lowestEquityCapturePercent: number;

  /**
   * used to generate a random equity amount, this is the high value
   */
  highestEquityCapturePercent: number;

  /**
   * for single family it's around 4%
   */
  lowestSellAppreciationPercent: number;

  /**
   * for single family it is as high as 14.5 %
   */
  highestSellAppreciationPercent: number;

  /**
   * typically 200 is the lowest
   */
  lowestCashFlow: number;

  /**
   * I've seen as high as 630 a month, but on average, depending on the area, I've seen 450 a month
   */
  highestCashFlow: number;

  /**
   * For Texas, you should hold for 1 year for the lowest tax rate, but you might want to hold it longer
   */
  lowestMinSellInYears: number;

  /**
   * For Texas, you should hold for 1 year for the lowest tax rate, but you might want to hold it longer
   */
  highestMinSellInYears?: number;
}
