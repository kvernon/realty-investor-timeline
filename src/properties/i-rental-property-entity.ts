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

  canInvestByUser(user: IUser, date: Date, properties: IPropertyEntity[]): IRentalInvestorValidator;

  /**
   * used to compare {@link availableStartDate}, {@param today}, and {@link availableEndDate},
   * @param today
   */
  isAvailableByDate(today: Date): boolean;

  /**
   * used to determine what the cost of property is per month. If no purchase date or it has a sold date, then 0, otherwise there is an amount
   * @param today
   */
  getExpensesByDate(today: Date): number;

  clone(): IRentalPropertyEntity;
}
