import { IPropertyEntity } from '../single-family/i-property-entity';
import { IPropertyEntityOptions } from '../generators/i-property-entity-options';
import { randomNumberBetween } from './data-number';
import { Chance } from 'chance';

const chance: Chance.Chance = new Chance();

/**
 * used to generate the basic entity options
 * @param options
 */
export function randomPropertyEntity(options: IPropertyEntityOptions): Partial<IPropertyEntity> {
  const purchasePrice = randomNumberBetween(options.lowestPriceDown, options.highestPriceDown);
  return {
    id: chance.guid({ version: 4 }),
    minSellYears: randomNumberBetween(options.lowestMinSellInYears, options.highestMinSellInYears),
    purchasePrice,
    sellPriceAppreciationPercent:
      (randomNumberBetween(options.lowestSellAppreciationPercent, options.highestSellAppreciationPercent) / 100) *
      purchasePrice,
    address: chance.address(),
  };
}
