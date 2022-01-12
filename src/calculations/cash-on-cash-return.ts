import currency from '../formatters/currency';

/**
 * determines from the cash down you put on a property and the cash flow, it states how well you leveraged your money
 * @param annualCashFlow
 * @param costDownPrice
 * @returns returns a percentage value XX.XX%
 */
export function cashOnCashReturn(annualCashFlow: number, costDownPrice: number): number {
  if (annualCashFlow === 0) {
    return 0;
  }

  if (costDownPrice === 0) {
    return Infinity;
  }

  return currency((annualCashFlow / costDownPrice) * 100);
}
