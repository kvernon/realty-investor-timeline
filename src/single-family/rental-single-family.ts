import { isEqual, compareAsc } from "date-fns";

export class RentalSingleFamily {
  /**
   * At the time of purchase the ARV of the property
   */
  purchasePrice: number;

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

  /**
   * the projected equity you can receive once the property is sold
   */
  rawEquity: number;

  getEquityFromSell(today: Date): number {
    if (!this.soldDate) {
      return 0;
    }

    if (isEqual(this.soldDate, today)) {
      return this.rawEquity;
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
    return new Date(
      this.purchaseDate.getUTCFullYear() + this.minSellYears,
      this.purchaseDate.getUTCMonth(),
      1
    );
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

    if (
      compareAsc(this.purchaseDate, today) === 1 &&
      compareAsc(this.soldDate, today) > 1
    ) {
      return 0;
    }

    return 0;
  }
}
