import currency from '../formatters/currency';

/**
 * takes unrealized capital gain (equity or profit from sell) and divides it against cash down to determine return on capital gain
 * @param unrealizedCapitalGain currently equity is subbed in. In actuality it's potential money gained from the sale of a property
 * @param costDownPrice
 * @returns returns a percentage value XX.XX%
 */
export function returnOnCapitalGain(unrealizedCapitalGain: number, costDownPrice: number): number {
  if (unrealizedCapitalGain === 0) {
    return 0;
  }

  if (costDownPrice === 0) {
    return Infinity;
  }

  return currency((unrealizedCapitalGain / costDownPrice) * 100);
}
