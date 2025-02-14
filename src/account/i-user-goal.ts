import { IRentalPropertyEntity } from '../properties/i-rental-property-entity';

export interface IUserGoal {
  /**
   * used to determine how much you need want for monthly expenses
   */
  monthlyIncomeAmountGoal: number;

  /**
   * method used to help determine if you have met your expenses
   * @param today
   * @param properties
   */
  metMonthlyGoal(today: Date, properties: IRentalPropertyEntity[]): boolean;
}
