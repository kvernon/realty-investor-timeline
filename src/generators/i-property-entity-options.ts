export interface IPropertyEntityOptions {
  lowestPriceDown: number;
  highestPriceDown: number;

  lowestEquityCapturePercent: number;
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
  lowestCashFlowMonthly: number;

  /**
   * I've seen as high as 630, but on average, depending on the area, I've seen 450
   */
  highestCashFlowMonthly: number;

  /**
   * For Texas, you should hold for 1 year for the lowest tax rate, but you might want to hold it longer
   */
  lowestMinSellInYears: number;

  /**
   * For Texas, you should hold for 1 year for the lowest tax rate, but you might want to hold it longer
   */
  highestMinSellInYears: number;
}
