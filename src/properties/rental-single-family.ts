import 'reflect-metadata';
import { InvestmentReasons } from '../investments/investment-reasons';
import {
  InvestmentReasonForPurchaseRuleTypes,
  InvestmentReasonForHoldRuleTypes,
} from '../investments/investment-reasons-decorator';
import cloneDeep from 'lodash.clonedeep';
import { IEntityExistence } from './i-entity-existence';
import { IRentalPropertyEntity } from './i-rental-property-entity';
import { IRentalInvestorValidator } from '../investments/rental-investor-validator';
import { canInvestByUser } from '../calculations/can-invest-by-user';
import { IUserInvestorCheck } from '../account/i-user-investor-check';
import { cloneDateUtc } from '../utils/data-clone-date';
import areSameDate from '../utils/data-are-same-date';
import compareDates from '../utils/data-compare-date';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { PropertyType } from '../properties/property-type';
import { getSellPriceEstimate } from '../calculations/get-sell-price-estimate';
import { getCostDown } from '../calculations/get-cost-down';
import currency from '../formatters/currency';
import { returnOnCapitalGain } from '../calculations/return-on-capital-gain';
import { cashOnCashReturn } from '../calculations/cash-on-cash-return';

export class RentalSingleFamily implements IEntityExistence, IRentalPropertyEntity {
  readonly propertyType: PropertyType = PropertyType.SingleFamily;

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
   * used to compare {@link availableStartDate}, {@link today}, and {@link availableEndDate},
   * @param today
   */
  isAvailableByDate(today: Date): boolean {
    if (!this.availableStartDate) {
      return false;
    }

    return compareDates(this.availableStartDate, today) === -1 && compareDates(today, this.availableEndDate) === -1;
  }

  /**
   * looks at @{link wasPurchased} and checks if {@soldDate} is `undefined` or `null`
   */
  get isOwned(): boolean {
    return this.wasPurchased && !this.soldDate;
  }

  /**
   * a check to see if the property was purchased
   */
  get wasPurchased(): boolean {
    return !!this.purchaseDate;
  }

  /**
   * get a user, and other owned properties, to determine if a user can invest
   * @param user
   * @param date
   * @param properties
   */
  canInvestByUser(user: IUserInvestorCheck, date: Date, properties: IRentalPropertyEntity[]): IRentalInvestorValidator {
    return canInvestByUser(this, user, date, properties);
  }

  /**
   * At the time of purchase the ARV of the property
   */
  @InvestmentReasonForPurchaseRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleAskingPrice,
    PurchaseRuleTypes.MinAskingPrice
  )
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

  @InvestmentReasonForPurchaseRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleOutOfPocket,
    PurchaseRuleTypes.MaxEstimatedOutOfPocket
  )
  get costDownPrice(): number {
    return getCostDown(this.purchasePrice, this.cashDownPercent || 0);
  }

  /**
   * a range of amounts that the user can invest for the property: typically this is the {@link costDownPrice}
   */
  @InvestmentReasonForPurchaseRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleEquityCapture,
    PurchaseRuleTypes.MinEstimatedCapitalGainsPercent
  )
  get offeredInvestmentAmounts(): number[] {
    return [this.costDownPrice];
  }

  /**
   * Determines the equity of a sale by date. Note: {@link soldDate} must be populated and today and it must match
   * @param today
   */
  getEquityFromSell(today: Date): number {
    if (!this.soldDate) {
      return 0;
    }

    if (areSameDate(this.soldDate, today)) {
      return currency((this.sellPriceByDate(today) - this.costDownPrice) * (this.equityCapturePercent / 100));
    }

    return 0;
  }

  equityCapturePercent: number;

  /**
   * returns a UTC date from date supplied where it is
   * @example
   * new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), 1))
   * @param value
   * @private
   */
  private getMinimalDate(value: Date | undefined): Date | undefined {
    if (!value) {
      return undefined;
    }

    return cloneDateUtc(value);
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
   * number of years to hold the property before being sold, default is 0. and this is used to calculated the {@link minSellDate}
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

    return compareDates(this.minSellDate, today) <= 0 || areSameDate(this.minSellDate, today);
  }

  /**
   * projects when you can sell this property using {@link purchaseDate} and {@link minSellYears}
   */
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
  getCashFlowByDate(today: Date): number {
    if (!this.purchaseDate) {
      return 0;
    }

    if (!this.soldDate && compareDates(this.purchaseDate, today) === -1) {
      return this.rawCashFlow;
    }

    return 0;
  }

  /**
   * universal method to determine cash flow on a monthly basis
   * @param today
   */
  getEstimatedMonthlyCashFlow(today: Date): number {
    return this.getCashFlowByDate(today);
  }

  /**
   * used to determine what the cost of property is per month. If no purchase date or it has a sold date, then 0, otherwise there is an amount
   * @param today
   */
  getExpensesByDate(today: Date): number {
    if (!this.isOwned) {
      return 0;
    }

    if (!this.soldDate || compareDates(this.purchaseDate, today) === -1) {
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

  rawCashFlow: number;

  @InvestmentReasonForPurchaseRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleAnnualCashFlow,
    PurchaseRuleTypes.MinEstimatedAnnualCashFlow
  )
  @InvestmentReasonForHoldRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleAnnualCashFlow,
    HoldRuleTypes.MinSellIfLowCashFlowPercent
  )
  get rawEstimatedAnnualCashFlow(): number {
    return this.rawCashFlow === 0 ? 0 : this.rawCashFlow * 12;
  }

  @InvestmentReasonForPurchaseRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleCashOnCash,
    PurchaseRuleTypes.MinEstimatedAnnualCashFlow
  )
  get estimatedCashOnCashReturn(): number {
    return cashOnCashReturn(this.rawEstimatedAnnualCashFlow, this.costDownPrice);
  }

  @InvestmentReasonForPurchaseRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleCapitalGain,
    PurchaseRuleTypes.MinEstimatedCapitalGainsPercent
  )
  get estimatedReturnOnCapitalGain(): number {
    return returnOnCapitalGain(this.equityCapturePercent, this.costDownPrice);
  }
}
