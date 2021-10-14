import { IPropertyEntity } from './i-property-entity';

export interface IRentalSavings extends IPropertyEntity {
  /**
   * used to determine what the cost of property is per month. If no purchase date or it has a sold date, then 0, otherwise there is an amount
   * @param today
   */
  getMonthlyPrincipalInterestTaxInterestByDate(today: Date): number;
}
