import { IPropertyEntity } from '../properties/i-property-entity';
import { IPropertyEntityOptions } from '../generators/i-property-entity-options';
import { randomNumberBetween } from './data-number';
import { Chance } from 'chance';

export type RandomPropertyEntity = (options: IPropertyEntityOptions) => Partial<IPropertyEntity>;
const chance: Chance.Chance = new Chance();

/**
 * used to generate the basic entity options, which will create id, minSellYears, sellPriceAppreciationPercent, address, and carry over purchasePrice
 * @param options
 */
export const randomPropertyEntity: RandomPropertyEntity = (
  options: IPropertyEntityOptions
): Partial<IPropertyEntity> => {
  //this seems like cost down.
  const purchasePrice = randomNumberBetween(options.lowestPricePrice, options.highestPricePrice);
  const randomCashFlow = randomNumberBetween(options.lowestCashFlow, options.highestCashFlow);

  return {
    id: chance.hash({ length: 10 }),
    minSellYears: randomNumberBetween(options.lowestMinSellInYears, options.highestMinSellInYears),
    purchasePrice,
    sellPriceAppreciationPercent: randomNumberBetween(
      options.lowestSellAppreciationPercent,
      options.highestSellAppreciationPercent
    ),
    equityCapturePercent: randomNumberBetween(options.lowestEquityCapturePercent, options.highestEquityCapturePercent),
    address: chance.address(),
    rawCashFlow: randomCashFlow,
  };
};
