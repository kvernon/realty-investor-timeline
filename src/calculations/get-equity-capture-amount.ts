import currency from '../formatters/currency';

/**
 *
 * @param investmentPercent this is xx.xx% number
 * @param purchasePrice
 * @param salePrice
 */
export function getEquityCaptureAmount(investmentPercent: number, purchasePrice: number, salePrice: number): number {
  if (!investmentPercent || !purchasePrice) {
    return 0;
  }

  const equity = salePrice - purchasePrice;
  return currency((equity * investmentPercent) / 100);
}
