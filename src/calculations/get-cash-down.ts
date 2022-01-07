import currency from '../formatters/currency';

/**
 * returns the the total cash down for a single family home
 * @param purchasePrice
 * @param cashDownPercent
 */
export function getCashDown(purchasePrice: number, cashDownPercent: number) {
  return currency((purchasePrice * cashDownPercent) / 100);
}
