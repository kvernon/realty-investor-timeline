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
import {
  InvestmentReasonForHoldRuleTypes,
  InvestmentReasonForPurchaseRuleTypes,
  InvestmentReasons,
} from '../investments';
import { HoldRuleTypes, PurchaseRuleTypes } from '../rules';
import { getSellPriceEstimate } from '../calculations/get-sell-price-estimate';
import { getInvestmentPercent } from '../calculations/get-investment-percent';
import currency from '../formatters/currency';

export class RentalPassiveApartment implements IEntityExistence, IRentalPropertyEntity {
  readonly propertyType: PropertyType = PropertyType.PassiveApartment;

  /**
   * a range of amounts that the user can invest for the property: typically these are $25,000, $50,000, $100,000, or $200,000
   */
  @InvestmentReasonForPurchaseRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleEquityCapture,
    PurchaseRuleTypes.MinEstimatedCapitalGains
  )
  @InvestmentReasonForPurchaseRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleOutOfPocket,
    PurchaseRuleTypes.MaxEstimatedOutOfPocket
  )
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
  minSellYears: number;

  get minSellDate(): Date {
    return cloneDateUtc(this.purchaseDate, (date) => date.setUTCFullYear(date.getUTCFullYear() + this.minSellYears));
  }

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
    return !!this.purchaseDate && !this.soldDate;
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
    const sellPriceEstimate = getSellPriceEstimate(
      this.purchaseDate,
      today,
      this.purchasePrice,
      this.sellPriceAppreciationPercent
    );
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

  @InvestmentReasonForPurchaseRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleCashOnCash,
    PurchaseRuleTypes.MinEstimatedMultiAnnualCashFlow
  )
  @InvestmentReasonForHoldRuleTypes(
    InvestmentReasons.DoesNotMeetUserRuleCashOnCash,
    HoldRuleTypes.MinSellIfLowCashFlowPercent
  )
  get rawEstimatedAnnualCashFlow(): number {
    return this.rawCashFlow === 0 ? 0 : this.rawCashFlow * 4;
  }

  purchaseDate: Date | undefined;
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
}
