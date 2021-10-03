import { compareAsc, isEqual } from 'date-fns';
import { IEntityExistence, IPropertyEntity } from './i-property-entity';
import cloneDeep from 'lodash.clonedeep';

export class RentalSingleFamily implements IPropertyEntity, IEntityExistence {
  /**
   * unique identifier
   */
  id: string;

  /**
   * address of property
   */
  address: string;
  /**
   * date which property was generated or was available for purchase
   */
  availableStartDate: Date;

  /**
   * date which property was removed from the timeline.. think of it like someone else purchased this property
   */
  availableEndDate: Date;

  /**
   * At the time of purchase the ARV of the property
   */
  purchasePrice: number;

  /**
   * the percent at which the property's value grows, for the US it spans from 4% (2019) to 14.5% (2021), this will default to 4
   */
  sellPriceAppreciationPercent = 4;

  /**
   * lame way to apply {@link sellPriceAppreciationPercent} to rolling over the years the property was owned
   * @param today
   */
  sellPriceByDate(today: Date): number {
    const differenceInYears = today.getUTCFullYear() - this.purchaseDate.getUTCFullYear();

    let result = this.purchasePrice;
    for (let i = 0; i < differenceInYears; i++) {
      result = result + (result * this.sellPriceAppreciationPercent) / 100;
    }

    return result;
  }

  /**
   * the project monthly payment
   */
  monthlyPrincipalInterestTaxInterest: number;

  /**
   * the percent down on the property
   */
  cashDownPercent: number;

  /**
   * total rent price of the property
   */
  monthlyRentAmount: number;

  getEquityFromSell(today: Date): number {
    if (!this.soldDate) {
      return 0;
    }

    if (isEqual(this.soldDate, today)) {
      return this.sellPriceByDate(today);
    }

    return 0;
  }

  private getMinimalDate(value: Date | undefined): Date | undefined {
    if (!value) {
      return undefined;
    }

    return new Date(value.getUTCFullYear(), value.getUTCMonth(), 1);
  }

  private _purchaseDate: Date | undefined;

  /**
   * the date this property was acquired, and you receive investment cash
   */
  set purchaseDate(value: Date | undefined) {
    this._purchaseDate = this.getMinimalDate(value);
  }

  /**
   * the date this property was acquired, and you receive investment cash
   */
  get purchaseDate(): Date | undefined {
    return this._purchaseDate;
  }

  /**
   * the date this property was sold where you no longer receive investment cash
   */
  _soldDate: Date | undefined;

  /**
   * the date this property was sold where you no longer receive investment cash
   */
  set soldDate(value: Date | undefined) {
    this._soldDate = this.getMinimalDate(value);
  }

  /**
   * the date this property was sold where you no longer receive investment cash
   */
  get soldDate(): Date | undefined {
    return this._soldDate;
  }

  /**
   * number of years to hold the property before being sold, default is 0
   */
  minSellYears = 0;

  get minSellDate(): Date {
    return new Date(this.purchaseDate.getUTCFullYear() + this.minSellYears, this.purchaseDate.getUTCMonth(), 1);
  }

  /**
   * the rent minus monthly payment, default is zero
   */
  get monthlyCashFlow(): number {
    if (!this.monthlyRentAmount || !this.monthlyPrincipalInterestTaxInterest) {
      return 0;
    }
    return this.monthlyRentAmount - this.monthlyPrincipalInterestTaxInterest;
  }

  /**
   * 1. you must have purchased this home
   * 2. this home must not have been sold
   * @param today
   */
  getMonthlyCashFlowByDate(today: Date): number {
    if (!this.purchaseDate) {
      return 0;
    }

    if (!this.soldDate && compareAsc(this.purchaseDate, today) === -1) {
      return this.monthlyCashFlow;
    }

    return 0;
  }

  /**
   * make a copy
   */
  clone(): RentalSingleFamily {
    return Object.assign(new RentalSingleFamily(), cloneDeep(this));
  }
}
