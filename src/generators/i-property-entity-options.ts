export interface IPropertyEntityOptions {
  lowestPriceDown: number;
  highestPriceDown: number;

  /**
   * for single family it's around 4%
   */
  lowestSellAppreciationPercent: number;

  /**
   * for single family it is as high as 14.5 %
   */
  highestSellAppreciationPercent: number;

  lowestMinSellInYears: number;
  highestMinSellInYears: number;
}
