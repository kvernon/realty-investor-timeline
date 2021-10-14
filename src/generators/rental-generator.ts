import { GenerateProperty } from './factory-single-family';
import { IPropertyEntityOptions } from './i-property-entity-options';
import { ILoanSetting } from '../account/i-loan-settings';
import { IValueCache } from '../caching/value-cache';
import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';
import { randomNumberBetween } from '../utils/data-number';

export interface IRentalGenerator<T extends IRentalPropertyEntity> {
  getRentals(rentalClassType: new () => T, settings?: ILoanSetting[], today?: Date): T[];

  removeRentalById(id: string, rentalClassType: new () => T, today?: Date): void;
}

export class RentalGenerator<T extends IRentalPropertyEntity> implements IPropertyEntityOptions, IRentalGenerator<T> {
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

  private readonly generateProperty: GenerateProperty<T>;

  private userSettings: ILoanSetting[];

  constructor(cache: IValueCache<T>, generateProperty: GenerateProperty<T>) {
    this.rentalCache = cache;
    this.generateProperty = generateProperty;
  }

  getRentals(rentalClassType: new () => T, settings?: ILoanSetting[], today?: Date): T[] {
    if (!settings && !this.userSettings) {
      throw new Error('no settings found for user');
    }

    if (settings) {
      this.userSettings = settings;
    }

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
      this.rentalCache.getValue(today).push(
        this.generateProperty(
          this,
          {
            isAvailableByDate: jest.fn(),
            availableEndDate: this.rentalCache.expireDate,
            availableStartDate: today,
          },
          settings
        )
      );
    }

    return this.rentalCache.getValue(today);
  }

  removeRentalById(id: string, rentalClassType: new () => T, today?: Date): void {
    const rentals = this.getRentals(rentalClassType, this.userSettings, today);
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
