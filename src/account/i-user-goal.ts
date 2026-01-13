export interface IUserGoal {
  /**
   * used to determine how much you need want for monthly expenses
   */
  monthlyIncomeAmountGoal: number;

  /**
   * method used to help determine if you have met your expenses
   * @param today
   */
  metMonthlyGoal(today: Date): boolean;

  /**
   * takes data from a quarterly average cash flow and compares it to the monthly goal. The reason on quarterly is that apartments do distributions quarterly, so you have to spread those out monthly
   * @param today
   */
  metAverageQuarterlyGoal(today: Date): boolean;
}
