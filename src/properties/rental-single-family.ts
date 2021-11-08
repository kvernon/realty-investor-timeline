import 'reflect-metadata';
import { compareAsc, isEqual } from 'date-fns';
import cloneDeep from 'lodash.clonedeep';
import { IEntityExistence } from './i-entity-existence';
import { IRentalPropertyEntity } from './i-rental-property-entity';
import { IRentalSavings } from './i-rental-savings';
import { InvestmentReason } from '../investments/investment-reasons-decorator';
import { InvestmentReasons } from '../investments/investment-reasons';
import { IRentalInvestorValidator } from '../investments/rental-investor-validator';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { canInvestByUser } from '../calculations/can-invest-by-user';
import { UserInvestResult } from '../investments';
import { IUserInvestorCheck } from '../account/i-user-investor-check';

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

  isAvailableByDate(today: Date): boolean {
    return compareAsc(this.availableStartDate, today) === -1 && compareAsc(today, this.availableEndDate) === -1;
  }

  @InvestmentReason(InvestmentReasons.PropertyIsAlreadyOwned)
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

  @InvestmentReason(InvestmentReasons.DoesNotMeetUserRuleEquityCapture, PurchaseRuleTypes.minEstimatedCapitalGains)
  get projectedEquityCapture(): number {
    return this.purchasePrice - this.sellPriceInOneYear;
  }

  private get sellPriceInOneYear(): number {
    const date = new Date(this.purchaseDate);
    date.setUTCFullYear(this.purchaseDate.getUTCFullYear() + 1);
    return this.getSellPriceEstimate(this.purchaseDate, date);
  }

  private getSellPriceEstimate(purchase: Date, sell: Date): number {
    const differenceInYears = sell.getUTCFullYear() - purchase.getUTCFullYear();

    let result = this.purchasePrice;
    for (let i = 0; i < differenceInYears; i++) {
      result = result + (result * this.sellPriceAppreciationPercent) / 100;
    }

    return result;
  }

  /**
   * lame way to apply {@link sellPriceAppreciationPercent} to rolling over the years the property was owned
   * @param today
   */
  sellPriceByDate(today: Date): number {
    return this.getSellPriceEstimate(this.purchaseDate, today);
  }

  /**
   * the project monthly payment
   */
  monthlyPrincipalInterestTaxInterest: number;

  /**
   * the percent down on the property
   */
  cashDownPercent: number;

  get costDownPrice(): number {
    return this.purchasePrice * this.costDownPrice;
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

    if (isEqual(this.soldDate, today)) {
      return this.sellPriceByDate(today);
    }

    return 0;
  }

  /**
   * returns a UTC date from date supplied where it is {@code new Date(value.getUTCFullYear(), value.getUTCMonth(), 1)}
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
    if (!this.isOwned) {
      return false;
    }

    return compareAsc(this.minSellDate, today) !== -1 || isEqual(this.minSellDate, today);
  }

  get minSellDate(): Date {
    return new Date(this.purchaseDate.getUTCFullYear() + this.minSellYears, this.purchaseDate.getUTCMonth(), 1);
  }

  /**
   * the rent minus monthly payment, default is zero
   */
  @InvestmentReason(InvestmentReasons.DoesNotMeetUserRuleCashOnCash, PurchaseRuleTypes.minEstimatedCashFlowPerMonth)
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
   * used to determine what the cost of property is per month. If no purchase date or it has a sold date, then 0, otherwise there is an amount
   * @param today
   */
  getMonthlyPrincipalInterestTaxInterestByDate(today: Date): number {
    if (!this.purchaseDate) {
      return 0;
    }

    if (!this.soldDate && compareAsc(this.purchaseDate, today) === -1) {
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
}
