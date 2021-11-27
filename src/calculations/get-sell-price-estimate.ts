import { differenceInMonths } from 'date-fns';
import currency from '../formatters/currency';

export function getSellPriceEstimate(
  purchase: Date,
  sell: Date,
  purchasePrice: number,
  sellPriceAppreciationPercent: number
): number {
  const differenceInYears = Math.ceil(differenceInMonths(sell, purchase) / 12);

  let result = purchasePrice;
  for (let i = 0; i < differenceInYears; i++) {
    result = result + (result * sellPriceAppreciationPercent) / 100;
  }

  return currency(result);
}
