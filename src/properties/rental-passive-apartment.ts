import { IEntityExistence } from './i-entity-existence';
import { IRentalPropertyEntity } from './i-rental-property-entity';
import { IRentalInvestorValidator } from '../investments/rental-investor-validator';
import compareDates from '../utils/data-compare-date';
import { IUserInvestorCheck } from '../account/i-user-investor-check';
import { canInvestByUser } from '../calculations/can-invest-by-user';
import { PropertyType } from './property-type';
import { cloneDateUtc } from '../utils/data-clone-date';
import areSameDate from '../utils/data-are-same-date';
import cloneDeep from 'lodash.clonedeep';
import { InvestmentReasonForHoldRuleTypes, InvestmentReasonForPurchaseRuleTypes } from '../investments/investment-reasons-decorator';
import { InvestmentReasons } from '../investments/investment-reasons';
import { PurchaseRuleTypes } from '../rules/purchase-rule-types';
import { HoldRuleTypes } from '../rules/hold-rule-types';
import { getSellPriceEstimate } from '../calculations/get-sell-price-estimate';
import { getInvestmentPercent } from '../calculations/get-investment-percent';
import currency from '../formatters/currency';
import { returnOnCapitalGain } from '../calculations/return-on-capital-gain';
import { cashOnCashReturn } from '../calculations/cash-on-cash-return';
import { getEquityEstimate } from '../calculations/get-equity-estimate';

export class RentalPassiveApartment implements IEntityExistence, IRentalPropertyEntity {
  readonly propertyType: PropertyType = PropertyType.PassiveApartment;

  /**
   * a range of amounts that the user can invest for the property: typically these are $25,000, $50,000, $100,000, or $200,000
   */
  @InvestmentReasonForPurchaseRuleTypes(InvestmentReasons.DoesNotMeetUserRuleEquityCapture, PurchaseRuleTypes.MinEstimatedCapitalGainsPercent)
  @InvestmentReasonForPurchaseRuleTypes(InvestmentReasons.DoesNotMeetUserRuleOutOfPocket, PurchaseRuleTypes.MaxEstimatedOutOfPocket)
  offeredInvestmentAmounts: number[];

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
   * number of years to hold the property before being sold, default is 0. and this is used to calculated the {@link minSellDate}
   */
  minSellYears: number;

  /**
   * projects when you can sell this property using {@link purchaseDate} and {@link minSellYears}
   */
  get minSellDate(): Date {
    return cloneDateUtc(this.purchaseDate, (date) => date.setUTCFullYear(date.getUTCFullYear() + this.minSellYears));
  }

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

  get isOwned(): boolean {
    return this.wasPurchased && !this.soldDate;
  }

  get wasPurchased(): boolean {
    return !!this.purchaseDate;
  }

  get isAvailable(): boolean {
    return this.purchaseDate === undefined;
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
  purchasePrice: number;

  /**
   * we know appreciation is incorrect for apartments, they use a cap rate
   */
  sellPriceAppreciationPercent = 4;

  /**
   * is a percentage number of xx.xx format
   */
  get investmentPercent(): number {
    return getInvestmentPercent(this.costDownPrice, this.purchasePrice);
  }

  /**
   * lame way to apply {@link sellPriceAppreciationPercent} to rolling over the years the property was owned and uses {investmentPercent}
   * @param today
   */
  sellPriceByDate(today: Date): number {
    const sellPriceEstimate = getSellPriceEstimate(this.purchaseDate, today, this.purchasePrice, this.sellPriceAppreciationPercent);
    const total = (sellPriceEstimate * this.investmentPercent) / 100;
    return currency(total);
  }

  /**
   * this will be the passive's contribution, which is the full chunk from one of the values for {@link offeredInvestmentAmounts}
   */
  costDownPrice: number;

  /**
   * while we have equity capture in this example, know that cap rate is what determines true value.
   */
  equityCapturePercent: number;

  rawCashFlow: number;

  @InvestmentReasonForPurchaseRuleTypes(InvestmentReasons.DoesNotMeetUserRuleAnnualCashFlow, PurchaseRuleTypes.MinEstimatedAnnualCashFlow)
  @InvestmentReasonForHoldRuleTypes(InvestmentReasons.DoesNotMeetUserRuleAnnualCashFlow, HoldRuleTypes.MinSellIfLowCashFlowPercent)
  get rawEstimatedAnnualCashFlow(): number {
    return this.rawCashFlow === 0 ? 0 : this.rawCashFlow * 4;
  }

  /**
   * The date the property was acquired
   */
  purchaseDate: Date | undefined;

  /**
   * The date the property was sold
   */
  soldDate: Date | undefined;

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
   * Determines the equity of a sale by date. Note: {@link soldDate} must be populated and today and it must match
   * @param today
   */
  getEquityFromSell(today: Date): number {
    if (!this.soldDate) {
      return 0;
    }

    if (areSameDate(this.soldDate, today)) {
      return this.sellPriceByDate(today);
    }

    return 0;
  }

  /**
   * used to show a predictive amount for the sell of the property
   * @param sellDate used to represent the sell date of the property
   * @param purchaseDate optional date
   */
  getEstimatedEquityFromSell(sellDate: Date, purchaseDate?: Date): number {
    const equityEstimate = getEquityEstimate(
      getSellPriceEstimate(purchaseDate || this.purchaseDate, sellDate, this.purchasePrice, this.sellPriceAppreciationPercent),
      this.costDownPrice,
      this.equityCapturePercent,
    );
    const total = (equityEstimate * this.investmentPercent) / 100;
    return currency(total);
  }

  /**
   * should be for quarterly distributions, so last month of the quarter
   * @param today
   */
  getCashFlowByDate(today: Date): number {
    if (!this.isOwned || !today) {
      return 0;
    }

    if ((today.getUTCMonth() + 1) % 4 === 0) {
      return this.rawCashFlow;
    }

    return 0;
  }

  /**
   * universal method to determine cash flow on a monthly basis
   * @param today
   */
  getEstimatedMonthlyCashFlow(today: Date): number {
    if (!this.isOwned || !today) {
      return 0;
    }

    if (compareDates(today, this.purchaseDate) > 0) {
      return currency(this.rawCashFlow / 3);
    }

    return 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getExpensesByDate(today: Date): number {
    return 0;
  }

  /**
   * make a copy
   */
  clone(): RentalPassiveApartment {
    return Object.assign(new RentalPassiveApartment(), cloneDeep(this));
  }

  @InvestmentReasonForPurchaseRuleTypes(InvestmentReasons.DoesNotMeetUserRuleCashOnCash, PurchaseRuleTypes.MinEstimatedCashOnCashPercent)
  get estimatedCashOnCashReturn(): number {
    return cashOnCashReturn(this.rawEstimatedAnnualCashFlow, this.costDownPrice);
  }

  @InvestmentReasonForPurchaseRuleTypes(InvestmentReasons.DoesNotMeetUserRuleCapitalGain, PurchaseRuleTypes.MinEstimatedCapitalGainsPercent)
  get estimatedReturnOnCapitalGain(): number {
    return returnOnCapitalGain(this.equityCapturePercent, this.costDownPrice);
  }
}
