import { IPropertyEntity } from './i-property-entity';
import { IUser } from '../account/user';
import { IRentalInvestorValidator } from '../investments/rental-investor-validator';

export interface IRentalPropertyEntity extends IPropertyEntity {
  purchaseDate: Date | undefined;

  soldDate: Date | undefined;

  canSell(today: Date): boolean;

  /**
   * Determines the equity of a sale by date. Note: {@link soldDate} must be populated and today and it must match
   * @param today
   */
  getEquityFromSell(today: Date): number;

  /**
   * used to show a predictive amount for the sell of the property
   * @param today used to represent the sell date of the property
   * @param purchaseDate optional date
   */
  getEstimatedEquityFromSell(today: Date, purchaseDate?: Date): number;

  /**
   * 1. you must have purchased this home
   * 2. this home must not have been sold
   * @param today
   */
  getCashFlowByDate(today: Date): number;

  /**
   * universal method to determine cash flow on a monthly basis
   * @param today
   */
  getEstimatedMonthlyCashFlow(today: Date): number;

  isOwned: boolean;

  wasPurchased: boolean;

  isAvailable: boolean;

  canInvestByUser(user: IUser, date: Date, properties: IPropertyEntity[]): IRentalInvestorValidator;

  /**
   * used to compare {@link availableStartDate}, {@link today}, and {@link availableEndDate},
   * @param today
   */
  isAvailableByDate(today: Date): boolean;

  /**
   * used to determine what the cost of property is per month. If no purchase date or it has a sold date, then 0, otherwise there is an amount
   * @param today
   */
  getExpensesByDate(today: Date): number;

  get estimatedCashOnCashReturn(): number;

  get estimatedReturnOnCapitalGain(): number;

  clone(): IRentalPropertyEntity;

  /**
   * This can be used as an estimate of what the price would be for the property
   * @param today
   */
  sellPriceByDate(today: Date): number;
}
