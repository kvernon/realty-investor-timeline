import { IPropertyEntity } from '../single-family/i-property-entity';
import { IValueCache } from '../caching/value-cache';
import { randomNumberBetween } from '../utils/data-number';
import { IPropertyEntityOptions } from './i-property-entity-options';
import { randomPropertyEntity } from '../utils/data-property-entity';

/**
 * used to dynamically create a rental and hydrate it
 * @param createOptions
 * @param rentalClassType
 */
export function create<T extends IPropertyEntity>(
  createOptions: Partial<IPropertyEntity>,
  rentalClassType: new () => T
): T {
  return <T>Object.assign(new rentalClassType(), createOptions);
}

export interface IRentalGenerator<T extends IPropertyEntity> {
  getRentals(rentalClassType: new () => T, today?: Date): T[];

  removeRentalById(id: string, rentalClassType: new () => T, today?: Date): void;
}

export class RentalGenerator<T extends IPropertyEntity> implements IPropertyEntityOptions, IRentalGenerator<T> {
  public maxRentalOpportunities: number;

  public lowestPriceDown: number;
  public highestPriceDown: number;

  /**
   * for single family it's around 4%
   */
  public lowestSellAppreciationPercent: number;

  /**
   * for single family it is as high as 14.5 %
   */
  public highestSellAppreciationPercent: number;

  public lowestMinSellInYears: number;
  public highestMinSellInYears: number;

  constructor(cache: IValueCache<T>) {
    this.rentalCache = cache;
  }

  getRentals(rentalClassType: new () => T, today?: Date): T[] {
    if (this.maxRentalOpportunities === 0) {
      this.rentalCache.setValue([], today);
      return this.rentalCache.getValue(today);
    }

    if (this.rentalCache.getValue(today).length > 0) {
      return this.rentalCache.getValue(today);
    }

    const totalRandom =
      this.maxRentalOpportunities === 1
        ? 1
        : randomNumberBetween(
            this.maxRentalOpportunities <= 1 ? 1 : this.maxRentalOpportunities,
            this.maxRentalOpportunities + 1
          );

    for (let i = 0; i < totalRandom; i++) {
      const createOptions = randomPropertyEntity(this);
      if (today) {
        createOptions.availableStartDate = today;
      }
      createOptions.availableEndDate = this.rentalCache.expireDate;

      this.rentalCache.getValue(today).push(create(createOptions, rentalClassType));
    }

    return this.rentalCache.getValue(today);
  }

  removeRentalById(id: string, rentalClassType: new () => T, today?: Date): void {
    const rentals = this.getRentals(rentalClassType, today);
    if (rentals.length === 0) {
      return;
    }

    this.rentalCache.setValue(
      rentals.filter((i) => i.id !== id),
      today
    );
  }

  private rentalCache: IValueCache<T>;
}
