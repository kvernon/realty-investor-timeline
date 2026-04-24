import { differenceInMonths } from 'date-fns';
import currency from '../formatters/currency';

export function getSellPriceEstimate(purchase: Date, sell: Date, purchasePrice: number, sellPriceAppreciationPercent: number): number {
  const differenceInYears = Math.ceil(differenceInMonths(sell, purchase) / 12);

  return currency(purchasePrice * Math.pow(1 + sellPriceAppreciationPercent / 100, differenceInYears));
}
