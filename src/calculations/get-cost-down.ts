import currency from '../formatters/currency';

/**
 * returns the the total cash down for a single family home
 * @param purchasePrice
 * @param costDownPercent
 */
export function getCostDown(purchasePrice: number, costDownPercent: number) {
  return currency((purchasePrice * costDownPercent) / 100);
}
