import { IPropertyEntity } from './i-property-entity';
import { IUser } from '../account/i-user';
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
  getMonthlyCashFlowByDate(today: Date): number;

  isOwned: boolean;

  canInvestByUser(user: IUser, date: Date, properties: IPropertyEntity[]): IRentalInvestorValidator;
}
