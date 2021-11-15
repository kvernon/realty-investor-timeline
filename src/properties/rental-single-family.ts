import 'reflect-metadata';
import cloneDeep from 'lodash.clonedeep';
import { IEntityExistence } from './i-entity-existence';
import { IRentalPropertyEntity } from './i-rental-property-entity';
import { IRentalSavings } from './i-rental-savings';
import { InvestmentReason } from '../investments/investment-reasons-decorator';
import { InvestmentReasons } from '../investments/investment-reasons';
import { IRentalInvestorValidator } from '../investments/rental-investor-validator';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { canInvestByUser } from '../calculations/can-invest-by-user';
import { IUserInvestorCheck } from '../account/i-user-investor-check';
import { getCashDown, getSellPriceEstimate } from '../calculations/get-monthly-mortgage';
import cloneDateUtc from '../utils/data-clone-date';
import areSameDate from '../utils/data-are-same-date';
import compareDates from '../utils/data-compare-date';

export class RentalSingleFamily implements IEntityExistence, IRentalSavings, IRentalPropertyEntity {
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
   * used to compare {@link availableStartDate}, {@param today}, and {@link availableEndDate},
   * @param today
   */
  isAvailableByDate(today: Date): boolean {
    if (!this.availableStartDate) {
      return false;
    }

    return compareDates(this.availableStartDate, today) === -1 && compareDates(today, this.availableEndDate) === -1;
  }

  get isOwned(): boolean {
    return this.purchaseDate && !this.soldDate;
  }

  /**
   * get a user, and other owned properties, to determine if a user can invest
   * @param user
   * @param date
   * @param properties
   */
  canInvestByUser(user: IUserInvestorCheck, date: Date, properties: IRentalSavings[]): IRentalInvestorValidator {
    return canInvestByUser(this, user, date, properties);
  }

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
    return getSellPriceEstimate(this.purchaseDate, today, this.purchasePrice, this.sellPriceAppreciationPercent);
  }

  /**
   * the project monthly payment
   */
  monthlyPrincipalInterestTaxInterest: number;

  /**
   * the percent down on the property xx out of 100, or 23% as an example
   */
  cashDownPercent: number;

  get costDownPrice(): number {
    return getCashDown(this.purchasePrice, this.cashDownPercent || 0);
  }

  /**
   * total rent price of the property
   */
  monthlyRentAmount: number;

  /**
   * Determines the equity of a sale by date. Note: {@link soldDate} must be populated and today and it must match
   * @param today
   */
  getEquityFromSell(today: Date): number {
    if (!this.soldDate) {
      return 0;
    }

    if (areSameDate(this.soldDate, today)) {
      return (this.sellPriceByDate(today) - this.costDownPrice) * (this.equityCapturePercent / 100);
    }

    return 0;
  }

  equityCapturePercent: number;

  /**
   * returns a UTC date from date supplied where it is {@code new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), 1))}
   * @param value
   * @private
   */
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

  /**
   * looks at {@link isOwned} and also compares dates to see if the property can sell;
   * @param today
   */
  canSell(today: Date): boolean {
    if (!this.isOwned || !today) {
      return false;
    }

    return compareDates(this.minSellDate, today) !== -1 || areSameDate(this.minSellDate, today);
  }

  get minSellDate(): Date {
    const minDate = cloneDateUtc(this.purchaseDate);
    minDate.setUTCFullYear(minDate.getUTCFullYear() + this.minSellYears);
    return minDate;
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

    if (!this.soldDate && compareDates(this.purchaseDate, today) === -1) {
      return this.monthlyCashFlow;
    }

    return 0;
  }

  /**
   * used to determine what the cost of property is per month. If no purchase date or it has a sold date, then 0, otherwise there is an amount
   * @param today
   */
  getMonthlyPrincipalInterestTaxInterestByDate(today: Date): number {
    if (!this.purchaseDate) {
      return 0;
    }

    if (!this.soldDate && compareDates(this.purchaseDate, today) === -1) {
      return this.monthlyPrincipalInterestTaxInterest;
    }

    return 0;
  }

  /**
   * make a copy
   */
  clone(): RentalSingleFamily {
    return Object.assign(new RentalSingleFamily(), cloneDeep(this));
  }

  @InvestmentReason(InvestmentReasons.DoesNotMeetUserRuleCashOnCash, PurchaseRuleTypes.minEstimatedCashFlowPerMonth)
  monthlyCashFlow: number;
}
